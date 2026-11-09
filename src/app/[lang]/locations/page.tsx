import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath, tr } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { cities } from "@/content/locations";
import { PageHero, splitTitle } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/home/cta-band";

export async function generateMetadata({ params }: PageProps<"/[lang]/locations">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaryFor(lang);
  return pageMetadata({ locale: lang, path: "/locations", title: t.locationsPage.indexTitle, description: t.locationsPage.indexIntro });
}

export default async function LocationsPage() {
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  const { start, highlight } = splitTitle(t.locationsPage.indexTitle);
  return (
    <>
      <PageHero
        eyebrow={t.footer.areas}
        title={start}
        highlight={highlight}
        intro={t.locationsPage.indexIntro}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: t.locationsPage.indexTitle, href: L("/locations") },
        ]}
      />
      <Section tone="surface" aria-label={t.locationsPage.indexTitle}>
        <Container>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <RevealItem key={c.slug}>
                <Link
                  href={L(`/locations/${c.slug}`)}
                  className="group flex h-full flex-col gap-3 rounded-card border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
                >
                  <span className="flex items-center justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-eyebrow text-eyebrow-foreground">
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-heading">{tr(c.name, locale)}</span>
                    <span className="block text-xs text-muted-foreground">{c.district}, Uttar Pradesh</span>
                  </span>
                  <span className="line-clamp-3 text-sm text-muted-foreground">{tr(c.intro, locale)}</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
