import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, FolderCheck, MapPinned } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath, tr } from "@/i18n/config";
import { fmt } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { RotatingText } from "@/components/motion/rotating-text";
import { HeroMockup } from "./hero-mockup";
import { cn } from "@/lib/utils";

const crmScreenshotDimensions: Record<string, { width: number; height: number }> = {
  "dashboard.jpg": { width: 1900, height: 870 },
  "leads.jpg": { width: 1897, height: 865 },
  "kanaban.jpg": { width: 1886, height: 867 },
  "followups-list.jpg": { width: 1902, height: 871 },
  "followups-calendar.jpg": { width: 1891, height: 862 },
  "business-followup-history.jpg": { width: 1897, height: 867 },
};

export async function Hero() {
  const { locale, t } = await getDictionary();
  const shots = t.hero.crmSlides.map((slide) => ({
    ...slide,
    src: `/images/leads-crm/${slide.image}`,
    ...crmScreenshotDimensions[slide.image],
  }));
  const trustIcons = [BadgeCheck, CalendarDays, FolderCheck, MapPinned];
  const trust = t.hero.trust.map((s) => fmt(s, { n: site.stats.projectsCompleted }));
  const tagline = tr(site.tagline, locale)
    .split(". ")
    .map((w) => w.replace(/\.$/, ""));

  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark bg-hero relative isolate overflow-hidden pt-28 pb-12 text-white sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 size-[34rem] rounded-full bg-[#2fa3ff]/20 blur-[120px]" />
        <div className="absolute bottom-[-14rem] left-1/4 size-[30rem] rounded-full bg-[#2f9e60]/15 blur-[120px]" />
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black/10" />
      </div>

      <Container className="grid items-center gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
        <div className="flex flex-col items-start gap-4 sm:gap-5 lg:gap-6">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/95 sm:text-sm">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.legalStatus} · {site.address.locality}, {site.address.district}
          </span>

          <h1 id="hero-title" className="text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[4.1rem]">
            {t.hero.titleStart} <span className="text-highlight">{t.hero.titleHighlight}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{t.hero.subtitle}</p>

          <div className="w-full max-w-xl border-l-2 border-accent/70 py-1 pl-4 text-base text-white/80 sm:text-lg">
            <span className="mb-0.5 block text-[0.68rem] font-semibold tracking-[0.16em] text-white/55 uppercase">
              {t.hero.rotatingPrefix}
            </span>
            <RotatingText items={t.hero.rotating} />
          </div>

          <ul
            aria-label={tr(site.tagline, locale)}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] font-semibold tracking-[0.12em] text-white/65 uppercase"
          >
            {tagline.map((w, i) => (
              <li key={w} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true" className="size-1 rounded-full bg-accent/80" /> : null}
                <span>{w}</span>
              </li>
            ))}
          </ul>

          <div className="grid w-full grid-cols-1 gap-2.5 pt-1 min-[390px]:grid-cols-2 sm:flex sm:w-auto sm:gap-3">
            <Link
              href={localizePath("/services", locale)}
              className={cn(buttonVariants({ size: "lg" }), "w-full min-w-0 px-3 text-sm sm:w-auto sm:px-8 sm:text-base")}
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href={localizePath("/contact", locale)}
              className={cn(buttonVariants({ variant: "glass", size: "lg" }), "w-full min-w-0 px-3 text-sm sm:w-auto sm:px-8 sm:text-base")}
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <HeroMockup
          shots={shots}
          productPageUrl={localizePath("/products/leads-crm", locale)}
          label={t.hero.mockupLabel}
          goToLabel={t.a11y.goToSlide}
          previousLabel={t.a11y.previous}
          nextLabel={t.a11y.next}
          productLabel={t.hero.productLabel}
          productName={t.hero.productName}
          exploreCrmLabel={t.hero.ctaCrm}
          bookDemoLabel={t.hero.bookDemo}
          demoStrings={t.hero.demoForm}
          privacyHref={localizePath("/privacy", locale)}
        />
      </Container>

      <Container className="mt-10 sm:mt-12 lg:mt-14">
        <ul className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 sm:gap-3 sm:p-3 lg:grid-cols-4">
          {trust.map((item, i) => {
            const TrustIcon = trustIcons[i];
            return (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-xs leading-snug font-medium text-white/90 sm:gap-3 sm:px-3 sm:py-2.5 sm:text-sm"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent">
                  <TrustIcon className="size-4 sm:size-5" aria-hidden="true" />
                </span>
                {item}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
