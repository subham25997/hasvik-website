import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin, Search, Sparkles } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath, tr } from "@/i18n/config";
import { dictionaryFor, fmt } from "@/i18n/dictionaries";
import { cities, getCity } from "@/content/locations";
import { publishedServices } from "@/content/services";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteUrl } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/work/project-card";
import { ContactSection } from "@/components/contact/contact-section";

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/locations/[city]">): Promise<Metadata> {
  const { lang, city: slug } = await params;
  const city = getCity(slug);
  if (!hasLocale(lang) || !city) return {};
  const t = dictionaryFor(lang);
  const name = tr(city.name, lang);
  return pageMetadata({
    locale: lang,
    path: `/locations/${slug}`,
    title: fmt(t.locationsPage.title, { city: name }),
    description: `${tr(city.intro, lang)} ${fmt(t.locationsPage.intro, { city: name })}`.slice(0, 300),
  });
}

export default function CityPage({ params, searchParams }: PageProps<"/[lang]/locations/[city]">) {
  void searchParams;
  return (
    <Suspense fallback={null}>
      <CityPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CityPageContent({ params, searchParams }: PageProps<"/[lang]/locations/[city]">) {
  void searchParams;
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  const name = tr(city.name, locale);
  const title = fmt(t.locationsPage.title, { city: name });
  const nearby = city.nearby.map(getCity).filter((c) => !!c);
  // Show local work first (projects whose location mentions this city or district).
  const local = projects
    .filter((p) => p.location && (p.location.includes(tr(city.name, "en")) || p.location.includes(city.district)))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${absoluteUrl(L(`/locations/${city.slug}`))}#service`,
          name: `${site.name} — ${tr(city.name, "en")}`,
          url: absoluteUrl(L(`/locations/${city.slug}`)),
          parentOrganization: { "@id": `${siteUrl}/#organization` },
          telephone: site.phone.schema,
          areaServed: { "@type": "City", name: tr(city.name, "en"), containedInPlace: { "@type": "State", name: "Uttar Pradesh" } },
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.line1,
            addressLocality: site.address.locality,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: site.address.country,
          },
        }}
      />

      <PageHero
        eyebrow={fmt(t.locationsPage.eyebrow, { city: name })}
        title={title.slice(0, title.indexOf(name)).trim()}
        highlight={name}
        titleEnd={title.slice(title.indexOf(name) + name.length).trim() || undefined}
        intro={tr(city.intro, locale)}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: t.locationsPage.indexTitle, href: L("/locations") },
          { name, href: L(`/locations/${city.slug}`) },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#quote" className={buttonVariants()}>
            {t.nav.getQuote}
            <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
          </Link>
          <a href={`tel:${site.phone.e164}`} className={buttonVariants({ variant: "glass" })}>
            {site.phone.display}
          </a>
        </div>
      </PageHero>

      <Section aria-labelledby="focus-title">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-xl2 border border-border bg-card p-8 shadow-soft">
            <h2 id="focus-title" className="mb-5 text-2xl font-bold">
              {fmt(t.locationsPage.focusTitle, { city: name })}
            </h2>
            <ul className="flex flex-col gap-3">
              {city.focus.map((f) => (
                <li key={tr(f, "en")} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-accent-ink dark:text-accent" aria-hidden="true" />
                  {tr(f, locale)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="on-dark bg-hero relative overflow-hidden rounded-xl2 p-8 text-white shadow-lift">
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
            <Sparkles className="relative mb-4 size-8 text-accent" aria-hidden="true" />
            <h2 className="relative mb-3 text-2xl font-bold text-white">{fmt(t.locationsPage.whyTitle, { city: name })}</h2>
            <p className="relative text-lg leading-relaxed text-white/85">{tr(city.angle, locale)}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="city-services-title">
        <Container>
          <h2 id="city-services-title" className="mb-8 text-center text-3xl font-bold">
            {fmt(t.locationsPage.servicesTitle, { city: name })}
          </h2>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {publishedServices.map((s) => (
              <RevealItem key={s.slug}>
                <Link
                  href={L(`/services/${s.slug}`)}
                  className="group flex h-full flex-col gap-3 rounded-card border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-600 text-white">
                    <Icon name={s.icon} className="size-5" />
                  </span>
                  <span className="font-semibold text-heading">{tr(s.title, locale)}</span>
                  <span className="text-sm text-muted-foreground">{tr(s.short, locale)}</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {local.length ? (
        <Section aria-label={t.work.title}>
          <Container>
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {local.map((p) => (
                <RevealItem key={p.slug}>
                  <ProjectCard project={p} locale={locale} t={t} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      ) : null}

      <Section aria-labelledby="searches-title" className="py-14 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="searches-title" className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Search className="size-5 text-brand-700 dark:text-accent" aria-hidden="true" />
              {t.locationsPage.searchesTitle}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {t.locationsPage.searches.map((s) => (
                <li key={s} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground">
                  {fmt(s, { city: name })}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <MapPin className="size-5 text-brand-700 dark:text-accent" aria-hidden="true" />
              {t.locationsPage.nearbyTitle}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={L(`/locations/${n.slug}`)}
                    className="inline-flex min-h-11 items-center rounded-full bg-eyebrow px-4 text-sm font-semibold text-eyebrow-foreground hover:underline"
                  >
                    {tr(n.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <ContactSection />
    </>
  );
}
