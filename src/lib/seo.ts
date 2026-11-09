import type { Metadata } from "next";
import { htmlLang, localizePath, ogLocale, type Locale } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { absoluteUrl, siteUrl } from "./utils";

/** Per-page metadata with canonical + hreflang alternates. `path` is locale-free ("/about"). */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description?: string;
}): Metadata {
  const t = dictionaryFor(locale);
  const desc = description ?? t.meta.description;
  const url = absoluteUrl(localizePath(path, locale));
  return {
    title: title ?? { absolute: t.meta.defaultTitle },
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        [htmlLang.en]: absoluteUrl(localizePath(path, "en")),
        [htmlLang.hi]: absoluteUrl(localizePath(path, "hi")),
        "x-default": absoluteUrl(localizePath(path, "en")),
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[locale === "en" ? "hi" : "en"],
      url,
      title: title ? `${title} | ${site.name}` : t.meta.defaultTitle,
      description: desc,
    },
    twitter: {
      card: "summary_large_image",
      site: site.socials.twitterHandle,
      creator: site.socials.twitterHandle,
      title: title ? `${title} | ${site.name}` : t.meta.defaultTitle,
      description: desc,
    },
  };
}

const sameAs = [site.socials.facebook, site.socials.instagram, site.socials.linkedin].filter(Boolean);
const orgId = `${siteUrl}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: siteUrl,
    logo: absoluteUrl(site.logo.png),
    email: site.emails.info,
    telephone: site.phone.schema,
    foundingDate: site.foundedISO,
    areaServed: site.serviceArea,
    sameAs,
  };
}

export function localBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#business`,
    name: site.name,
    parentOrganization: { "@id": orgId },
    url: siteUrl,
    logo: absoluteUrl(site.logo.png),
    image: absoluteUrl("/images/og-image.jpeg"),
    description: dictionaryFor(locale).meta.description,
    telephone: site.phone.schema,
    email: site.emails.sales,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.geo.lat, longitude: site.address.geo.lng },
    openingHours: site.hours.schema,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    areaServed: site.serviceArea,
    sameAs,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      bestRating: 5,
      ratingCount: site.rating.count,
    },
  };
}

export function websiteSchema(locale: Locale) {
  // Note: no SearchAction — the site has no search page and Google retired the
  // sitelinks search box (Nov 2024), so the markup would be invalid.
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    inLanguage: [htmlLang.en, htmlLang.hi],
    publisher: { "@id": orgId },
    description: dictionaryFor(locale).meta.description,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
