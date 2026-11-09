import { Gauge, HeartHandshake, ShieldCheck, Wallet } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { site } from "@/content/site";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Counter } from "@/components/motion/counter";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";

export async function WhySection() {
  const { t } = await getDictionary();
  const stats = [
    { value: site.stats.projectsCompleted, suffix: "+", label: t.why.stats.completed },
    { value: site.stats.projectsInProgress, suffix: "", label: t.why.stats.inProgress },
    { value: site.stats.happyClients, suffix: "+", label: t.why.stats.clients },
    { value: site.stats.yearsExperience, suffix: "+", label: t.why.stats.years },
  ];
  const icons = [ShieldCheck, HeartHandshake, Wallet, Gauge];

  return (
    <Section tone="soft" aria-labelledby="why-title">
      <div
        aria-hidden="true"
        className="bg-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)] opacity-50"
      />
      <Container className="relative">
        <SectionHeader id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} highlight={t.why.highlight} subtitle={t.why.subtitle} />

        <RevealGroup className="grid gap-4 lg:grid-cols-12">
          <RevealItem className="lg:col-span-5">
            <dl className="on-dark relative grid h-full grid-cols-2 gap-px overflow-hidden rounded-xl2 bg-white/10 shadow-lift">
              <div aria-hidden="true" className="bg-hero absolute inset-0" />
              <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
              {stats.map((s) => (
                <div key={s.label} className="relative flex flex-col justify-center gap-1 p-6 text-white sm:p-8">
                  <dt className="order-2 text-sm text-white/80">{s.label}</dt>
                  <dd className="order-1 text-4xl font-extrabold tracking-tight text-[#9be47f] sm:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </RevealItem>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {t.why.cards.map((c, i) => {
              const CIcon = icons[i];
              return (
                <RevealItem key={c.title}>
                  <Spotlight className="group h-full rounded-card border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                    <span className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-eyebrow text-eyebrow-foreground transition-transform duration-200 group-hover:scale-110">
                      <CIcon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mb-1.5 text-lg font-semibold">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.body}</p>
                  </Spotlight>
                </RevealItem>
              );
            })}
          </div>
        </RevealGroup>
      </Container>
    </Section>
  );
}
