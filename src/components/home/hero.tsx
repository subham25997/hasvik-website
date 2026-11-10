import Link from "next/link";
import { ArrowRight, FolderCheck, MapPinned } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { fmt } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
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
  const trustIcons = [FolderCheck, MapPinned];
  // The legal status already leads the hero; the strip carries the other proof points.
  const trust = t.hero.trust.slice(1, 3).map((s) => fmt(s, { n: site.stats.projectsCompleted }));

  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark bg-hero relative isolate overflow-hidden pt-28 pb-14 text-white sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 size-[34rem] rounded-full bg-[#2fa3ff]/15 blur-[120px]" />
        <div className="bg-grid absolute inset-0 opacity-30" />
      </div>

      <Container className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:gap-7">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-white/70 uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {site.legalStatus}
          </span>

          <h1
            id="hero-title"
            className="text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-[3.75rem]"
          >
            {t.hero.titleStart} <span className="text-highlight">{t.hero.titleHighlight}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-pretty text-white/80 sm:text-lg">{t.hero.subtitle}</p>

          <div className="flex w-full flex-col gap-3 pt-2 min-[440px]:w-auto min-[440px]:flex-row min-[440px]:items-center min-[440px]:gap-6">
            <Link href={localizePath("/services", locale)} className={cn(buttonVariants({ size: "lg" }), "w-full px-8 min-[440px]:w-auto")}>
              {t.hero.ctaPrimary}
              <ArrowRight className="transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href={localizePath("/contact", locale)}
              className="inline-flex min-h-11 items-center justify-center rounded-sm text-sm font-semibold text-white/85 underline decoration-white/30 underline-offset-[6px] transition-colors hover:text-white hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-base"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>

          <ul className="mt-2 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/75">
            {trust.map((item, i) => {
              const TrustIcon = trustIcons[i];
              return (
                <li key={item} className="flex items-center gap-2">
                  <TrustIcon className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              );
            })}
          </ul>
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
    </section>
  );
}
