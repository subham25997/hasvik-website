import type { Metadata } from "next";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/section";
import { Mentors, TeamGrid } from "@/components/team/team-grid";
import { CtaBand } from "@/components/home/cta-band";

export async function generateMetadata({ params }: PageProps<"/[lang]/team">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaryFor(lang);
  return pageMetadata({ locale: lang, path: "/team", title: t.nav.team, description: t.team.subtitle });
}

export default async function TeamPage() {
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  return (
    <>
      <PageHero
        eyebrow={t.team.eyebrow}
        title={t.team.title}
        highlight={t.team.highlight}
        intro={t.team.subtitle}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: t.nav.team, href: L("/team") },
        ]}
      />
      <Section aria-label={t.nav.team}>
        <Container>
          <TeamGrid locale={locale} />
          <Mentors locale={locale} t={t} />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
