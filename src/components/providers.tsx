"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
        <Toaster position="bottom-center" richColors closeButton duration={5000} />
      </LazyMotion>
    </MotionConfig>
  );
}

/** Runs before paint to apply the saved theme (light is the default). */
export const themeScript = `try{var d=localStorage.getItem('theme')==='dark';var e=document.documentElement;e.classList.add('js');e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light'}catch(_){}`;
