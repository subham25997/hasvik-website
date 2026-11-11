import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, CalendarCheck } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { fmt } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { getService } from "@/content/services";
import { getProject } from "@/content/projects";
import { leadsCrmUrl } from "@/content/products";
import { BookDemo } from "@/components/book-demo";
import { Icon } from "@/components/icon";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/** Entrance: fade up 12px over 600ms. The `motion-safe:` prefix skips it for reduced-motion users. */
const RISE = "motion-safe:animate-hero-rise";
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Delivered client sites shown as the hero visual: [left, centre, right]. */
const SHOWCASE = ["lr-engineering-solutions", "rm-suncity-public-school", "ashok-tent-house"] as const;

export async function Hero() {
  const { locale, t } = await getDictionary();
  const isHindi = locale === "hi";

  // getService only returns published services, so a hidden slug never links to a 404.
  const capabilities = t.hero.capabilities.flatMap((c) => {
    const service = getService(c.slug);
    return service ? [{ ...c, icon: service.icon }] : [];
  });

  const [left, centre, right] = SHOWCASE.map((slug) => getProject(slug));
  const trust = t.hero.trust.map((item) => fmt(item, { n: site.stats.projectsCompleted }));

  return (
    <section
      aria-labelledby="hero-title"
      className="hero-grain on-dark bg-hero relative isolate overflow-hidden pt-28 text-hero-fg transition-colors duration-300 motion-reduce:transition-none sm:pt-36 lg:pt-40"
    >
      {/* A faint grid and one soft glow behind the headline. Purely decorative. */}
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[min(64rem,120vw)] -translate-x-1/2 rounded-full bg-brand-blue/25 blur-3xl"
      />

      <Container className="flex flex-col items-center text-center">
        {/* Product spotlight: a small ticket for the CRM. A beam of light circles its border and the
            demo button pulses, so it gets noticed without competing with the headline or the green CTA. */}
        <aside
          aria-labelledby="hero-product"
          style={delay(0)}
          className={cn(
            "beam-border relative flex w-full max-w-md flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl bg-hero-tint p-2.5 text-left backdrop-blur-sm sm:w-auto sm:max-w-none sm:flex-nowrap sm:pr-3",
            RISE,
          )}
        >
          <span
            aria-hidden="true"
            className="relative hidden aspect-[1900/867] w-28 shrink-0 overflow-hidden rounded-lg border border-hero-line sm:block"
          >
            <Image src="/images/leads-crm/dashboard.jpg" alt="" fill sizes="112px" className="object-cover" />
          </span>
          <div className="min-w-0 flex-1 pl-1.5 sm:pl-0">
            <p className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.12em] text-brand-green uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-green motion-safe:animate-pulse" />
              {t.hero.productLabel}
            </p>
            <Link
              id="hero-product"
              href={leadsCrmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/crm inline-flex min-h-7 items-center gap-1 font-display text-base font-semibold text-hero-fg transition-colors hover:text-brand-green"
            >
              {t.hero.productName}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover/crm:translate-x-0.5 group-hover/crm:-translate-y-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
            <p className="hidden text-sm text-hero-muted lg:block">{t.hero.productTagline}</p>
          </div>
          <BookDemo
            strings={t.hero.demoForm}
            triggerLabel={t.hero.bookDemo}
            triggerIcon={<CalendarCheck aria-hidden="true" />}
            triggerClassName="demo-pulse h-11 w-full bg-white bg-none px-5 font-display text-sm font-semibold text-brand-900 shadow-none hover:bg-brand-green hover:text-brand-950 sm:w-auto"
            privacyHref={localizePath("/privacy", locale)}
          />
        </aside>

        <h1
          id="hero-title"
          className={cn(
            "mt-8 font-display text-[clamp(2.75rem,8vw,6rem)] font-semibold tracking-tight text-hero-fg",
            isHindi ? "leading-[1.25]" : "leading-[1.02]",
          )}
        >
          <span style={delay(80)} className={cn("block", RISE)}>
            {t.hero.titleLead}
          </span>
          {/* Screen readers get the full list once; the rotation is visual only. */}
          <span className="sr-only">{t.hero.titleWords.join(", ")}</span>
          <span style={delay(160)} className={cn("grid justify-items-center", RISE)}>
            {t.hero.titleWords.map((word, i) => (
              <span
                key={word}
                aria-hidden="true"
                style={{ "--i": i } as CSSProperties}
                className={cn(
                  // Instrument Serif has no Devanagari, so Hindi stays upright. Padding stops the italic overhang and descender clipping.
                  "word-cycle text-highlight col-start-1 row-start-1 px-[0.1em] pb-[0.14em] whitespace-nowrap",
                  !isHindi && "font-display-serif font-normal italic",
                )}
              >
                {word}
              </span>
            ))}
          </span>
          <span style={delay(240)} className={cn("block", RISE)}>
            {t.hero.titleHighlight}
          </span>
        </h1>

        <p style={delay(320)} className={cn("mt-7 max-w-2xl text-base leading-relaxed text-hero-muted sm:text-lg", RISE)}>
          {t.hero.subtitle}
        </p>

        <div style={delay(400)} className={cn("mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4", RISE)}>
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

        <ul style={delay(460)} className={cn("mt-6 flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-xs text-hero-muted", RISE)}>
          {trust.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-brand-green" />}
              {item}
            </li>
          ))}
        </ul>

        {/* What we do: every core service, one tap away. */}
        <nav aria-label={t.hero.capabilitiesLabel} style={delay(540)} className={cn("mt-12 sm:mt-14", RISE)}>
          <ul className="flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-2.5">
            {capabilities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={localizePath(`/services/${c.slug}`, locale)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hero-line bg-hero-tint px-4 font-display text-sm font-medium text-hero-fg transition-colors hover:border-brand-green/70 hover:bg-white/15 motion-reduce:transition-none"
                >
                  <Icon name={c.icon} className="size-4 text-brand-green" />
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {/* Proof: three delivered client sites. The hero's bottom edge crops them, like a desk seen from above. */}
      <ul
        aria-label={t.hero.recentWork}
        style={delay(620)}
        className={cn("relative mx-auto mt-14 -mb-[4%] w-[min(92%,58rem)] sm:mt-20 sm:-mb-[6%]", RISE)}
      >
        {[left, right].map(
          (p, i) =>
            p && (
              <li
                key={p.slug}
                className={cn(
                  "absolute top-[12%] hidden w-[68%] opacity-70 transition-opacity duration-300 hover:opacity-100 motion-reduce:transition-none md:block",
                  i === 0
                    ? "right-[58%] [transform:perspective(1600px)_rotateY(16deg)]"
                    : "left-[58%] [transform:perspective(1600px)_rotateY(-16deg)]",
                )}
              >
                <SiteFrame href={localizePath(`/work/${p.slug}`, locale)} name={p.name} image={p.image} sizes="40vw" />
              </li>
            ),
        )}
        {centre && (
          <li className="relative">
            <SiteFrame
              href={localizePath(`/work/${centre.slug}`, locale)}
              name={centre.name}
              image={centre.image}
              sizes="(min-width: 1024px) 928px, 92vw"
              preload
            />
          </li>
        )}
      </ul>
    </section>
  );
}

/** A client site inside a minimal browser frame, linking to its case study. */
function SiteFrame({
  href,
  name,
  image,
  sizes,
  preload,
}: {
  href: string;
  name: string;
  image: { src: string; width: number; height: number };
  sizes: string;
  preload?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={name}
      className="block overflow-hidden rounded-t-2xl border border-b-0 border-hero-line bg-brand-950 shadow-(--stage-shadow)"
    >
      <span className="flex h-9 items-center gap-1.5 border-b border-white/10 px-4">
        <span aria-hidden="true" className="size-2 rounded-full bg-white/25" />
        <span aria-hidden="true" className="size-2 rounded-full bg-white/25" />
        <span aria-hidden="true" className="size-2 rounded-full bg-white/25" />
        <span className="ml-3 truncate font-mono text-[0.7rem] text-white/60">{name}</span>
      </span>
      <Image src={image.src} alt="" width={image.width} height={image.height} sizes={sizes} preload={preload} className="block w-full" />
    </Link>
  );
}
