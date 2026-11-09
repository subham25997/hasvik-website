import { hasLocale } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "HASVIK Technologies — Building the Future with Technology";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = dictionaryFor(hasLocale(lang) ? lang : "en");
  return renderOg({ eyebrow: t.nav.services, title: t.hero.titleStart, highlight: t.hero.titleHighlight, footer: t.hero.subtitle });
}
