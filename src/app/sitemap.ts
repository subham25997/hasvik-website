import type { MetadataRoute } from "next";
import { htmlLang, localizePath } from "@/i18n/config";
import { publishedServices } from "@/content/services";
import { projects } from "@/content/projects";
import { cities } from "@/content/locations";
import { leadsCrm } from "@/content/products";
import { absoluteUrl } from "@/lib/utils";

// Bump when content changes significantly (avoids `new Date()` so the file stays static).
const LAST_MODIFIED = "2026-10-14";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
    lastModified?: string;
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/team", priority: 0.5, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
    { path: "/locations", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: `/products/${leadsCrm.slug}`, priority: 0.8, changeFrequency: "monthly", lastModified: "2026-11-09" },
    ...publishedServices.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: 0.6, changeFrequency: "monthly" as const })),
    ...cities.map((c) => ({ path: `/locations/${c.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
  ];

  return paths.flatMap(({ path, priority, changeFrequency, lastModified = LAST_MODIFIED }) => {
    const languages = {
      [htmlLang.en]: absoluteUrl(localizePath(path, "en")),
      [htmlLang.hi]: absoluteUrl(localizePath(path, "hi")),
    };
    return (["en", "hi"] as const).map((locale) => ({
      url: absoluteUrl(localizePath(path, locale)),
      lastModified,
      changeFrequency,
      priority: locale === "en" ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: { languages },
    }));
  });
}
