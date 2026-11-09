import { hasLocale, tr } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { getService } from "@/content/services";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "HASVIK Technologies service";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const service = getService(slug);
  const t = dictionaryFor(locale);
  return renderOg({
    eyebrow: service?.kind === "non-tech" ? t.services.tabNonTech : t.services.tabTech,
    title: service ? tr(service.title, locale) : t.services.pageTitle,
    footer: service ? tr(service.features[0] ?? service.short, locale) : undefined,
  });
}
