"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactServerSchema, type ContactPayload, type ContactResult } from "@/lib/contact-schema";
import { services } from "@/content/services";
import { authenticateCrm, createCrmBusiness, getCrmCategories, searchCrmCities, type CrmCategory } from "@/lib/crm-api";

// Simple sliding-window rate limit: 5 submissions per IP per 10 minutes.
// In-memory, so it is per server instance — good enough to stop casual abuse.
// For stricter limits across instances, swap for Upstash/Vercel KV.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // bound memory
  return recent.length > MAX_HITS;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type QuoteCategoriesResult = { ok: true; categories: CrmCategory[] } | { ok: false; error: "not_configured" | "crm" };
export type QuoteCitiesResult = { ok: true; cities: string[] } | { ok: false; error: "not_configured" | "crm" };

export async function getQuoteCategories(): Promise<QuoteCategoriesResult> {
  const auth = await authenticateCrm();
  if (!auth.ok) return { ok: false, error: auth.error === "not_configured" ? "not_configured" : "crm" };
  const result = await getCrmCategories(auth.value);
  return result.ok
    ? { ok: true, categories: result.value }
    : { ok: false, error: result.error === "not_configured" ? "not_configured" : "crm" };
}

export async function searchQuoteCities(search: string): Promise<QuoteCitiesResult> {
  const query = search.trim();
  if (query.length < 2 || query.length > 80) return { ok: true, cities: [] };

  const auth = await authenticateCrm();
  if (!auth.ok) return { ok: false, error: auth.error === "not_configured" ? "not_configured" : "crm" };
  const result = await searchCrmCities(auth.value, query);
  return result.ok
    ? { ok: true, cities: result.value }
    : { ok: false, error: result.error === "not_configured" ? "not_configured" : "crm" };
}

function formatQuoteDescription(serviceName: string, budget: string, details: string) {
  return `Quotation Request\nService: ${serviceName}\nBudget: ${budget || "Not specified"}\nDetails: ${details}`;
}

async function submitQuoteToCrm(
  data: ContactPayload,
  serviceName: string,
): Promise<{ ok: true; categoryName: string } | { ok: false; error: "validation" | "server" | "crm_conflict"; fields?: string[] }> {
  const auth = await authenticateCrm();
  if (!auth.ok) return { ok: false, error: "server" };

  const categoriesResult = await getCrmCategories(auth.value);
  if (!categoriesResult.ok) return { ok: false, error: "server" };
  const category = categoriesResult.value.find((item) => item.id === data.categoryId);
  const isIndividualCategory = category ? /^individuals?$/i.test(category.name) : false;
  if (!category || (data.leadType === "individual") !== isIndividualCategory) {
    return { ok: false, error: "validation", fields: ["categoryId"] };
  }

  if (data.city) {
    const citiesResult = await searchCrmCities(auth.value, data.city);
    if (!citiesResult.ok) return { ok: false, error: "server" };
    if (!citiesResult.value.some((city) => city.toLocaleLowerCase() === data.city.toLocaleLowerCase())) {
      return { ok: false, error: "validation", fields: ["city"] };
    }
  }

  const result = await createCrmBusiness(auth.value, {
    name: data.name,
    categoryId: category.id,
    leadSource: "WEBSITE",
    description: formatQuoteDescription(serviceName, data.budget, data.message),
    phoneNumbers: [{ number: data.phone, name: data.name, isPrimary: true }],
    ...(data.email ? { email: data.email } : {}),
    ...(data.city ? { city: data.city } : {}),
  });
  if (result.ok) return { ok: true, categoryName: category.name };
  if (result.error === "conflict") return { ok: false, error: "crm_conflict" };
  return { ok: false, error: "server" };
}

export async function submitContact(input: ContactPayload): Promise<ContactResult> {
  const parsed = contactServerSchema.safeParse(input);
  if (!parsed.success) {
    // A filled honeypot means a bot: pretend success so it learns nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return { ok: true };
    return { ok: false, error: "validation", fields: [...new Set(parsed.error.issues.map((i) => String(i.path[0])))] };
  }
  const data = parsed.data;

  // Time trap: a human needs more than ~1.5s between first focus and submit
  // (0 = form never focused = scripted POST). Bots get a fake success.
  if (!data.startedAt || Date.now() - data.startedAt < 1500) return { ok: true };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { ok: false, error: "rate_limited" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey && process.env.NODE_ENV === "production") {
    console.error("[contact] RESEND_API_KEY is missing in production.");
    return { ok: false, error: "server" };
  }

  const service = services.find((s) => s.slug === data.service);
  const serviceName = service ? (typeof service.title === "string" ? service.title : service.title.en) : data.service;
  const crmResult = await submitQuoteToCrm(data, serviceName);
  if (!crmResult.ok && crmResult.error === "crm_conflict") return crmResult;
  if (!crmResult.ok && crmResult.error === "validation") return crmResult;
  const crmSubmitted = crmResult.ok;
  const categoryName = crmResult.ok ? crmResult.categoryName : data.categoryId;

  const to = process.env.CONTACT_TO_EMAIL || "sales@hasviktech.com";
  const from = process.env.CONTACT_FROM_EMAIL || "HASVIK Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set; quote was saved to CRM but no email was sent.");
    return crmSubmitted ? { ok: true } : { ok: false, error: "server" };
  }

  const rows: [string, string][] = [
    ["Enquiry type", data.leadType === "individual" ? "Individual" : "Business"],
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["Category", categoryName],
    ["City", data.city || "—"],
    ["Service", serviceName],
    ["Budget", data.budget || "—"],
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email || undefined,
      subject: `New quote request: ${serviceName} — ${data.name}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${data.message}\n\nIP: ${ip}`,
      html: `<h2 style="font-family:sans-serif;color:#002f6c">New quote request</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#5e6c82">${k}</td><td style="padding:4px 0"><strong>${escape(v)}</strong></td></tr>`,
        )
        .join("")}</table>
<p style="font-family:sans-serif;white-space:pre-wrap;border-left:3px solid #71c554;padding-left:12px">${escape(data.message)}</p>`,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return crmSubmitted ? { ok: true } : { ok: false, error: "server" };
    }
    return crmSubmitted ? { ok: true } : { ok: false, error: "server" };
  } catch (err) {
    console.error("[contact] send failed:", err);
    return crmSubmitted ? { ok: true } : { ok: false, error: "server" };
  }
}
