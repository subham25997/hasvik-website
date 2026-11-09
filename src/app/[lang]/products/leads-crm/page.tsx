import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath, tr } from "@/i18n/config";
import { leadsCrm, leadsCrmUrl } from "@/content/products";
import { pageMetadata, faqSchema } from "@/lib/seo";
import { absoluteUrl, siteUrl } from "@/lib/utils";
import { site } from "@/content/site";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero, splitTitle } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[lang]/products/leads-crm">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const title = lang === "hi" ? `${leadsCrm.name} | लीड मैनेजमेंट` : `${leadsCrm.name} | Lead Management Software`;
  return pageMetadata({ locale: lang, path: `/products/${leadsCrm.slug}`, title, description: tr(leadsCrm.description, lang) });
}

export default async function LeadsCrmPage({ params }: PageProps<"/[lang]/products/leads-crm">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { locale, t } = await getDictionary();
  const L = (path: string) => localizePath(path, locale);
  const title = tr(leadsCrm.title, locale);
  const titleSplit = splitTitle(title, 2);
  const description = tr(leadsCrm.description, locale);
  const features = leadsCrm.features.map((feature) => ({
    title: tr(feature.title, locale),
    description: tr(feature.description, locale),
  }));
  const faqs = leadsCrm.faqs.map((faq) => ({ q: tr(faq.q, locale), a: tr(faq.a, locale) }));

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": `${siteUrl}/products/${leadsCrm.slug}#software`,
            name: leadsCrm.name,
            description,
            url: absoluteUrl(L(`/products/${leadsCrm.slug}`)),
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            image: absoluteUrl("/images/leads-crm/dashboard.jpg"),
            featureList: features.map((feature) => feature.title),
            creator: { "@id": `${siteUrl}/#organization`, name: site.name },
            sameAs: leadsCrmUrl,
          },
          faqSchema(faqs),
        ]}
      />

      <PageHero
        eyebrow={leadsCrm.name}
        title={titleSplit.start}
        highlight={titleSplit.highlight}
        intro={tr(leadsCrm.intro, locale)}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: leadsCrm.name, href: L(`/products/${leadsCrm.slug}`) },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <a href={leadsCrmUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants()}>
            {locale === "hi" ? "प्रोडक्ट एक्सप्लोर करें" : "Explore the product"}
            <ArrowUpRight aria-hidden="true" />
            <span className="sr-only">{t.a11y.external}</span>
          </a>
          <Link href={L("/contact#quote")} className={buttonVariants({ variant: "glass" })}>
            {locale === "hi" ? "डेमो माँगें" : "Request a demo"}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </PageHero>

      <Section tone="surface" aria-labelledby="leads-crm-overview">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[1900/870] overflow-hidden rounded-xl2 border border-border shadow-lift">
            <Image
              src="/images/leads-crm/dashboard.jpg"
              alt={tr(leadsCrm.imageAlt, locale)}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
          <div>
            <SectionHeader
              id="leads-crm-overview"
              eyebrow={locale === "hi" ? "लीड मैनेजमेंट सॉफ़्टवेयर" : "Lead management software"}
              title={locale === "hi" ? "लीड मैनेजमेंट" : "Lead management"}
              highlight={locale === "hi" ? "फ़ीचर्स" : "features"}
              align="left"
            />
            <ul className="mt-6 grid gap-3">
              {features.map((feature) => (
                <li key={feature.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-ink" aria-hidden="true" />
                  <span className="text-sm leading-relaxed">
                    <strong>{feature.title}:</strong> {feature.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="leads-crm-faq">
        <Container className="max-w-4xl">
          <SectionHeader
            id="leads-crm-faq"
            eyebrow={leadsCrm.name}
            title={locale === "hi" ? "अक्सर पूछे जाने" : "Frequently asked"}
            highlight={locale === "hi" ? "वाले प्रश्न" : "questions"}
          />
          <FaqAccordion items={faqs} />
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="flex flex-col items-center gap-5 py-4 text-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="max-w-2xl text-muted-foreground">{description}</p>
          <Link href={L("/contact#quote")} className={cn(buttonVariants(), "group")}>
            {locale === "hi" ? "HASVIK से संपर्क करें" : `Talk to ${site.name}`}
            <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Container>
      </Section>
    </>
  );
}
