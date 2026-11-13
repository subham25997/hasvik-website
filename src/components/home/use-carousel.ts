"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Autoplay state shared by the hero carousels.
 *
 * Autoplay stops while the pointer or keyboard focus is inside, while the carousel is scrolled out of
 * view, when the visitor pauses it, and permanently for visitors who prefer reduced motion
 * (they can still step through with the buttons). One timeout per slide means any manual change
 * restarts the countdown, so a slide never flips right after the visitor picked it.
 */
export function useCarousel(count: number, interval: number) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const autoplay = !userPaused && !engaged && visible && !reduce;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearTimeout(id);
  }, [autoplay, index, count, interval]);

  const togglePlay = useCallback(() => setUserPaused((p) => !p), []);

  return {
    index,
    goTo: setIndex,
    /** True when the visitor has not paused it. Drives the pause/play button. */
    playing: !userPaused,
    togglePlay,
    /** Reduced motion: there is no autoplay to control, so the pause button is hidden. */
    reduce,
    /** Spread onto the carousel's root element. */
    bind: {
      ref,
      onMouseEnter: () => setEngaged(true),
      onMouseLeave: () => setEngaged(false),
      onFocus: () => setEngaged(true),
      onBlur: () => setEngaged(false),
    },
  };
}
