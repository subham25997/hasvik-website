import { getDictionary } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { site } from "@/content/site";
import { Navbar } from "./navbar";

export const navPaths = ["/", "/about", "/services", "/work", "/team", "/contact"] as const;

export async function SiteHeader() {
  const { locale, t } = await getDictionary();
  const labels: Record<(typeof navPaths)[number], string> = {
    "/": t.nav.home,
    "/about": t.nav.about,
    "/services": t.nav.services,
    "/work": t.nav.work,
    "/team": t.nav.team,
    "/contact": t.nav.contact,
  };

  return (
    <Navbar
      locale={locale}
      homeHref={localizePath("/", locale)}
      links={navPaths.map((p) => ({ path: p, href: localizePath(p, locale), label: labels[p] }))}
      quote={{ href: `${localizePath("/contact", locale)}#quote`, label: t.nav.getQuote }}
      logo={{ src: site.logo.src, width: site.logo.width, height: site.logo.height, alt: `${site.name} — ${t.nav.home}` }}
      strings={{
        mainNav: t.a11y.mainNav,
        openMenu: t.a11y.openMenu,
        closeMenu: t.a11y.closeMenu,
        theme: t.a11y.theme,
        language: t.a11y.language,
        languageShort: t.nav.languageShort,
        languageName: t.nav.languageName,
      }}
    />
  );
}
