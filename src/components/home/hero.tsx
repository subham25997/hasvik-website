import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { fmt } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { getService } from "@/content/services";
import { projects } from "@/content/projects";
import { team } from "@/content/team";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { HeroMockup } from "./hero-mockup";
import { HeroStats } from "./hero-stats";
import { cn } from "@/lib/utils";

const crmScreenshotDimensions: Record<string, { width: number; height: number }> = {
  "dashboard.jpg": { width: 1900, height: 867 },
  "leads.jpg": { width: 1897, height: 865 },
  "kanaban.jpg": { width: 1886, height: 867 },
  "followups-list.jpg": { width: 1901, height: 868 },
  "followups-calendar.jpg": { width: 1891, height: 862 },
  "business-followup-history.jpg": { width: 1897, height: 867 },
};

/** Entrance: fade up 12px over 600ms. The `motion-safe:` prefix skips it for reduced-motion users. */
const RISE = "motion-safe:animate-hero-rise";
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export async function Hero() {
  const { locale, t } = await getDictionary();
  const isHindi = locale === "hi";

  const shots = t.hero.crmSlides.map((slide) => ({
    ...slide,
    src: `/images/leads-crm/${slide.image}`,
    ...crmScreenshotDimensions[slide.image],
  }));

  // getService only returns published services, so a hidden slug never links to a 404.
  const capabilities = t.hero.capabilities.filter((c) => getService(c.slug));

  const stats = [
    { value: site.stats.projectsCompleted, suffix: "+", label: t.hero.stats.projects },
    { value: site.stats.happyClients, suffix: "+", label: t.hero.stats.clients },
    { value: site.stats.projectsInProgress, label: t.hero.stats.inProgress },
    { value: team.length, label: t.hero.stats.team },
  ];

  // Real delivered projects only. No invented logos.
  const clients = projects.filter((p) => p.status === "completed");

  return (
    <section
      aria-labelledby="hero-title"
      className="hero-grain relative isolate overflow-hidden bg-hero-bg pt-28 pb-14 text-hero-fg sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-24"
    >
      <Container>
        {/* Editorial split: headline on the left, the "what and how" on the right. */}
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12 lg:gap-y-0">
          <div className="flex flex-col lg:col-span-7">
            <p
              style={delay(0)}
              className={cn("flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-hero-muted uppercase", RISE)}
            >
              <span aria-hidden="true" className="h-px w-8 bg-brand-green" />
              {fmt(t.hero.eyebrow, { year: site.foundedYear })}
            </p>

            <h1
              id="hero-title"
              className={cn(
                "mt-6 font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold tracking-tight text-balance text-hero-fg",
                isHindi ? "leading-[1.18]" : "leading-[0.95]",
              )}
            >
              <span style={delay(80)} className={cn("block", RISE)}>
                {t.hero.titleStart}
              </span>
              <span
                style={delay(160)}
                className={cn(
                  "block text-brand-green",
                  RISE,
                  // Instrument Serif has no Devanagari: keep Hindi upright and mark it with colour alone.
                  !isHindi && "font-display-serif font-normal italic",
                )}
              >
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Credential, anchored to the foot of the column so the whitespace above it reads as intentional. */}
            <p className="mt-10 flex items-center gap-2 font-mono text-xs text-hero-muted lg:mt-auto lg:pt-10">
              <BadgeCheck className="size-4 text-brand-green" aria-hidden="true" />
              {site.legalStatus}
            </p>
          </div>

          <div style={delay(240)} className={cn("flex flex-col gap-8 lg:col-span-5 lg:pt-[2.4rem]", RISE)}>
            <p className="max-w-md text-base leading-relaxed text-hero-muted sm:text-lg">{t.hero.subtitle}</p>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Link
                href={localizePath("/services", locale)}
                className={cn(buttonVariants({ variant: "heroPrimary", size: "lg" }), "w-full sm:w-auto")}
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href={localizePath("/contact", locale)}
                className={cn(buttonVariants({ variant: "heroGhost", size: null }), "min-h-11 self-start sm:self-auto")}
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <nav aria-label={t.hero.capabilitiesLabel}>
              <p className="font-mono text-xs tracking-[0.14em] text-hero-muted uppercase">{t.hero.capabilitiesLabel}</p>
              <ol className="mt-3 border-t border-hero-line">
                {capabilities.map((c, i) => (
                  <li key={c.slug}>
                    <Link
                      href={localizePath(`/services/${c.slug}`, locale)}
                      className="group/row flex items-baseline gap-4 border-b border-hero-line py-3.5 transition-colors hover:border-brand-green/50 focus-visible:outline-2 focus-visible:-outline-offset-2"
                    >
                      <span aria-hidden="true" className="font-mono text-xs text-hero-muted tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-lg text-hero-fg">{c.label}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 -translate-x-2 self-center text-brand-green opacity-0 transition-all duration-300 group-hover/row:translate-x-0 group-hover/row:opacity-100 group-focus-visible/row:translate-x-0 group-focus-visible/row:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>

        <div style={delay(340)} className={cn("mt-14 sm:mt-20", RISE)}>
          <HeroStats stats={stats} />
        </div>

        {/* Product stage, with one faint brand-gradient line along its top edge. */}
        <div style={delay(440)} className={cn("relative mt-12 sm:mt-16", RISE)}>
          <div aria-hidden="true" className="hero-hairline absolute inset-x-12 -top-px z-10 h-px opacity-70" />
          <HeroMockup
            shots={shots}
            productPageUrl={localizePath("/products/leads-crm", locale)}
            label={t.hero.mockupLabel}
            productLabel={t.hero.productLabel}
            productName={t.hero.productName}
            exploreCrmLabel={t.hero.ctaCrm}
            bookDemoLabel={t.hero.bookDemo}
            pauseLabel={t.a11y.pause}
            playLabel={t.a11y.play}
            demoStrings={t.hero.demoForm}
            privacyHref={localizePath("/privacy", locale)}
          />
        </div>

        {/* Trust row: delivered projects as monochrome wordmarks that brighten on hover. */}
        <div style={delay(520)} className={cn("mt-12 sm:mt-16", RISE)}>
          <p className="font-mono text-xs tracking-[0.14em] text-hero-muted uppercase">{t.hero.trustedBy}</p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
            {clients.map((c) => (
              <li key={c.slug}>
                <Link
                  href={localizePath(`/work/${c.slug}`, locale)}
                  className="font-display text-lg font-medium tracking-tight text-hero-fg opacity-55 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 sm:text-xl"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
