"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { BookDemo } from "@/components/book-demo";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";
import { leadsCrmUrl } from "@/content/products";
import { cn } from "@/lib/utils";

type Shot = { src: string; width: number; height: number; title: string; description: string };

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

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % shots.length), 4200);
    return () => clearInterval(id);
  }, [paused, reduce, shots.length]);

  const selectSlide = (index: number) => {
    setActive((index + shots.length) % shots.length);
    setPaused(true);
  };

  return (
    <figure
      aria-label={label}
      className="relative mx-auto w-full max-w-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-accent/25 blur-3xl" />

      <header className="mb-2 flex items-center justify-between gap-3 px-1 sm:mb-3 sm:px-2">
        <h2 className="truncate text-sm font-bold tracking-wide text-white sm:text-base">
          <Link href={productPageUrl} className="rounded-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2">
            {productName}
          </Link>
        </h2>
        <span className="shrink-0 rounded-full border border-white/20 bg-white/[0.08] px-2.5 py-1 text-[0.65rem] font-medium text-white/70 tabular-nums sm:text-xs">
          {String(active + 1).padStart(2, "0")} <span className="text-white/40">/</span> {String(shots.length).padStart(2, "0")}
        </span>
      </header>

      <div className="relative rounded-[1.65rem] border border-white/20 bg-white/[0.08] p-2 shadow-[0_32px_80px_-36px_rgb(2_6_23/0.8)] backdrop-blur-md sm:rounded-[2rem] sm:p-3">
        <div
          className="relative overflow-hidden rounded-xl bg-slate-100 ring-1 ring-black/10 sm:rounded-2xl"
          style={{ aspectRatio: `${shot?.width ?? 1900} / ${shot?.height ?? 870}` }}
        >
          <span className="absolute top-2 left-2 z-20 inline-flex rounded-full border border-white/30 bg-accent-500 px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-white shadow-lg sm:top-3 sm:left-3 sm:text-xs">
            {productLabel}
          </span>
          {shots.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt=""
              aria-hidden="true"
              fill
              priority={i === 0}
              sizes="(min-width: 1280px) 576px, (min-width: 1024px) 45vw, 92vw"
              className={cn("object-contain transition-opacity duration-700 ease-out", i === active ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-white/15 bg-white/[0.06] p-3 shadow-lg backdrop-blur-sm sm:mt-4 sm:rounded-3xl sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white sm:text-base">{shot?.title}</h2>
            <p className="mt-1 max-w-lg text-xs leading-relaxed text-white/70 sm:text-sm">{shot?.description}</p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2 min-[440px]:w-auto min-[440px]:flex-row">
            <Link
              href={leadsCrmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "glass", size: "sm" }),
                "w-full border border-accent/40 bg-accent/10 text-white hover:bg-accent/20 min-[440px]:w-auto",
              )}
            >
              {exploreCrmLabel}
              <ArrowUpRight
                className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            <BookDemo
              strings={demoStrings}
              triggerLabel={bookDemoLabel}
              triggerClassName="w-full min-[440px]:w-auto"
              privacyHref={privacyHref}
            />
          </div>
        </div>

        <figcaption className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
          <button
            type="button"
            onClick={() => selectSlide(active - 1)}
            aria-label={previousLabel}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-accent/60 hover:text-white sm:size-9"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <div className="flex flex-1 items-center justify-center gap-1.5">
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => selectSlide(i)}
                aria-label={`${goToLabel} ${i + 1}: ${s.title}`}
                aria-current={i === active ? "true" : undefined}
                className="group flex h-8 min-w-5 flex-1 items-center justify-center sm:h-9 sm:min-w-7"
              >
                <span
                  className={cn(
                    "block h-1 w-full max-w-10 rounded-full transition-all duration-300",
                    i === active ? "bg-accent shadow-[0_0_12px_rgb(113_197_84/0.65)]" : "bg-white/25 group-hover:bg-white/50",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => selectSlide(active + 1)}
            aria-label={nextLabel}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-accent/60 hover:text-white sm:size-9"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </figcaption>
      </div>
    </figure>
  );
}
