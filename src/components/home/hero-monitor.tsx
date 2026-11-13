"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCarousel } from "./use-carousel";

export type MonitorSlide = {
  id: string;
  name: string;
  src: string;
  alt: string;
  href: string;
  statusLabel: string;
};

const SLIDE_MS = 5200;

/**
 * A desktop monitor, drawn in CSS and sitting on its stand, whose screen plays our delivered work. Each
 * slide links to its case study. Slides sit stacked and cross-fade: the one leaving slides out to the
 * left, the one arriving comes in from the right (transform and opacity only, so it stays smooth on phones).
 * The screen is a wide 2:1 so our wide site screenshots show in full instead of being cropped.
 */
export function HeroMonitor({ slides, label }: { slides: MonitorSlide[]; label: string }) {
  const { index, playing, reduce, bind } = useCarousel(slides.length, SLIDE_MS);
  const active = slides[index];
  const prevIndex = (index - 1 + slides.length) % slides.length;

  return (
    <div
      {...bind}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative isolate mx-auto w-full max-w-[40rem] lg:max-w-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -top-10 -bottom-4 -z-10 rounded-full bg-brand-blue/25 blur-3xl"
      />

      <div className="relative">
        {/* Bezel and chin */}
        <div className="monitor-bezel relative mx-auto w-full rounded-[0.8rem] p-[1.5%] pb-[4.2%] sm:rounded-[1.1rem]">
          <span
            aria-hidden="true"
            className="absolute bottom-[1.5%] left-1/2 size-[3px] -translate-x-1/2 rounded-full bg-slate-500/60 sm:size-1"
          />
          <div className="relative aspect-[2/1] overflow-hidden rounded-[0.25rem] bg-brand-950 shadow-[0_0_0_3px_#0b1328] sm:rounded-sm">
            {/* Browser bar with a skeleton address, so no real URL is shown */}
            <div className="absolute inset-x-0 top-0 z-10 flex h-4 items-center gap-1 bg-[#eef2f9] px-1.5 sm:h-6 sm:gap-1.5 sm:px-2.5">
              <span aria-hidden="true" className="size-1 rounded-full bg-[#ff5f57] sm:size-1.5" />
              <span aria-hidden="true" className="size-1 rounded-full bg-[#febc2e] sm:size-1.5" />
              <span aria-hidden="true" className="size-1 rounded-full bg-[#28c840] sm:size-1.5" />
              <span
                aria-hidden="true"
                className="ml-1 flex h-2.5 w-[45%] max-w-52 items-center rounded-full bg-white px-1.5 sm:ml-2 sm:h-4 sm:px-2.5"
              >
                <span className="h-1 w-2/3 rounded-full bg-slate-300 motion-safe:animate-pulse sm:h-1.5" />
              </span>
            </div>

            <div className="absolute inset-x-0 top-4 bottom-0 sm:top-6">
              {slides.map((s, i) => {
                const isActive = i === index;
                return (
                  <div
                    key={s.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} / ${slides.length}`}
                    inert={!isActive}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      isActive ? "translate-x-0 opacity-100" : i === prevIndex ? "-translate-x-6 opacity-0" : "translate-x-6 opacity-0",
                    )}
                  >
                    <Link href={s.href} className="relative block size-full focus-visible:outline-2 focus-visible:-outline-offset-4">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        preload={i === 0}
                        sizes="(min-width: 1024px) 640px, (min-width: 640px) 600px, 92vw"
                        className="object-cover object-top"
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
            <div aria-hidden="true" className="monitor-glare pointer-events-none absolute inset-0 z-20" />
          </div>
        </div>

        {/* Neck and foot: the monitor sits on the desk, so it does not float. */}
        <div aria-hidden="true" className="monitor-neck mx-auto h-7 w-[15%] sm:h-11 lg:h-12" />
        <div aria-hidden="true" className="monitor-foot mx-auto h-2 w-[30%] rounded-[50%/100%] sm:h-3" />
        <div aria-hidden="true" className="mx-auto -mt-1 h-4 w-[44%] rounded-full bg-black/40 blur-xl" />
        {/* A line of light along the desk */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-12%] bottom-[0.35rem] -z-10 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-80 shadow-[0_0_24px_6px_rgb(47_163_255/0.45)]"
        />
      </div>

      <p aria-live={playing && !reduce ? "off" : "polite"} className="sr-only">
        {active.name}, {active.statusLabel}
      </p>
    </div>
  );
}
