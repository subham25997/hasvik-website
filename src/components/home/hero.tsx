import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, CalendarCheck } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath, tr } from "@/i18n/config";
import { fmt } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { leadsCrmUrl } from "@/content/products";
import { BookDemo } from "@/components/book-demo";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { HeroCrmStack } from "./hero-crm-stack";
import { HeroMonitor } from "./hero-monitor";
import { cn } from "@/lib/utils";

/** Entrance: fade up 12px over 600ms. The `motion-safe:` prefix skips it for reduced-motion users. */
const RISE = "motion-safe:animate-hero-rise";
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

const STATUS_ORDER = { completed: 0, "in-progress": 1, demo: 2 } as const;

/** Small monospaced captions that frame the hero on very wide screens. Decorative. */
const edgeText = "font-mono text-xs leading-6 tracking-[0.28em] text-white/40 uppercase";

export async function Hero() {
  const { locale, t } = await getDictionary();
  const isHindi = locale === "hi";

  // The same projects as the Work section, delivered ones first.
  const works = [...projects]
    .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])
    .map((p) => ({
      id: p.slug,
      name: p.name,
      src: p.image.src,
      alt: tr(p.image.alt, locale),
      href: localizePath(`/work/${p.slug}`, locale),
      statusLabel: t.work.status[p.status],
    }));

  const crmShots = t.hero.crmSlides.map((s) => ({
    src: `/images/leads-crm/${s.image}`,
    title: s.title,
    description: s.description,
  }));

  const carouselLabels = {
    pause: t.a11y.pause,
    play: t.a11y.play,
    goToSlide: t.a11y.goToSlide,
  };
  const trust = t.hero.trust.map((item) => fmt(item, { n: site.stats.projectsCompleted }));

  return (
    <section
      aria-labelledby="hero-title"
      className="hero-grain on-dark bg-hero relative isolate overflow-hidden pt-28 pb-20 text-hero-fg transition-colors duration-300 motion-reduce:transition-none min-[1800px]:pb-28 sm:pt-36 lg:pt-32"
    >
      {/* A faint grid and soft glows. Purely decorative. */}
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-24 -z-10 size-120 rounded-full bg-brand-blue/30 blur-3xl sm:size-184"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 -z-10 size-104 rounded-full bg-brand-green/10 blur-3xl sm:size-144"
      />

      {/* Edge captions, only where the margins are wide enough to hold them. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden min-[1800px]:block">
        <p className={cn(edgeText, "absolute top-28 right-10 border-l border-white/20 pl-5")}>
          {t.hero.edgeTop.map((w) => (
            <span key={w} className="block">
              {w}
            </span>
          ))}
        </p>
        <p className={cn(edgeText, "absolute top-[34%] right-10 flex gap-4")}>
          <span className="mt-3 h-px w-10 shrink-0 bg-brand-green" />
          <span>
            {t.hero.edgeMid.map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))}
          </span>
        </p>
        <p className={cn(edgeText, "absolute bottom-10 left-10 flex max-w-48 items-end gap-4")}>
          <span className="mb-3 h-px w-10 shrink-0 bg-brand-green" />
          {t.hero.edgeLeft}
        </p>
        <p className={cn(edgeText, "absolute right-10 bottom-10 flex max-w-52 items-end gap-4 text-right")}>
          {t.hero.edgeRight}
          <span className="mb-3 h-px w-10 shrink-0 bg-brand-green" />
        </p>
      </div>

      <Container className="max-w-336">
        <div className="grid items-center gap-x-10 gap-y-14 lg:grid-cols-[1.1fr_1fr]">
          {/* Message */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1
              id="hero-title"
              className={cn(
                "font-display text-[clamp(2.5rem,11vw,4rem)] font-semibold tracking-tight text-hero-fg lg:text-[clamp(2.25rem,3.6vw,3.2rem)]",
                isHindi ? "leading-tight" : "leading-[1.04]",
              )}
            >
              <span style={delay(80)} className={cn("block", RISE)}>
                {t.hero.titleLead}
              </span>
              {/* Screen readers get the full list once; the rotation is visual only. */}
              <span className="sr-only">{t.hero.titleWords.join(", ")}</span>
              <span style={delay(160)} className={cn("grid justify-items-center lg:justify-items-start", RISE)}>
                {t.hero.titleWords.map((word, i) => (
                  <span
                    key={word}
                    aria-hidden="true"
                    style={{ "--i": i } as CSSProperties}
                    className={cn(
                      // Instrument Serif has no Devanagari, so Hindi stays upright. Padding stops the italic overhang and descender clipping.
                      "word-cycle text-highlight col-start-1 row-start-1 pr-[0.1em] pb-[0.14em] whitespace-nowrap",
                      !isHindi && "font-display-serif font-normal italic",
                    )}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span style={delay(240)} className={cn("block text-balance", RISE)}>
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p style={delay(320)} className={cn("mt-6 max-w-lg text-base leading-relaxed text-hero-muted sm:text-lg", RISE)}>
              {t.hero.subtitle}
            </p>

            <div
              style={delay(400)}
              className={cn("mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center sm:gap-4", RISE)}
            >
              <Link
                href={localizePath("/contact", locale)}
                className={cn(buttonVariants({ variant: "heroPrimary", size: "lg" }), "w-full rounded-full sm:w-auto")}
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href={localizePath("/work", locale)}
                className={cn(
                  buttonVariants({ variant: "heroGhost", size: "lg" }),
                  "w-full justify-center rounded-full border border-hero-fg/40 bg-none px-8 pb-0 hover:bg-hero-tint hover:text-hero-fg sm:w-auto",
                )}
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <ul
              style={delay(460)}
              className={cn(
                "mt-7 flex flex-col items-center gap-y-1.5 font-mono text-xs text-hero-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:text-sm lg:justify-start",
                RISE,
              )}
            >
              {trust.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden="true" className="hidden sm:inline">
                      •
                    </span>
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Our work, playing on a desktop monitor */}
          <div style={delay(300)} className={RISE}>
            <HeroMonitor slides={works} label={t.hero.recentWork} labels={carouselLabels} />
          </div>
        </div>
      </Container>

      {/* Our product: HASVIK LEADS CRM, its screens fanning sideways. */}
      <div id="hero-crm" style={delay(520)} className={cn("mt-16 scroll-mt-28 sm:mt-20", RISE)}>
        <Container className="max-w-336">
          <HeroCrmStack shots={crmShots} name={t.hero.productName} label={t.hero.mockupLabel} goToLabel={t.a11y.goToSlide}>
            <BookDemo
              strings={t.hero.demoForm}
              triggerLabel={t.hero.bookDemo}
              triggerIcon={<CalendarCheck aria-hidden="true" />}
              triggerClassName="demo-pulse h-12 w-auto rounded-full border border-white bg-white bg-none px-7 font-display text-base font-semibold text-brand-900 shadow-none hover:bg-white/90 hover:text-brand-950"
              privacyHref={localizePath("/privacy", locale)}
            />
            <Link
              href={leadsCrmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "heroPrimary", size: "md" }), "h-12 rounded-full px-7")}
            >
              {t.hero.ctaCrm}
              <ArrowUpRight
                className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="sr-only">{t.a11y.external}</span>
            </Link>
          </HeroCrmStack>
        </Container>
      </div>
    </section>
  );
}
