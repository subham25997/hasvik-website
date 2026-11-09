import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, MapPin, Quote, Star, Target, Wrench } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath, tr } from "@/i18n/config";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { getTestimonial } from "@/content/testimonials";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteUrl } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero, splitTitle } from "@/components/layout/page-hero";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProjectCard, StatusBadge } from "@/components/work/project-card";
import { Icon } from "@/components/icon";
import { CtaBand } from "@/components/home/cta-band";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) return {};
  return pageMetadata({ locale: lang, path: `/work/${slug}`, title: project.name, description: tr(project.caseStudy.solution, lang) });
}

export default function CaseStudyPage({ params, searchParams }: PageProps<"/[lang]/work/[slug]">) {
  void searchParams;
  return (
    <Suspense fallback={null}>
      <CaseStudyPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CaseStudyPageContent({ params, searchParams }: PageProps<"/[lang]/work/[slug]">) {
  void searchParams;
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  const testimonial = getTestimonial(project.testimonialId);
  const usedServices = project.services.map(getService).filter((s) => !!s);
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const { start, highlight } = splitTitle(project.name);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.name,
          description: tr(project.caseStudy.solution, locale),
          url: absoluteUrl(L(`/work/${project.slug}`)),
          image: absoluteUrl(project.image.src),
          creator: { "@id": `${siteUrl}/#organization`, "@type": "Organization", name: site.name },
          creativeWorkStatus: t.work.status[project.status],
          ...(project.status === "completed" ? { sameAs: project.liveUrl } : {}),
          ...(testimonial
            ? {
                review: {
                  "@type": "Review",
                  author: { "@type": "Person", name: testimonial.name },
                  reviewBody: testimonial.quote,
                  reviewRating: { "@type": "Rating", ratingValue: testimonial.rating, bestRating: 5 },
                },
              }
            : {}),
        }}
      />

      <PageHero
        eyebrow={t.work.category[project.category]}
        title={start}
        highlight={highlight}
        intro={tr(project.description, locale)}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: t.nav.work, href: L("/work") },
          { name: project.name, href: L(`/work/${project.slug}`) },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} label={t.work.status[project.status]} />
          {project.location ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15">
              <MapPin className="size-3.5" aria-hidden="true" />
              {project.location}
            </span>
          ) : null}
        </div>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${buttonVariants()} mt-6`}>
          {t.work.visitLive}
          <ArrowUpRight aria-hidden="true" />
          <span className="sr-only">{t.a11y.external}</span>
        </a>
      </PageHero>

      <Section aria-label={project.name}>
        <Container>
          <Reveal className="-mt-28 overflow-hidden rounded-xl2 border border-border bg-card shadow-lift sm:-mt-32">
            <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="ml-3 truncate rounded-md bg-card px-3 py-1 text-xs text-muted-foreground ring-1 ring-border">
                {project.liveUrl.replace(/^https?:\/\//, "")}
              </span>
            </div>
            <div className="relative aspect-[16/8]">
              <Image
                src={project.image.src}
                alt={tr(project.image.alt, locale)}
                fill
                priority
                sizes="(min-width: 1280px) 1216px, 96vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <Reveal className="rounded-xl2 border border-border bg-card p-8 shadow-soft">
              <Target className="mb-4 size-8 text-brand-700 dark:text-accent" aria-hidden="true" />
              <h2 className="mb-3 text-2xl font-bold">{t.work.problem}</h2>
              <p className="leading-relaxed text-muted-foreground">{tr(project.caseStudy.problem, locale)}</p>
            </Reveal>
            <Reveal delay={0.08} className="on-dark bg-hero relative overflow-hidden rounded-xl2 p-8 text-white shadow-lift">
              <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
              <Wrench className="relative mb-4 size-8 text-accent" aria-hidden="true" />
              <h2 className="relative mb-3 text-2xl font-bold text-white">{t.work.solution}</h2>
              <p className="relative leading-relaxed text-white/85">{tr(project.caseStudy.solution, locale)}</p>
            </Reveal>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
            <Reveal className="rounded-xl2 border border-border bg-card p-8 shadow-soft">
              <h2 className="mb-5 text-xl font-bold">{t.work.highlights}</h2>
              <ul className="grid gap-3 sm:grid-cols-3">
                {project.caseStudy.highlights.map((h) => (
                  <li key={tr(h, "en")} className="flex items-start gap-2 rounded-2xl bg-surface p-4 text-sm font-medium">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-ink dark:text-accent" aria-hidden="true" />
                    {tr(h, locale)}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="rounded-xl2 border border-border bg-card p-8 shadow-soft">
              <h2 className="mb-5 text-xl font-bold">{t.work.servicesUsed}</h2>
              <ul className="flex flex-col gap-2">
                {usedServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={L(`/services/${s.slug}`)}
                      className="flex min-h-11 items-center gap-3 rounded-xl px-2 text-sm font-semibold text-link hover:bg-surface"
                    >
                      <Icon name={s.icon} className="size-4" />
                      {tr(s.title, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {project.caseStudy.gallery?.length ? (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold">{t.work.screens}</h2>
              <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {project.caseStudy.gallery.map((g) => (
                  <RevealItem key={g.src}>
                    <figure className="group overflow-hidden rounded-card border border-border bg-card shadow-soft">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={g.src}
                          alt={tr(g.alt, locale)}
                          fill
                          sizes="(min-width: 1024px) 300px, 46vw"
                          className="object-cover object-top transition-[object-position] duration-[3000ms] ease-in-out group-hover:object-bottom"
                        />
                      </div>
                      <figcaption className="p-4 text-xs text-muted-foreground">{tr(g.caption, locale)}</figcaption>
                    </figure>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ) : null}

          {testimonial ? (
            <Reveal className="mt-16">
              <figure className="bg-soft relative overflow-hidden rounded-xl2 border border-border p-8 shadow-soft sm:p-12">
                <Quote aria-hidden="true" className="absolute top-8 right-8 size-16 text-accent/25" />
                <div role="img" aria-label={t.a11y.rating.replace("{n}", String(testimonial.rating))} className="mb-4 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} aria-hidden="true" className="size-5 fill-[#f5b301] text-[#f5b301]" />
                  ))}
                </div>
                <blockquote className="max-w-3xl text-lg leading-relaxed text-foreground sm:text-xl">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-6 font-semibold text-heading">
                  {testimonial.name}{" "}
                  <span className="font-normal text-muted-foreground">
                    · {testimonial.company}, {testimonial.location}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ) : null}
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="more-title">
        <Container>
          <SectionHeader
            id="more-title"
            eyebrow={t.work.eyebrow}
            {...(() => {
              const r = splitTitle(t.work.moreWork);
              return { title: r.start, highlight: r.highlight };
            })()}
          />
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <RevealItem key={p.slug}>
                <ProjectCard project={p} locale={locale} t={t} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
