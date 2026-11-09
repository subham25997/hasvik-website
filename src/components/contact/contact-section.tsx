import { Briefcase, Clock, Headphones, Info, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath, tr } from "@/i18n/config";
import { fullAddress, site, whatsappLink } from "@/content/site";
import { nonTechServices, techServices } from "@/content/services";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";
import { WhatsappGlyph } from "@/components/layout/whatsapp-fab";
import { ContactForm } from "./contact-form";
import { MapFacade } from "./map-facade";

export async function ContactSection({
  as = "h2",
  defaultService,
  hideHeader = false,
}: {
  as?: "h1" | "h2";
  defaultService?: string;
  hideHeader?: boolean;
}) {
  const { locale, t } = await getDictionary();
  const c = t.contact.channels;

  const channels = [
    {
      key: "sales",
      icon: Briefcase,
      label: c.sales.label,
      body: c.sales.body,
      value: site.emails.sales,
      href: `mailto:${site.emails.sales}`,
    },
    {
      key: "support",
      icon: Headphones,
      label: c.support.label,
      body: c.support.body,
      value: site.emails.support,
      href: `mailto:${site.emails.support}`,
    },
    { key: "info", icon: Info, label: c.info.label, body: c.info.body, value: site.emails.info, href: `mailto:${site.emails.info}` },
    {
      key: "careers",
      icon: Mail,
      label: c.careers.label,
      body: c.careers.body,
      value: site.emails.careers,
      href: `mailto:${site.emails.careers}`,
    },
    { key: "phone", icon: Phone, label: c.phone.label, body: c.phone.body, value: site.phone.display, href: `tel:${site.phone.e164}` },
  ];

  const toOption = (s: (typeof techServices)[number]) => ({ value: s.slug, label: tr(s.title, locale) });

  return (
    <Section
      tone="soft"
      id="contact"
      aria-labelledby={hideHeader ? undefined : "contact-title"}
      aria-label={hideHeader ? t.contact.pageTitle : undefined}
    >
      <Container>
        {hideHeader ? null : (
          <SectionHeader
            as={as}
            id="contact-title"
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            highlight={t.contact.highlight}
            subtitle={t.contact.subtitle}
          />
        )}

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-card bg-[#0f5132] p-5 text-white shadow-soft transition-transform hover:-translate-y-0.5 dark:bg-[#0d3d27]"
            >
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-whatsapp text-white">
                <WhatsappGlyph className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{c.whatsapp.label}</span>
                <span className="block text-sm text-white/80">{c.whatsapp.body}</span>
              </span>
              <span className="font-semibold">{site.phone.display}</span>
              <span className="sr-only">{t.a11y.external}</span>
            </a>

            <RevealGroup className="grid gap-3 sm:grid-cols-2">
              {channels.map((ch) => (
                <RevealItem key={ch.key}>
                  <a
                    href={ch.href}
                    className="group flex h-full flex-col gap-1 rounded-card border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lift"
                  >
                    <span className="mb-2 inline-flex size-10 items-center justify-center rounded-xl bg-sky-50 text-brand-700 group-hover:bg-accent-ink group-hover:text-white dark:bg-white/5 dark:text-accent dark:group-hover:bg-accent-ink dark:group-hover:text-white">
                      <ch.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-heading">{ch.label}</span>
                    <span className="text-sm font-medium break-all text-link">{ch.value}</span>
                    <span className="text-xs text-muted-foreground">{ch.body}</span>
                  </a>
                </RevealItem>
              ))}
              <RevealItem>
                <div className="flex h-full flex-col gap-1 rounded-card border border-border bg-card p-5 shadow-soft">
                  <span className="mb-2 inline-flex size-10 items-center justify-center rounded-xl bg-sky-50 text-brand-700 dark:bg-white/5 dark:text-accent">
                    <Clock className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-heading">{t.contact.hours}</span>
                  <span className="text-sm text-muted-foreground">{tr(site.hours.display, locale)}</span>
                </div>
              </RevealItem>
            </RevealGroup>

            <Reveal className="rounded-card border border-border bg-card p-5 shadow-soft">
              <div className="flex gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-brand-700 dark:bg-white/5 dark:text-accent">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-heading">{t.contact.office}</p>
                  <address className="text-sm text-muted-foreground not-italic">{fullAddress}</address>
                  <a
                    href={site.mapsListingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-link hover:underline"
                  >
                    <Navigation className="size-4" aria-hidden="true" />
                    {t.contact.directions}
                    <span className="sr-only">{t.a11y.external}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal id="quote" className="scroll-mt-28 rounded-xl2 border border-border bg-card p-6 shadow-lift sm:p-8">
              <h3 className="text-2xl font-bold">{t.contact.form.title}</h3>
              <p className="mt-1 mb-6 text-sm text-muted-foreground">{t.contact.form.intro}</p>
              <ContactForm
                strings={t.contact.form}
                validation={t.contact.validation}
                privacyHref={localizePath("/privacy", locale)}
                techOptions={techServices.map(toOption)}
                nonTechOptions={nonTechServices.map(toOption)}
                defaultService={defaultService}
              />
            </Reveal>
            <MapFacade
              src={site.mapEmbedUrl}
              title={t.contact.mapTitle}
              loadLabel={t.contact.loadMap}
              notice={t.contact.mapNotice}
              address={fullAddress}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
