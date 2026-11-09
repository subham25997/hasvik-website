"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type TestimonialView = {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  quote: string;
  projectHref?: string;
};

type Strings = { previous: string; next: string; pause: string; play: string; goToSlide: string; rating: string; viewProject: string };

/** Swipeable (native scroll-snap) carousel with buttons, dots and pausable auto-play. */
export function TestimonialCarousel({ items, strings }: { items: TestimonialView[]; strings: Strings }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  const scrollTo = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const n = (i + items.length) % items.length;
      const child = el.children[n] as HTMLElement | undefined;
      if (child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
    },
    [items.length],
  );

  // Track which card is in view (works for swipe, buttons and keyboard scroll).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setIndex(Number((e.target as HTMLElement).dataset.index));
      },
      { root: el, threshold: 0.6 },
    );
    Array.from(el.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || hovered || reduce) return;
    const id = setInterval(() => scrollTo(index + 1), 6000);
    return () => clearInterval(id);
  }, [playing, hovered, reduce, index, scrollTo]);

  const btn =
    "inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-heading shadow-soft transition-colors hover:border-accent/50";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <ul
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto scroll-smooth px-4 pb-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <li key={it.id} data-index={i} className="w-[88%] shrink-0 snap-center sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]">
            <figure className="relative flex h-full flex-col rounded-card border border-border bg-card p-7 shadow-soft">
              <Quote aria-hidden="true" className="absolute top-6 right-6 size-10 text-accent/30" />
              <div role="img" aria-label={strings.rating.replace("{n}", String(it.rating))} className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    aria-hidden="true"
                    className={cn("size-4", s < it.rating ? "fill-[#f5b301] text-[#f5b301]" : "text-border")}
                  />
                ))}
              </div>
              <blockquote className="mb-6 flex-1 text-[0.95rem] leading-relaxed text-foreground/90">“{it.quote}”</blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border pt-5">
                <span
                  aria-hidden="true"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-600 font-semibold text-white"
                >
                  {it.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-heading">{it.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {it.company} · {it.location}
                  </span>
                  {it.projectHref ? (
                    <Link href={it.projectHref} className="mt-0.5 inline-block text-xs font-semibold text-link hover:underline">
                      {strings.viewProject} →
                    </Link>
                  ) : null}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-1.5">
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`${strings.goToSlide} ${i + 1}: ${it.name}`}
              aria-current={i === index ? "true" : undefined}
              className="inline-flex h-6 min-w-6 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-accent" : "w-3 bg-border hover:bg-muted-foreground/50",
                )}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => setPlaying((p) => !p)} aria-label={playing ? strings.pause : strings.play}>
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
          </button>
          <button type="button" className={btn} onClick={() => scrollTo(index - 1)} aria-label={strings.previous}>
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" className={btn} onClick={() => scrollTo(index + 1)} aria-label={strings.next}>
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
