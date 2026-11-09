import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath, tr } from "@/i18n/config";
import { getService, publishedServices } from "@/content/services";
import { projects } from "@/content/projects";
import { site, whatsappLink } from "@/content/site";
import { faqSchema, pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteUrl } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/icon";
import { PageHero, splitTitle } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/accordion";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProcessStrip } from "@/components/services/process-strip";
import { ServiceCard } from "@/components/services/service-card";
import { ProjectCard } from "@/components/work/project-card";
import { ContactSection } from "@/components/contact/contact-section";
import { WhatsappGlyph } from "@/components/layout/whatsapp-fab";

export async function generateStaticParams() {
  return publishedServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = getService(slug);
  if (!hasLocale(lang) || !service) return {};
  return pageMetadata({ locale: lang, path: `/services/${slug}`, title: tr(service.title, lang), description: tr(service.short, lang) });
}

export default function ServicePage({ params, searchParams }: PageProps<"/[lang]/services/[slug]">) {
  void searchParams;
  return (
    <Suspense fallback={null}>
      <ServicePageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function ServicePageContent({ params, searchParams }: PageProps<"/[lang]/services/[slug]">) {
  void searchParams;
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  const title = tr(service.title, locale);
  const words = title.split(" ");
  const titleSplit = splitTitle(title, words.at(-2) === "&" ? 3 : words.length > 3 ? 2 : 1);
  const related = projects.filter((p) => p.services.includes(service.slug)).slice(0, 3);
  const others = publishedServices.filter((s) => s.slug !== service.slug).slice(0, 3);
  const hl = (s: string) => {
    const r = splitTitle(s);
    return { title: r.start, highlight: r.highlight };
  };
  const faqs = service.faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: title,
          description: tr(service.description, locale),
          serviceType: tr(service.title, "en"),
          url: absoluteUrl(L(`/services/${service.slug}`)),
          provider: { "@id": `${siteUrl}/#business`, "@type": "LocalBusiness", name: site.name },
          areaServed: site.serviceArea,
          image: absoluteUrl(service.image.src),
        }}
      />
      {faqs.length ? <JsonLd data={faqSchema(faqs)} /> : null}

      <PageHero
        eyebrow={service.kind === "tech" ? t.services.tabTech : t.services.tabNonTech}
        title={titleSplit.start}
        highlight={titleSplit.highlight}
        intro={tr(service.short, locale)}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: t.nav.services, href: L("/services") },
          { name: title, href: L(`/services/${service.slug}`) },
        ]}
        aside={
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-xl2 border border-white/15 shadow-lift lg:block">
            <Image src={service.image.src} alt={tr(service.image.alt, locale)} fill priority sizes="480px" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent" />
            <span className="absolute bottom-5 left-5 inline-flex size-14 items-center justify-center rounded-2xl bg-accent-ink text-white shadow-lg">
              <Icon name={service.icon} className="size-7" />
            </span>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#quote" className={buttonVariants()}>
            {t.nav.getQuote}
            <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
          </Link>
          <a
            href={whatsappLink(`Hello HASVIK TECHNOLOGIES, I am interested in ${tr(service.title, "en")}`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "glass" })}
          >
            <WhatsappGlyph className="size-4" />
            {t.cta.secondary}
            <span className="sr-only">{t.a11y.external}</span>
          </a>
        </div>
      </PageHero>

      <Section aria-labelledby="overview-title">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <h2 id="overview-title" className="mb-5 text-3xl font-bold">
              {title}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{tr(service.description, locale)}</p>
            <h3 className="mt-10 mb-4 text-xl font-semibold">{t.services.whatYouGet}</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <li key={tr(d, "en")} className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-ink dark:text-accent" aria-hidden="true" />
                  <span className="text-sm">{tr(d, locale)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5">
            <div className="on-dark bg-hero relative overflow-hidden rounded-xl2 p-7 text-white shadow-lift">
              <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
              <h3 className="relative mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Users className="size-5 text-accent" aria-hidden="true" />
                {t.services.idealFor}
              </h3>
              <ul className="relative flex flex-col gap-3">
                {service.idealFor.map((i) => (
                  <li key={tr(i, "en")} className="flex items-center gap-3 rounded-xl bg-white/8 px-4 py-3 text-sm ring-1 ring-white/10">
                    <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                    {tr(i, locale)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl2 border border-border bg-card p-6 shadow-soft">
              <h3 className="mb-3 text-sm font-semibold text-heading">{t.services.benefits}</h3>
              <ul className="flex flex-col gap-2">
                {service.features.map((f) => (
                  <li key={tr(f, "en")} className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="size-4 text-accent-ink dark:text-accent" aria-hidden="true" />
                    {tr(f, locale)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <ProcessStrip locale={locale} t={t} />
        </Container>
      </Section>

      {related.length ? (
        <Section aria-labelledby="related-title">
          <Container>
            <SectionHeader id="related-title" eyebrow={t.work.eyebrow} {...hl(t.services.related)} />
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <RevealItem key={p.slug}>
                  <ProjectCard project={p} locale={locale} t={t} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      {faqs.length ? (
        <Section tone="soft" aria-labelledby="service-faq-title">
          <Container className="max-w-4xl">
            <SectionHeader id="service-faq-title" eyebrow={t.faq.eyebrow} {...hl(t.services.faqs)} />
            <FaqAccordion items={faqs} />
          </Container>
        </Section>
      ) : null}

      <Section aria-labelledby="other-title">
        <Container>
          <SectionHeader id="other-title" eyebrow={t.services.eyebrow} {...hl(t.services.otherServices)} />
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {others.map((s) => (
              <RevealItem key={s.slug}>
                <ServiceCard service={s} locale={locale} learnMore={t.services.learnMore} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <ContactSection defaultService={service.slug} />
    </>
  );
}
