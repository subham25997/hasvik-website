import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Locale routing:
 *  - "/about"    -> rewritten internally to "/en/about" (English URLs stay clean)
 *  - "/hi/about" -> served as-is (Hindi)
 *  - "/en/about" -> 308 redirect to "/about" (avoid duplicate URLs)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDefaultPrefixed = pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`);
  if (isDefaultPrefixed) {
    // Generated metadata images live under the locale segment; never redirect them.
    if (/\/(opengraph|twitter)-image/.test(pathname)) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const hasOtherLocale = locales.some((l) => l !== defaultLocale && (pathname === `/${l}` || pathname.startsWith(`/${l}/`)));
  if (hasOtherLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, metadata routes and any file with an extension.
  matcher: ["/((?!_next|api|icon|apple-icon|.*\\..*).*)"],
};
