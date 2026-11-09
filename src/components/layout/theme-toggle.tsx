"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ label, className }: { label: string; className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      {/* Icons swap purely via CSS so there's no hydration mismatch. */}
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  );
}
