import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    // /en/* already 308-redirects to unprefixed URLs; it is not disallowed because
    // generated OG images live under /en/… and social crawlers honour robots.txt.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
