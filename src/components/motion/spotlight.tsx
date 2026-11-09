"use client";

import { useCallback, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Card wrapper that tracks the pointer for the green spotlight glow (see .spotlight in globals.css). */
export function Spotlight({ className, onPointerMove, ...props }: ComponentProps<"div">) {
  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
      onPointerMove?.(e);
    },
    [onPointerMove],
  );
  return <div className={cn("spotlight", className)} onPointerMove={handleMove} {...props} />;
}
