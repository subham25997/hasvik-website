// Locale configuration shared by server, client and proxy code.
// English is the default and is served without a prefix ("/about");
// Hindi lives under "/hi" ("/hi/about"). See src/proxy.ts.

export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const htmlLang: Record<Locale, string> = { en: "en-IN", hi: "hi-IN" };
export const ogLocale: Record<Locale, string> = { en: "en_IN", hi: "hi_IN" };

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Build a locale-aware internal href. `path` must start with "/". */
export function localizePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Strip a locale prefix from a pathname ("/hi/about" -> "/about"). */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

/** A content string that is either shared or translated per locale. */
export type Localized = string | { en: string; hi: string };

export function tr(value: Localized, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}
