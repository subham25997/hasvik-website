import { tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { processSteps } from "@/content/services";
import { Icon } from "@/components/icon";
import { SectionHeader } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function ProcessStrip({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <div>
      <SectionHeader
        eyebrow={t.services.processEyebrow}
        title={t.services.processTitle}
        highlight={t.services.processHighlight}
        subtitle={t.services.processSubtitle}
      />
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, i) => (
          <RevealItem key={tr(step.title, "en")} className="relative">
            <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-card border border-border bg-card p-6 text-center shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-lg">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600/40 via-accent to-brand-600/10 opacity-70 transition-opacity group-hover:opacity-100"
              />
              <span className="relative mb-5 inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-900 to-brand-600 text-white shadow-md ring-1 shadow-brand-900/20 ring-white/15">
                <Icon name={step.icon} className="size-7" />
                <span className="absolute -top-2 -right-2 inline-flex size-7 items-center justify-center rounded-full border-2 border-card bg-accent-ink text-[0.65rem] font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <h3 className="mb-2 text-lg font-semibold tracking-tight">{tr(step.title, locale)}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{tr(step.body, locale)}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
