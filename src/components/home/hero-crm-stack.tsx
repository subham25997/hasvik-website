"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCarousel } from "./use-carousel";

export type CrmShot = { src: string; title: string; description: string };

const SLIDE_MS = 4200;

/**
 * Where a card sits relative to the active one. The ring needs at least five cards; with six the
 * leftover one waits "back" behind the centre card, so every advance slides each card exactly one
 * place to the left and a fresh card enters from the right.
 */
function place(offset: number, count: number) {
  if (offset === 0) return "center";
  if (offset === 1) return "right";
  if (offset === count - 1) return "left";
  if (offset === 2) return "far-right";
  if (offset === count - 2) return "far-left";
  return "back";
}

/**
 * The HASVIK LEADS CRM showcase: the product name, one line describing the screen in the centre, the
 * screens fanned out in perspective (auto-advancing sideways), and `children` (the two buttons) as the
 * only thing under them.
 */
export function HeroCrmStack({
  shots,
  name,
  label,
  goToLabel,
  children,
}: {
  shots: CrmShot[];
  name: string;
  label: string;
  /** Accessible prefix for the side-card buttons, e.g. "Go to slide". */
  goToLabel: string;
  children: ReactNode;
}) {
  const { index, goTo, playing, reduce, bind } = useCarousel(shots.length, SLIDE_MS);
  const active = shots[index];
  const [brand, ...rest] = name.split(" ");

  return (
    <div {...bind} role="group" aria-roledescription="carousel" aria-label={label} className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] top-[30%] -bottom-4 -z-10 rounded-full bg-brand-blue/25 blur-3xl"
      />

      <header className="mx-auto max-w-2xl text-center">
        {/* Same face as the hero headline (Geist semibold); the green gradient picks out the product type. */}
        <h2 className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.1] font-semibold tracking-tight text-hero-fg">
          {brand} <span className="text-highlight">{rest.join(" ")}</span>
        </h2>
        <p
          aria-live={playing && !reduce ? "off" : "polite"}
          className="mt-3 min-h-13 text-center text-sm leading-relaxed text-hero-muted sm:text-base"
        >
          {active.description}
        </p>
      </header>

      {/* All cards share one grid cell, so the row is exactly as tall as a card and nothing needs a spacer. */}
      <div className="mt-4 grid overflow-x-clip perspective-[1800px]">
        {shots.map((shot, i) => {
          const pos = place((i - index + shots.length) % shots.length, shots.length);
          const isCenter = pos === "center";
          const isSide = pos === "left" || pos === "right";
          return (
            <div
              key={shot.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${shots.length}`}
              inert={!isCenter && !isSide}
              data-pos={pos}
              className="crm-card relative col-start-1 row-start-1 w-[80%] justify-self-center sm:w-[60%] lg:w-[42%]"
            >
              <div
                aria-hidden={!isCenter}
                className="crm-frame overflow-hidden rounded-lg border border-white/20 bg-brand-950 sm:rounded-xl"
              >
                <div className="flex h-5 items-center gap-1 bg-[#0d1b3d] px-2.5 sm:h-7 sm:gap-1.5 sm:px-3.5">
                  <span aria-hidden="true" className="size-1 rounded-full bg-white/30 sm:size-1.5" />
                  <span aria-hidden="true" className="size-1 rounded-full bg-white/30 sm:size-1.5" />
                  <span aria-hidden="true" className="size-1 rounded-full bg-white/30 sm:size-1.5" />
                  <span className="ml-1.5 truncate font-mono text-[0.55rem] text-white/60 sm:ml-2 sm:text-[0.68rem]">
                    {name} · {shot.title}
                  </span>
                </div>
                <div className="relative aspect-1900/867 bg-brand-900">
                  <Image
                    src={shot.src}
                    alt={`${shot.title}: ${shot.description}`}
                    fill
                    sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 80vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              {isSide && (
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${goToLabel} ${i + 1}: ${shot.title}`}
                  className="absolute inset-0 z-10 cursor-pointer rounded-xl focus-visible:-outline-offset-4"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* The only thing under the screens: the two buttons. */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 px-4 sm:mt-10">{children}</div>
    </div>
  );
}
