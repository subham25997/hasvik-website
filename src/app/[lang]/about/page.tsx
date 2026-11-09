import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Flag, HandCoins, Rocket, Sparkles, Sprout, Target, Users } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero, splitTitle } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TeamGrid } from "@/components/team/team-grid";
import { CtaBand } from "@/components/home/cta-band";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaryFor(lang);
  return pageMetadata({ locale: lang, path: "/about", title: t.aboutPage.title, description: t.aboutPage.intro });
}

export default async function AboutPage() {
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  const { start, highlight } = splitTitle(t.aboutPage.title);
  const valueIcons = [Sparkles, Sprout, Users, HandCoins];
  const journey = [
    ...t.about.timeline.map((it, i) => ({ ...it, Icon: [Flag, Award][i] })),
    {
      date: t.aboutPage.today.date,
      title: t.aboutPage.today.title,
      body: t.aboutPage.today.body
        .replace("{projects}", String(site.stats.projectsCompleted))
        .replace("{clients}", String(site.stats.happyClients)),
      Icon: Rocket,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.about.eyebrow}
        title={start}
        highlight={highlight}
        intro={t.aboutPage.intro}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: t.nav.about, href: L("/about") },
        ]}
      />

      <Section aria-labelledby="story-title">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 id="story-title" className="mb-6 text-3xl font-bold sm:text-4xl">
              {t.aboutPage.storyTitle}
            </h2>
            <div className="flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
              {t.aboutPage.story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src="/images/office.png"
                  alt={locale === "hi" ? "HASVIK TECHNOLOGIES का कार्यालय" : "HASVIK TECHNOLOGIES office"}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm text-muted-foreground">{t.about.visualCaption}</figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface" aria-label={t.aboutPage.missionTitle}>
        <Container>
          <RevealGroup className="grid gap-5 md:grid-cols-2">
            <RevealItem className="on-dark bg-hero relative overflow-hidden rounded-xl2 p-8 text-white shadow-lift sm:p-10">
              <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
              <Target className="relative mb-5 size-10 text-accent" aria-hidden="true" />
              <h2 className="relative mb-3 text-2xl font-bold text-white">{t.aboutPage.missionTitle}</h2>
              <p className="relative text-lg leading-relaxed text-white/85">{t.aboutPage.mission}</p>
            </RevealItem>
            <RevealItem className="rounded-xl2 border border-border bg-card p-8 shadow-soft sm:p-10">
              <Sprout className="mb-5 size-10 text-accent-ink dark:text-accent" aria-hidden="true" />
              <h2 className="mb-3 text-2xl font-bold">{t.aboutPage.ruralTitle}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{t.aboutPage.rural}</p>
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      <Section aria-labelledby="journey-title">
        <Container className="max-w-4xl">
          <SectionHeader
            id="journey-title"
            eyebrow={t.aboutPage.journey}
            title={t.about.title}
            highlight={t.about.highlight}
            titleEnd={t.about.titleEnd}
          />
          <ol className="relative flex flex-col gap-8 before:absolute before:top-2 before:bottom-2 before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-accent before:to-brand-600/30 sm:before:left-1/2">
            {journey.map((item, i) => (
              <li key={item.date} className="relative grid grid-cols-[3rem_1fr] gap-5 sm:grid-cols-2 sm:gap-12">
                <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full bg-accent-ink text-white ring-8 ring-background sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  <item.Icon className="size-5" aria-hidden="true" />
                </span>
                <Reveal className={i % 2 === 0 ? "sm:col-start-1 sm:pr-10 sm:text-right" : "sm:col-start-2 sm:pl-10"}>
                  <div className="rounded-card border border-border bg-card p-6 shadow-soft">
                    <p className="text-xs font-semibold tracking-wider text-eyebrow-foreground uppercase">{item.date}</p>
                    <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="soft" aria-labelledby="values-title">
        <Container>
          <SectionHeader
            id="values-title"
            eyebrow={t.why.eyebrow}
            title={t.why.title}
            highlight={t.why.highlight}
            subtitle={t.why.subtitle}
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((v, i) => {
              const VIcon = valueIcons[i];
              return (
                <RevealItem key={v.title} className="rounded-card border border-border bg-card p-6 shadow-soft">
                  <span className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-eyebrow text-eyebrow-foreground">
                    <VIcon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mb-1.5 font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      <Section aria-labelledby="team-preview-title">
        <Container>
          <SectionHeader
            id="team-preview-title"
            eyebrow={t.team.eyebrow}
            title={t.team.title}
            highlight={t.team.highlight}
            subtitle={t.team.subtitle}
          />
          <TeamGrid locale={locale} />
          <div className="mt-10 flex justify-center">
            <Link href={L("/team")} className={buttonVariants({ variant: "outline" })}>
              {t.team.meet}
              <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
