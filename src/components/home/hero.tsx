import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { fmt } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { getService } from "@/content/services";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { HeroMockup } from "./hero-mockup";
import { cn } from "@/lib/utils";

const crmScreenshotDimensions: Record<string, { width: number; height: number }> = {
  "dashboard.jpg": { width: 1900, height: 867 },
  "leads.jpg": { width: 1897, height: 865 },
  "kanaban.jpg": { width: 1886, height: 867 },
  "followups-list.jpg": { width: 1901, height: 868 },
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
  const projects = fmt(t.hero.trust[1], { n: site.stats.projectsCompleted });
  // getService only returns published services, so a hidden slug never links to a 404.
  const capabilities = t.hero.capabilities.filter((c) => getService(c.slug));

  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark bg-hero relative isolate overflow-hidden pt-28 pb-16 text-white sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Dot grid that fades out toward the edges, keeping focus on the centre. */}
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.14)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)] bg-size-[26px_26px]" />
        {/* Single soft light source behind the product stage. */}
        <div className="absolute top-[42%] left-1/2 h-[36rem] w-[min(70rem,140vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(91_177_64/0.22),rgb(47_163_255/0.12)_55%,transparent)] blur-2xl" />
      </div>

      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] py-1.5 pr-4 pl-1.5 text-xs font-medium text-white/85 sm:text-sm">
            <span className="rounded-full bg-accent-ink px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-white sm:text-xs">
              {t.hero.trust[0]}
            </span>
            {projects}
          </p>

          <h1
            id="hero-title"
            className="mt-7 text-[2.5rem] leading-[1.05] font-extrabold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl"
          >
            {t.hero.titleStart} <span className="text-highlight">{t.hero.titleHighlight}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-white/80 sm:text-xl">{t.hero.subtitle}</p>

          <nav aria-label={t.hero.capabilitiesLabel} className="mt-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm font-medium text-white/90 sm:text-[0.95rem]">
              {capabilities.map((c, i) => (
                <li key={c.slug} className="flex items-center">
                  {i > 0 ? <span aria-hidden="true" className="mx-1.5 size-1 rounded-full bg-accent" /> : null}
                  <Link
                    href={localizePath(`/services/${c.slug}`, locale)}
                    className="rounded-sm px-1 py-1.5 underline-offset-[5px] transition-colors hover:text-white hover:underline hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-9 flex w-full flex-col items-center gap-3 min-[440px]:w-auto min-[440px]:flex-row min-[440px]:gap-7">
            <Link href={localizePath("/services", locale)} className={cn(buttonVariants({ size: "lg" }), "w-full px-9 min-[440px]:w-auto")}>
              {t.hero.ctaPrimary}
              <ArrowRight className="transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href={localizePath("/contact", locale)}
              className="group/link inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-white/85 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-base"
            >
              {t.hero.ctaSecondary}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
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
        </div>
      </Container>
    </section>
  );
}
