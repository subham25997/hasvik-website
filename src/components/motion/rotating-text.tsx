"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cycles through full service phrases (replaces the old Typed.js line).
 * Screen readers get the full list once instead of a constantly changing region.
 */
export function RotatingText({ items, interval = 2600 }: { items: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval, reduce]);

  return (
    <span className="relative block w-full max-w-xl">
      <span className="sr-only">{items.join(", ")}</span>
      <span aria-hidden="true" className="relative block h-[3.2em] overflow-hidden sm:h-[1.6em]">
        {/* Sync mode: outgoing and incoming phrases overlap, so there is never a blank frame. */}
        <AnimatePresence initial={false}>
          <m.span
            key={index}
            className="absolute inset-x-0 top-0 block font-semibold text-[#9be47f] sm:whitespace-nowrap"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {items[index]}
          </m.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
