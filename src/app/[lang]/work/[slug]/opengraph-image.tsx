import { hasLocale, tr } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { getProject } from "@/content/projects";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "HASVIK Technologies case study";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const project = getProject(slug);
  const t = dictionaryFor(locale);
  return renderOg({
    eyebrow: `${t.work.caseStudy} · ${project ? t.work.status[project.status] : ""}`,
    title: project?.name ?? t.work.pageTitle,
    footer: project ? tr(project.description, locale) : undefined,
  });
}
