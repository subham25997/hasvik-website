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

export function HeroMockup({
  shots,
  productPageUrl,
  label,
  productLabel,
  productName,
  productTagline,
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
  productTagline: string;
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

  // On mobile the chips scroll sideways: keep the active one in view without scrolling the page.
  useEffect(() => {
    const list = tabsRef.current;
    const tab = list?.children[active] as HTMLElement | undefined;
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - 20, behavior: reduce ? "auto" : "smooth" });
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
      className="hero-stage relative"
    >
      <div className="hero-stage-border rounded-3xl p-px">
        {/* Mobile order: heading, screenshot, feature chips, buttons. Desktop: text column left, browser frame right. */}
        <div className="grid gap-6 rounded-[calc(1.5rem-1px)] bg-hero-surface p-5 transition-colors duration-300 motion-reduce:transition-none sm:p-7 lg:grid-cols-[22rem_minmax(0,1fr)] lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-10 lg:gap-y-6 lg:p-9">
          {/* Heading, supporting line, autoplay control */}
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.14em] text-stage-accent uppercase sm:text-xs">
              <span aria-hidden="true" className="h-px w-6 bg-stage-accent" />
              {productLabel}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em] text-heading sm:text-3xl">
                <Link
                  href={productPageUrl}
                  className="rounded-sm hover:text-stage-accent focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {productName}
                </Link>
              </h2>
              {reduce ? null : (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? playLabel : pauseLabel}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-stage-accent hover:text-heading"
                >
                  {userPaused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
                </button>
              )}
            </div>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">{productTagline}</p>
          </div>

          {/* Browser frame. Nothing sits on top of the image. */}
          <div className="lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:self-center">
            <div className="overflow-hidden rounded-xl border border-border bg-hero-bg shadow-[0_24px_60px_-28px_rgb(0_20_60/0.45)]">
              <div aria-hidden="true" className="flex h-8 items-center gap-1.5 border-b border-border bg-surface px-3">
                <span className="size-2.5 rounded-full bg-muted-foreground/35" />
                <span className="size-2.5 rounded-full bg-muted-foreground/35" />
                <span className="size-2.5 rounded-full bg-muted-foreground/35" />
              </div>
              <div className="relative" style={{ aspectRatio: "1900 / 867" }}>
                {shots.map((s, i) => (
                  <m.div
                    key={s.src}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.4, ease: "easeInOut" }}
                    aria-hidden="true"
                  >
                    <Image
                      src={s.src}
                      alt=""
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1280px) 820px, (min-width: 1024px) 58vw, 90vw"
                      className="object-cover"
                    />
                  </m.div>
                ))}
              </div>
            </div>
            <p className="sr-only" aria-live="polite">
              {shot?.title}
            </p>
          </div>

          {/* Features: vertical list on desktop, scrollable chips on mobile. */}
          <ul
            ref={tabsRef}
            className="relative -mx-5 -my-2 flex snap-x [scrollbar-width:none] gap-2 overflow-x-auto px-5 py-2 sm:-mx-7 sm:px-7 lg:col-start-1 lg:row-start-2 lg:mx-0 lg:my-0 lg:snap-none lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:py-0 [&::-webkit-scrollbar]:hidden"
          >
            {shots.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.src} className="shrink-0 snap-start lg:w-auto">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block w-full overflow-hidden rounded-full border px-4 py-2 text-left whitespace-nowrap transition-colors lg:rounded-lg lg:border-0 lg:px-4 lg:py-2.5 lg:whitespace-normal",
                      isActive ? "border-border bg-surface" : "border-border/60 hover:bg-surface lg:border-transparent",
                    )}
                  >
                    {isActive ? (
                      <span aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-0.5 bg-stage-accent lg:block" />
                    ) : null}
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={cn(
                          "font-display text-sm font-medium transition-colors",
                          isActive ? "text-heading" : "text-muted-foreground",
                        )}
                      >
                        {s.title}
                      </span>
                    </span>
                    {isActive ? (
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-border/60">
                        <span
                          key={`${active}-${autoplay}`}
                          className={cn("block h-full origin-left bg-stage-accent", autoplay ? "animate-slide-progress" : "scale-x-100")}
                          style={{ "--slide-duration": `${SLIDE_MS}ms` } as CSSProperties}
                        />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-start-1 lg:row-start-3">
            <BookDemo
              strings={demoStrings}
              triggerLabel={bookDemoLabel}
              triggerClassName="h-11 w-auto rounded-xl bg-stage-primary bg-none px-5 font-display text-stage-primary-fg shadow-none hover:bg-stage-primary-hover hover:text-stage-primary-fg"
              privacyHref={privacyHref}
            />
            <Link
              href={leadsCrmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/explore inline-flex min-h-11 items-center gap-1 font-display text-sm font-semibold text-heading transition-colors hover:text-stage-accent"
            >
              {exploreCrmLabel}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover/explore:translate-x-0.5 group-hover/explore:-translate-y-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </figure>
  );
}
