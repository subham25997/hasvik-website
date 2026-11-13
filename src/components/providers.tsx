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

