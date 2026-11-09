import type { Metadata } from "next";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { projects, type ProjectCategory, type ProjectStatus } from "@/content/projects";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/work/project-card";
import { WorkFilters } from "@/components/work/work-filters";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaBand } from "@/components/home/cta-band";

export async function generateMetadata({ params }: PageProps<"/[lang]/work">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaryFor(lang);
  return pageMetadata({ locale: lang, path: "/work", title: t.work.pageTitle, description: t.work.subtitle });
}

const statuses: ProjectStatus[] = ["completed", "in-progress", "demo"];
const categories: ProjectCategory[] = ["education", "business", "ecommerce"];

export default async function WorkPage() {
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  return (
    <>
      <PageHero
        eyebrow={t.work.eyebrow}
        title={t.work.title}
        highlight={t.work.highlight}
        intro={t.work.subtitle}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: t.nav.work, href: L("/work") },
        ]}
      />
      <Section tone="surface" aria-labelledby="work-list-title">
        <Container>
          <h2 id="work-list-title" className="sr-only">
            {t.work.pageTitle}
          </h2>
          <WorkFilters
            items={projects.map((p, i) => ({
              slug: p.slug,
              status: p.status,
              category: p.category,
              node: <ProjectCard project={p} locale={locale} t={t} priority={i < 3} />,
            }))}
            status={{ label: t.work.filterStatus, all: t.work.all, options: statuses.map((s) => ({ value: s, label: t.work.status[s] })) }}
            category={{
              label: t.work.filterCategory,
              all: t.work.all,
              // Only offer categories that have at least one project.
              options: categories
                .filter((c) => projects.some((p) => p.category === c))
                .map((c) => ({ value: c, label: t.work.category[c] })),
            }}
            strings={{ empty: t.work.empty, reset: t.work.reset, results: t.work.results }}
          />
        </Container>
      </Section>
      <TestimonialsSection />
      <CtaBand />
    </>
  );
}
