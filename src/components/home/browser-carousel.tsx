"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselSlide = { src: string; width: number; height: number; alt: string; caption: string; href?: string };

type Strings = { previous: string; next: string; pause: string; play: string; goToSlide: string; live: string; external: string };

/** Browser-chrome framed, auto-playing carousel (WAI-ARIA carousel pattern, pausable). */
export function BrowserCarousel({
  slides,
  domain,
  strings,
  interval = 5000,
}: {
  slides: CarouselSlide[];
  domain: string;
  strings: Strings;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  const autoplay = playing && !hovered && !reduce;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => go(1), interval);
    return () => clearInterval(id);
  }, [autoplay, go, interval]);

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={domain}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_40px_80px_-30px_rgb(2_6_23/0.8)]">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200">
            <span className="truncate">
              {domain}
              {slide.href ? new URL(slide.href).pathname.replace(/^\/$/, "") : ""}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <span aria-hidden="true" className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            {strings.live}
          </span>
        </div>

        <div aria-live={autoplay ? "off" : "polite"} className="group/shot relative aspect-[16/11] overflow-hidden bg-slate-100">
          <AnimatePresence initial={false} mode="popLayout">
            <m.div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${slides.length}`}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover object-top transition-[object-position] duration-[3500ms] ease-in-out group-hover/shot:object-bottom"
              />
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-h-[3rem] text-sm text-white/85 sm:max-w-sm">
          {slide.caption}
          {slide.href ? (
            <a
              href={slide.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1.5 inline-flex items-center gap-1 font-semibold text-[#9be47f] hover:underline"
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              <span className="sr-only">{strings.external}</span>
            </a>
          ) : null}
        </p>
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? strings.pause : strings.play}
            className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/20"
          >
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={strings.previous}
            className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/20"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={strings.next}
            className="inline-flex size-11 items-center justify-center rounded-full bg-accent-ink text-white hover:brightness-105"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`${strings.goToSlide} ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className="inline-flex h-6 min-w-6 items-center justify-center"
          >
            <span
              className={cn(
                "block h-1 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-accent" : "w-4 bg-white/30 hover:bg-white/60",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
