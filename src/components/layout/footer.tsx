import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { BadgeCheck, Clock, Mail, MapPin, Phone } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath, tr } from "@/i18n/config";
import { fullAddress, site } from "@/content/site";
import { publishedServices } from "@/content/services";
import { cities } from "@/content/locations";
import { socialIcons } from "@/content/tech-icons.generated";
import { Container } from "@/components/ui/section";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const { locale, t } = await getDictionary();
  const year = await currentYear();
  const L = (p: string) => localizePath(p, locale);

  // noPrefetch: Next 16.4 returns 404 for the segment prefetch of these fully static pages
  // behind the locale rewrite (see docs/PROJECT_CONTEXT.md §6). Clicks navigate normally.
  const quick = [
    { href: L("/"), label: t.nav.home },
    { href: L("/about"), label: t.nav.about },
    { href: L("/services"), label: t.nav.services },
    { href: L("/products/leads-crm"), label: t.hero.productName },
    { href: L("/work"), label: t.nav.work },
    { href: L("/team"), label: t.nav.team },
    { href: L("/careers"), label: t.nav.careers, noPrefetch: true },
    { href: L("/contact"), label: t.nav.contact },
    { href: L("/locations"), label: t.footer.areas, noPrefetch: true },
  ];

  const socials = [
    { href: site.socials.facebook, label: "Facebook", path: socialIcons.facebook },
    { href: site.socials.instagram, label: "Instagram", path: socialIcons.instagram },
    { href: site.socials.linkedin, label: "LinkedIn", path: socialIcons.linkedin },
  ].filter((s) => s.href);

  const linkCls = "rounded text-white/75 transition-colors hover:text-white focus-visible:text-white";

  return (
    <footer className="on-dark relative overflow-hidden bg-brand-950 text-white">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl"
      />
      <Container className="relative grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Link href={L("/")} className="w-fit rounded-full bg-white px-4 py-2">
            <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} className="h-8 w-auto" />
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-white/75">{t.footer.about}</p>
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-semibold text-[#9be47f] ring-1 ring-accent/30">
            <BadgeCheck className="size-4" aria-hidden="true" />
            {t.footer.udyam}
          </p>
          {socials.length ? (
            <div>
              <p className="mb-3 text-sm font-semibold">{t.footer.follow}</p>
              <ul className="flex gap-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} ${t.a11y.external}`}
                      className="inline-flex size-11 items-center justify-center rounded-full bg-white/8 text-white/85 ring-1 ring-white/10 transition-colors hover:bg-accent-ink hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
                        <path d={s.path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <nav aria-label={t.footer.quickLinks} className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">{t.footer.quickLinks}</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {quick.map((q) => (
              <li key={q.href}>
                <Link href={q.href} prefetch={"noPrefetch" in q && q.noPrefetch ? false : undefined} className={linkCls}>
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.services} className="lg:col-span-3">
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">{t.footer.services}</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {publishedServices.map((s) => (
              <li key={s.slug}>
                <Link href={L(`/services/${s.slug}`)} className={linkCls}>
                  {tr(s.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">{t.footer.getInTouch}</h2>
          <ul className="flex flex-col gap-4 text-sm text-white/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <address className="not-italic">{fullAddress}</address>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`tel:${site.phone.e164}`} className={linkCls}>
                {site.phone.display}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${site.emails.info}`} className={linkCls}>
                {site.emails.info}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{tr(site.hours.display, locale)}</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-white/10 pt-8 md:col-span-2 lg:col-span-12">
          <h2 className="mb-3 text-xs font-semibold tracking-wider text-white/60 uppercase">{t.footer.areas}</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={L(`/locations/${c.slug}`)} className={linkCls}>
                  {tr(c.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-white/65 sm:flex-row sm:text-left">
          <p>
            © {year} {site.name}. {t.footer.rights} {t.footer.madeWith}
          </p>
          <div className="flex gap-4">
            <Link href={L("/privacy")} prefetch={false} className={linkCls}>
              {t.footer.privacy}
            </Link>
            <Link href={L("/terms")} prefetch={false} className={linkCls}>
              {t.footer.terms}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
