"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Rescans for [data-reveal] elements after client-side navigations (initial scan: reveal-script.ts). */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    (window as unknown as { __hasvikReveal?: () => void }).__hasvikReveal?.();
  }, [pathname]);
  return null;
}
