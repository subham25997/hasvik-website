"use server";

import { headers } from "next/headers";
import { demoServerSchema, type DemoFields } from "@/lib/demo-schema";
import { authenticateCrm, createCrmBusiness, getCrmCategories, searchCrmCities, type CrmCategory } from "@/lib/crm-api";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS = 3;
const submissions = new Map<string, number[]>();

export type DemoCategory = CrmCategory;
export type DemoCity = string;
export type DemoActionError = "not_configured" | "crm" | "validation" | "rate_limited";
export type DemoResult = { ok: true } | { ok: false; error: DemoActionError };
export type DemoCategoriesResult = { ok: true; categories: DemoCategory[] } | { ok: false; error: "not_configured" | "crm" };
export type DemoCitiesResult = { ok: true; cities: DemoCity[] } | { ok: false; error: "not_configured" | "crm" };

export async function getDemoCategories(): Promise<DemoCategoriesResult> {
  const auth = await authenticateCrm();
  if (!auth.ok) return { ok: false, error: auth.error === "not_configured" ? "not_configured" : "crm" };
  const result = await getCrmCategories(auth.value);
  return result.ok
    ? { ok: true, categories: result.value }
    : { ok: false, error: result.error === "not_configured" ? "not_configured" : "crm" };
}

export async function searchDemoCities(search: string): Promise<DemoCitiesResult> {
  const query = search.trim();
  if (query.length < 2 || query.length > 80) return { ok: true, cities: [] };

  const auth = await authenticateCrm();
  if (!auth.ok) return { ok: false, error: auth.error === "not_configured" ? "not_configured" : "crm" };
  const result = await searchCrmCities(auth.value, query);
  return result.ok
    ? { ok: true, cities: result.value }
    : { ok: false, error: result.error === "not_configured" ? "not_configured" : "crm" };
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  submissions.set(ip, recent);
  if (submissions.size > 5000) submissions.clear();
  return recent.length > MAX_SUBMISSIONS;
}

export async function submitDemoRequest(input: DemoFields & { startedAt: number }): Promise<DemoResult> {
  const parsed = demoServerSchema.safeParse(input);
  if (!parsed.success) {
    if (parsed.error.issues.some((issue) => issue.path[0] === "website")) return { ok: true };
    return { ok: false, error: "validation" };
  }
  const data = parsed.data;
  if (!data.startedAt || Date.now() - data.startedAt < 1500) return { ok: true };

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { ok: false, error: "rate_limited" };

  const auth = await authenticateCrm();
  if (!auth.ok) return { ok: false, error: auth.error === "not_configured" ? "not_configured" : "crm" };

  const categoryResult = await getCrmCategories(auth.value);
  if (!categoryResult.ok) {
    return { ok: false, error: categoryResult.error === "not_configured" ? "not_configured" : "crm" };
  }
  const category = categoryResult.value.find((item) => item.id === data.categoryId);
  const individualCategory = category ? /^individuals?$/i.test(category.name) : false;
  if (!category || (data.leadType === "individual") !== individualCategory) return { ok: false, error: "validation" };

  if (data.city) {
    const cityResult = await searchCrmCities(auth.value, data.city);
    if (!cityResult.ok) {
      return { ok: false, error: cityResult.error === "not_configured" ? "not_configured" : "crm" };
    }
    if (!cityResult.value.some((city) => city.toLocaleLowerCase() === data.city.toLocaleLowerCase())) {
      return { ok: false, error: "validation" };
    }
  }

  const result = await createCrmBusiness(auth.value, {
    name: data.name,
    categoryId: category.id,
    leadSource: "WEBSITE",
    phoneNumbers: [{ number: data.phone, name: data.name, isPrimary: true }],
    ...(data.email ? { email: data.email } : {}),
    ...(data.city ? { city: data.city } : {}),
    ...(data.description ? { description: data.description } : {}),
  });
  return result.ok ? { ok: true } : { ok: false, error: result.error === "not_configured" ? "not_configured" : "crm" };
}
