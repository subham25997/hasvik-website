"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { m, useReducedMotion } from "motion/react";
import { BookDemo } from "@/components/book-demo";
import type { Dictionary } from "@/i18n/dictionaries";
import { leadsCrmUrl } from "@/content/products";
import { cn } from "@/lib/utils";

type Shot = { src: string; width: number; height: number; title: string; description: string };

const SLIDE_MS = 4200;
const EASE_OUT = [0.33, 1, 0.68, 1] as const;

export function HeroMockup({
  shots,
  productPageUrl,
  label,
  productLabel,
  productName,
  exploreCrmLabel,
  bookDemoLabel,
  pauseLabel,
  playLabel,
  demoStrings,
  privacyHref,
}: {
  shots: Shot[];
  productPageUrl: string;
  label: string;
  productLabel: string;
  productName: string;
  exploreCrmLabel: string;
  bookDemoLabel: string;
  pauseLabel: string;
  playLabel: string;
  demoStrings: Dictionary["hero"]["demoForm"];
  privacyHref: string;
}) {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [engaged, setEngaged] = useState(false); // pointer or keyboard focus is inside the stage
  const reduce = useReducedMotion();
  const shot = shots[active];
  const autoplay = !userPaused && !engaged && !reduce;
  const tabsRef = useRef<HTMLUListElement>(null);

  // One timeout per slide keeps the progress line and the carousel in step.
  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % shots.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [active, autoplay, shots.length]);

  // On mobile the tabs scroll sideways: keep the active one in view without scrolling the page.
  useEffect(() => {
    const list = tabsRef.current;
    const tab = list?.children[active] as HTMLElement | undefined;
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const select = (index: number) => {
    setActive(index);
    setUserPaused(true);
  };

  return (
    <figure
      aria-label={label}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={() => setEngaged(false)}
      className="relative"
    >
      {/* 1px gradient border: brand green to blue, fading out toward the lower right. */}
      <div className="rounded-3xl bg-gradient-to-br from-brand-green/60 via-white/10 to-brand-blue/40 p-px shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]">
        <div className="grid gap-5 rounded-[calc(1.5rem-1px)] bg-hero-panel p-3 sm:p-4 lg:grid-cols-[19rem_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-4 lg:p-5">
          {/* Product identity + autoplay control */}
          <div className="flex items-start justify-between gap-3 px-1 pt-1 lg:col-start-1 lg:row-start-1">
            <div className="min-w-0">
              <p className="font-mono text-[0.7rem] tracking-[0.14em] text-brand-green uppercase sm:text-xs">{productLabel}</p>
              <h2 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-hero-fg sm:text-2xl">
                <Link
                  href={productPageUrl}
                  className="rounded-sm hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {productName}
                </Link>
              </h2>
            </div>
            {reduce ? null : (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? playLabel : pauseLabel}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-hero-line text-hero-muted transition-colors hover:border-brand-green/60 hover:text-hero-fg"
              >
                {userPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
              </button>
            )}
          </div>

          {/* Active screenshot: large and flat, with a soft inner shadow. */}
          <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div
              className="relative overflow-hidden rounded-2xl bg-hero-bg"
              style={{ aspectRatio: `${shot?.width ?? 1900} / ${shot?.height ?? 867}` }}
            >
              {shots.map((s, i) => (
                <m.div
                  key={s.src}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: reduce || i === active ? 1 : 0.98 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: EASE_OUT }}
                  aria-hidden="true"
                >
                  <Image
                    src={s.src}
                    alt=""
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1280px) 880px, (min-width: 1024px) 62vw, 94vw"
                    className="object-cover"
                  />
                </m.div>
              ))}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),inset_0_-40px_60px_-30px_rgb(0_0_0/0.35)]"
              />
            </div>
            {/* CTA card: floats over the corner from sm up; sits under the image on phones so it hides nothing. */}
            <div className="mt-3 flex items-center justify-between gap-1 rounded-2xl border border-white/15 bg-hero-bg/85 p-1 backdrop-blur-md sm:absolute sm:right-4 sm:bottom-4 sm:mt-0 sm:justify-start sm:p-1.5">
              <Link
                href={leadsCrmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-1 rounded-xl px-3 font-display text-sm font-medium text-hero-fg transition-colors hover:bg-white/10"
              >
                {exploreCrmLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <BookDemo
                strings={demoStrings}
                triggerLabel={bookDemoLabel}
                triggerClassName="h-10 w-auto rounded-xl bg-brand-green bg-none px-3.5 font-display text-hero-bg shadow-none hover:bg-brand-green hover:brightness-110"
                privacyHref={privacyHref}
              />
            </div>
            <p className="sr-only" aria-live="polite">
              {shot?.title}
            </p>
          </div>

          {/* Tabs: vertical list on desktop, horizontal scroller on mobile. */}
          <ul
            ref={tabsRef}
            className="relative -mx-3 flex snap-x [scrollbar-width:none] gap-2 overflow-x-auto px-3 pb-1 sm:-mx-4 sm:px-4 lg:col-start-1 lg:row-start-2 lg:mx-0 lg:snap-none lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {shots.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.src} className="w-[15.5rem] shrink-0 snap-start lg:w-auto">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block h-full w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors",
                      isActive ? "border-hero-line bg-white/[0.06]" : "border-transparent hover:bg-white/[0.04]",
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-hero-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className={cn("font-display text-sm font-medium", isActive ? "text-hero-fg" : "text-hero-muted")}>
                        {s.title}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "mt-1.5 line-clamp-2 pl-[2.1rem] text-[0.8rem] leading-relaxed text-hero-muted",
                        !isActive && "lg:hidden",
                      )}
                    >
                      {s.description}
                    </span>
                    {isActive ? (
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/10">
                        <span
                          key={`${active}-${autoplay}`}
                          className={cn("block h-full origin-left bg-brand-green", autoplay ? "animate-slide-progress" : "scale-x-100")}
                          style={{ "--slide-duration": `${SLIDE_MS}ms` } as CSSProperties}
                        />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </figure>
  );
}
