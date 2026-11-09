import Link from "next/link";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { nonTechServices, techServices } from "@/content/services";
import { PillTabs } from "@/components/ui/tabs";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ServiceCard } from "./service-card";

/** Technology and non-technology service tabs. Used on the homepage and /services. */
export function ServicesGrid({ locale, t }: { locale: Locale; t: Dictionary }) {
  const tech = (
    <RevealGroup className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {techServices.map((s) => (
        <RevealItem key={s.slug}>
          <ServiceCard service={s} locale={locale} learnMore={t.services.learnMore} />
        </RevealItem>
      ))}
    </RevealGroup>
  );

  const nonTech = (
    <RevealGroup className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {nonTechServices.map((s) => (
        <RevealItem key={s.slug}>
          <ServiceCard service={s} locale={locale} learnMore={t.services.learnMore} />
        </RevealItem>
      ))}
      <RevealItem>
        <div className="on-dark bg-hero relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-card p-7 text-white shadow-soft">
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
          <div className="relative">
            <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-accent-ink text-white">
              <MessageCircleQuestion className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mb-2 text-xl font-semibold text-white">{t.services.customTitle}</h3>
            <p className="text-sm leading-relaxed text-white/80">{t.services.customBody}</p>
          </div>
          <Link
            href={`${localizePath("/contact", locale)}#quote`}
            className="relative inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-white/10 px-5 font-semibold ring-1 ring-white/20 transition-colors hover:bg-white/20"
          >
            {t.services.customCta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </RevealItem>
    </RevealGroup>
  );

  return (
    <PillTabs
      label={t.services.tabsLabel}
      tabs={[
        { value: "tech", label: t.services.tabTech, content: tech },
        { value: "non-tech", label: t.services.tabNonTech, content: nonTech },
      ]}
    />
  );
}
