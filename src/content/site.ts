// Company-wide facts. Edit here — components read everything from this file.
import type { Localized } from "@/i18n/config";

export const site = {
  name: "HASVIK Technologies",
  shortName: "HASVIK",
  legalStatus: "Udyam Registered MSME",
  foundedISO: "2025-04-05",
  udyamISO: "2026-08-01",
  domain: "hasviktech.com",
  serviceArea: "Worldwide",
  tagline: { en: "Innovate. Automate. Grow", hi: "नवाचार. स्वचालन. विकास" } as Localized,

  logo: { src: "/images/logo.webp", png: "/images/logo.png", width: 364, height: 124 },

  phone: { display: "+91 94542 63965", e164: "+919454263965", schema: "+91-9454263965" },
  whatsapp: {
    number: "919454263965",
    message: "Hello HASVIK, I am interested in your website services",
  },

  emails: {
    sales: "sales@hasviktech.com",
    careers: "careers@hasviktech.com",
    info: "info@hasviktech.com",
    support: "support@hasviktech.com",
  },

  address: {
    line1: "Ward No 6, Uttar Tola",
    locality: "Maniar",
    district: "Ballia",
    region: "Uttar Pradesh",
    regionCode: "UP",
    postalCode: "277207",
    country: "IN",
    // Approximate coordinates of Maniar, Ballia. TODO(owner): replace with exact office pin.
    geo: { lat: 25.9833, lng: 84.1667 },
  },
  mapEmbedUrl: "https://www.google.com/maps?q=HASVIK+Technologies+Maniar+Ballia+Uttar+Pradesh+277207&output=embed",
  // TODO(owner): replace with the exact Google Business Profile share link.
  mapsListingUrl: "https://www.google.com/maps/search/?api=1&query=HASVIK+Technologies+Maniar+Ballia",

  hours: {
    display: { en: "Mon–Sat, 9:00 AM – 6:00 PM", hi: "सोम–शनि, सुबह 9:00 – शाम 6:00" } as Localized,
    schema: "Mo-Sa 09:00-18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },

  // TODO(owner): set `count` to the real number of Google reviews.
  rating: { value: 4.5, count: 3, source: "Google Maps" },

  socials: {
    facebook: "https://www.facebook.com/share/18DMQGA6Tv/",
    instagram: "https://www.instagram.com/hasviktechnologies",
    // TODO(owner): the old site linked to linkedin.com root. Add the real company page URL.
    linkedin: "",
    twitterHandle: "@hasviktechnologies",
  },

  /**
   * Headline stats shown in "Why Choose Us" and the hero trust strip.
   * NOTE: these are business totals (including work not shown in the portfolio),
   * so they intentionally differ from the number of portfolio cards.
   * TODO(owner): keep in sync whenever a project ships.
   */
  stats: {
    projectsCompleted: 7,
    projectsInProgress: 4,
    happyClients: 7,
    yearsExperience: 1,
  },
} as const;

export function whatsappLink(message: string = site.whatsapp.message) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const fullAddress = `${site.name}, ${site.address.line1}, ${site.address.locality}, ${site.address.district}, ${site.address.region} ${site.address.postalCode}`;
