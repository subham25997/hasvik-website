import { hasLocale, tr } from "@/i18n/config";
import { dictionaryFor, fmt } from "@/i18n/dictionaries";
import { getCity } from "@/content/locations";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Website development near you — HASVIK Technologies";

export default async function Image({ params }: { params: Promise<{ lang: string; city: string }> }) {
  const { lang, city: slug } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const city = getCity(slug);
  const t = dictionaryFor(locale);
  const name = city ? tr(city.name, locale) : "";
  return renderOg({
    eyebrow: fmt(t.locationsPage.eyebrow, { city: name }),
    title: fmt(t.locationsPage.title, { city: name }),
    footer: fmt(t.locationsPage.intro, { city: name }).slice(0, 90),
  });
}
