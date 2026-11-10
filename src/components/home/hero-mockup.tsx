"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { BookDemo } from "@/components/book-demo";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";
import { leadsCrmUrl } from "@/content/products";
import { cn } from "@/lib/utils";

type Shot = { src: string; width: number; height: number; title: string; description: string };

const SLIDE_MS = 4200;

export function HeroMockup({
  shots,
  productPageUrl,
  label,
  goToLabel,
  previousLabel,
  nextLabel,
  productLabel,
  productName,
  exploreCrmLabel,
  bookDemoLabel,
  demoStrings,
  privacyHref,
}: {
  shots: Shot[];
  productPageUrl: string;
  label: string;
  goToLabel: string;
  previousLabel: string;
  nextLabel: string;
  productLabel: string;
  productName: string;
  exploreCrmLabel: string;
  bookDemoLabel: string;
  demoStrings: Dictionary["hero"]["demoForm"];
  privacyHref: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const shot = shots[active];
  const autoplay = !paused && !reduce;

  // A timeout per slide (rather than an interval) keeps the tab progress bar,
  // which restarts on every slide or pause change, in step with the carousel.
  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % shots.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [active, autoplay, shots.length]);

  const selectSlide = (index: number) => {
    setActive((index + shots.length) % shots.length);
    setPaused(true);
  };

  const exploreLink = (className?: string) => (
    <Link
      href={leadsCrmUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant: "glass", size: "sm" }), "h-9 px-3.5", className)}
    >
      {exploreCrmLabel}
      <ArrowUpRight
        className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        aria-hidden="true"
      />
    </Link>
  );

  const bookDemo = (className?: string) => (
    <BookDemo
      strings={demoStrings}
      triggerLabel={bookDemoLabel}
      triggerClassName={cn("h-9 bg-accent-ink px-3.5 shadow-none hover:bg-accent-teal", className)}
      privacyHref={privacyHref}
    />
  );

  return (
    <figure
      aria-label={label}
      className="relative mx-auto w-full max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Browser window. Leans back slightly on large screens and settles flat on hover or focus. */}
      <div className="lg:[perspective:2400px]">
        <div className="group/frame origin-top overflow-hidden rounded-2xl border border-white/15 bg-[#0b2540] shadow-[0_50px_100px_-30px_rgb(2_6_23/0.85),0_0_0_1px_rgb(255_255_255/0.04)] transition-transform duration-700 ease-out motion-reduce:transition-none lg:[transform:rotateX(9deg)] lg:focus-within:[transform:rotateX(0deg)] lg:hover:[transform:rotateX(0deg)]">
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-3 py-2.5 sm:px-4">
            <div aria-hidden="true" className="hidden shrink-0 gap-1.5 sm:flex">
              <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="size-2.5 rounded-full bg-[#28c840]/80" />
            </div>

            <div className="flex min-w-0 flex-1 items-center gap-2.5 md:justify-center">
              <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-[#9be47f] ring-1 ring-accent/30">
                {productLabel}
              </span>
              <h2 className="truncate text-sm font-bold tracking-wide text-white sm:text-[0.95rem]">
                <Link href={productPageUrl} className="rounded-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2">
                  {productName}
                </Link>
              </h2>
            </div>

            <div className="hidden shrink-0 items-center gap-2 md:flex">
              {exploreLink()}
              {bookDemo("w-auto")}
            </div>
          </div>

          <div className="relative bg-[#102b46]" style={{ aspectRatio: `${shot?.width ?? 1900} / ${shot?.height ?? 867}` }}>
            {shots.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt=""
                aria-hidden="true"
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 1024px, 94vw"
                className={cn("object-cover transition-opacity duration-700 ease-out", i === active ? "opacity-100" : "opacity-0")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 md:hidden">
        {exploreLink("w-full")}
        {bookDemo("w-full")}
      </div>

      <figcaption className="mt-6 sm:mt-8">
        <p className="sr-only" aria-live="polite">
          {shot?.title}
        </p>

        {/* Wide screens: labelled tabs, with the active one filling up as autoplay advances. */}
        <div className="hidden justify-center xl:flex">
          <div className="inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.05] p-1">
            {shots.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => selectSlide(i)}
                  aria-label={`${goToLabel} ${i + 1}: ${s.title}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                    isActive ? "bg-white/[0.12] text-white" : "text-white/65 hover:bg-white/[0.06] hover:text-white",
                  )}
                >
                  {s.title}
                  {isActive ? (
                    <span aria-hidden="true" className="absolute inset-x-4 bottom-1 h-0.5 overflow-hidden rounded-full bg-white/15">
                      <span
                        key={`${active}-${autoplay}`}
                        className={cn(
                          "block h-full origin-left rounded-full bg-accent",
                          autoplay ? "animate-slide-progress" : "scale-x-100",
                        )}
                        style={{ "--slide-duration": `${SLIDE_MS}ms` } as CSSProperties}
                      />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Smaller screens: compact stepper. */}
        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={() => selectSlide(active - 1)}
            aria-label={previousLabel}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-accent/60 hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-sm font-semibold text-white">{shot?.title}</p>
            <div className="mt-2 flex justify-center gap-1.5">
              {shots.map((s, i) => (
                <span
                  key={s.src}
                  aria-hidden="true"
                  className={cn("h-1 rounded-full transition-all duration-300", i === active ? "w-6 bg-accent" : "w-1.5 bg-white/30")}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => selectSlide(active + 1)}
            aria-label={nextLabel}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-accent/60 hover:text-white"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
