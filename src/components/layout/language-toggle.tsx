"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { localizePath, stripLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageToggle({
  locale,
  short,
  name,
  label,
  className,
}: {
  locale: Locale;
  short: string;
  name: string;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const target: Locale = locale === "en" ? "hi" : "en";
  const href = localizePath(stripLocale(pathname || "/"), target);

  return (
    <Link
      href={href}
      hrefLang={target === "en" ? "en-IN" : "hi-IN"}
      lang={target}
      aria-label={`${label}: ${name}`}
      title={name}
      className={cn(
        "inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span>{short}</span>
    </Link>
  );
}
