import type { Metadata } from "next";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { localBusinessSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { ContactSection } from "@/components/contact/contact-section";
import { FaqSection } from "@/components/home/faq-section";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaryFor(lang);
  return pageMetadata({ locale: lang, path: "/contact", title: t.contact.pageTitle, description: t.contact.subtitle });
}

export default async function ContactPage() {
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  return (
    <>
      <JsonLd data={localBusinessSchema(locale)} />
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        highlight={t.contact.highlight}
        intro={t.contact.subtitle}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: t.nav.contact, href: L("/contact") },
        ]}
      />
      <ContactSection hideHeader />
      <FaqSection />
    </>
  );
}
