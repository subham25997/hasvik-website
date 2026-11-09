import type { Metadata } from "next";
import { Briefcase, GraduationCap, Mail, Rocket, Sprout, Users } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero, splitTitle } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

// TODO(owner): add open roles here, e.g. { title, type, location, summary }.
const openRoles: { title: string; type: string; location: string; summary: string }[] = [];

export async function generateMetadata({ params }: PageProps<"/[lang]/careers">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaryFor(lang);
  return pageMetadata({ locale: lang, path: "/careers", title: t.nav.careers, description: t.careersPage.intro });
}

export default async function CareersPage() {
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  const { start, highlight } = splitTitle(t.careersPage.title);
  const icons = [Rocket, Users, Sprout];
  const mail = `mailto:${site.emails.careers}?subject=${encodeURIComponent("Application — HASVIK Technologies")}`;

  return (
    <>
      <PageHero
        eyebrow={t.nav.careers}
        title={start}
        highlight={highlight}
        intro={t.careersPage.intro}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: t.nav.careers, href: L("/careers") },
        ]}
      >
        <a href={mail} className={buttonVariants()}>
          <Mail aria-hidden="true" />
          {t.careersPage.apply}
        </a>
      </PageHero>

      <Section aria-labelledby="why-work">
        <Container>
          <h2 id="why-work" className="mb-10 text-center text-3xl font-bold sm:text-4xl">
            {t.careersPage.whyTitle}
          </h2>
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {t.careersPage.why.map((w, i) => {
              const WIcon = icons[i];
              return (
                <RevealItem key={w.title} className="rounded-card border border-border bg-card p-7 shadow-soft">
                  <span className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-eyebrow text-eyebrow-foreground">
                    <WIcon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mb-1.5 text-lg font-semibold">{w.title}</h3>
                  <p className="text-sm text-muted-foreground">{w.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="roles-title">
        <Container className="grid max-w-5xl gap-6 md:grid-cols-2">
          <Reveal className="rounded-xl2 border border-border bg-card p-8 shadow-soft">
            <Briefcase className="mb-4 size-8 text-brand-700 dark:text-accent" aria-hidden="true" />
            <h2 id="roles-title" className="mb-3 text-2xl font-bold">
              {t.careersPage.rolesTitle}
            </h2>
            {openRoles.length ? (
              <ul className="flex flex-col gap-3">
                {openRoles.map((r) => (
                  <li key={r.title} className="rounded-2xl bg-surface p-4">
                    <p className="font-semibold text-heading">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.type} · {r.location}
                    </p>
                    <p className="mt-1 text-sm">{r.summary}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">{t.careersPage.noRoles}</p>
            )}
          </Reveal>
          <Reveal delay={0.08} className="on-dark bg-hero relative overflow-hidden rounded-xl2 p-8 text-white shadow-lift">
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
            <GraduationCap className="relative mb-4 size-8 text-accent" aria-hidden="true" />
            <h2 className="relative mb-3 text-2xl font-bold text-white">{t.careersPage.internshipTitle}</h2>
            <p className="relative mb-6 text-white/85">{t.careersPage.internship}</p>
            <p className="relative text-sm text-white/75">{t.careersPage.applyNote}</p>
            <a href={mail} className="relative mt-1 inline-flex min-h-11 items-center gap-2 font-semibold text-[#9be47f] hover:underline">
              <Mail className="size-4" aria-hidden="true" />
              {site.emails.careers}
            </a>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
