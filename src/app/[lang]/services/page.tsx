import type { Metadata } from "next";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/section";
import { ServicesGrid } from "@/components/services/services-grid";
import { ProcessStrip } from "@/components/services/process-strip";
import { FaqSection } from "@/components/home/faq-section";
import { CtaBand } from "@/components/home/cta-band";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaryFor(lang);
  return pageMetadata({ locale: lang, path: "/services", title: t.services.pageTitle, description: t.services.pageIntro });
}

export default async function ServicesPage() {
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  return (
    <>
      <PageHero
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        highlight={t.services.highlight}
        intro={t.services.pageIntro}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: t.nav.services, href: L("/services") },
        ]}
      />
      <Section tone="surface" aria-labelledby="services-list-title">
        <Container>
          <h2 id="services-list-title" className="sr-only">
            {t.services.pageTitle}
          </h2>
          <ServicesGrid locale={locale} t={t} />
        </Container>
      </Section>
      <Section>
        <Container>
          <ProcessStrip locale={locale} t={t} />
        </Container>
      </Section>
      <FaqSection />
      <CtaBand />
    </>
  );
}
