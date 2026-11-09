"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { ArrowRight, Menu, X } from "lucide-react";
import { stripLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

export type NavLink = { href: string; path: string; label: string };

type Props = {
  locale: Locale;
  links: NavLink[];
  homeHref: string;
  quote: { href: string; label: string };
  logo: { src: string; width: number; height: number; alt: string };
  strings: {
    mainNav: string;
    openMenu: string;
    closeMenu: string;
    theme: string;
    language: string;
    languageShort: string;
    languageName: string;
  };
};

export function Navbar({ locale, links, homeHref, quote, logo, strings }: Props) {
  const pathname = stripLocale(usePathname() || "/");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => (path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`));

  const LogoPill = (
    <Link
      href={homeHref}
      className="flex shrink-0 items-center rounded-full bg-white px-3.5 py-1.5 shadow-[0_4px_18px_-6px_rgb(0_0_0/0.35)] transition-transform duration-200 hover:scale-[1.03]"
    >
      <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority className="h-7 w-auto sm:h-8" />
    </Link>
  );

  return (
    <header className="on-dark fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border px-3 transition-all duration-300 ease-out sm:px-4",
          scrolled
            ? "h-16 border-white/15 bg-brand-950/80 shadow-[0_12px_40px_-12px_rgb(2_6_23/0.6)] backdrop-blur-xl backdrop-saturate-150"
            : "h-18 border-white/10 bg-brand-900/40 backdrop-blur-md",
        )}
      >
        {LogoPill}

        <nav aria-label={strings.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const active = isActive(l.path);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center rounded-full px-4 text-sm font-medium transition-colors",
                      active ? "bg-white/12 text-white" : "text-white/80 hover:bg-white/8 hover:text-white",
                    )}
                  >
                    {l.label}
                    {active ? <span aria-hidden="true" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageToggle
            locale={locale}
            short={strings.languageShort}
            name={strings.languageName}
            label={strings.language}
            className="hidden sm:inline-flex"
          />
          <ThemeToggle label={strings.theme} className="hidden sm:inline-flex" />
          <Link href={quote.href} className={cn(buttonVariants({ size: "sm" }), "ml-1 hidden md:inline-flex")}>
            {quote.label}
            <ArrowRight className="transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
          </Link>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              aria-label={strings.openMenu}
              className="inline-flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-brand-950/60 backdrop-blur-sm" />
              <Dialog.Content
                aria-describedby={undefined}
                className="on-dark fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col gap-6 overflow-y-auto bg-brand-950 p-5 text-white shadow-2xl outline-none"
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="sr-only">{strings.mainNav}</Dialog.Title>
                  {LogoPill}
                  <Dialog.Close
                    aria-label={strings.closeMenu}
                    className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10"
                  >
                    <X className="size-6" aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <nav aria-label={strings.mainNav}>
                  <ul className="flex flex-col gap-1">
                    {links.map((l) => {
                      const active = isActive(l.path);
                      return (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex min-h-12 items-center justify-between rounded-2xl px-4 text-base font-medium",
                              active ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5",
                            )}
                          >
                            {l.label}
                            {active ? <span aria-hidden="true" className="size-2 rounded-full bg-accent" /> : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="mt-auto flex flex-col gap-3">
                  <Link href={quote.href} onClick={() => setOpen(false)} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                    {quote.label}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <div className="flex items-center justify-center gap-2 rounded-full bg-white/5 p-1">
                    <LanguageToggle locale={locale} short={strings.languageName} name={strings.languageName} label={strings.language} />
                    <ThemeToggle label={strings.theme} />
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
