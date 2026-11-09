import { getDictionary } from "@/i18n/server";
import { backendStack, frontendStack, type Tech } from "@/content/tech";
import { techIcons } from "@/content/tech-icons.generated";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { cn } from "@/lib/utils";

function TechChip({ tech, hidden }: { tech: Tech; hidden?: boolean }) {
  const icon = techIcons[tech.key];
  // Black logos (Next.js, OpenJDK) switch to white in dark mode.
  const mono = icon.hex === "#000000";
  return (
    <li
      aria-hidden={hidden || undefined}
      title={tech.note}
      className={cn(
        "flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 shadow-soft",
        hidden && "motion-reduce:hidden",
      )}
    >
      <svg viewBox="0 0 24 24" className={cn("size-7", mono && "dark:fill-white")} fill={icon.hex} aria-hidden="true">
        <path d={icon.path} />
      </svg>
      <span className="font-semibold whitespace-nowrap text-heading">{tech.name}</span>
    </li>
  );
}

function Marquee({ items, label, reverse }: { items: Tech[]; label: string; reverse?: boolean }) {
  return (
    <div className="group relative">
      <h3 className="mb-4 text-center text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">{label}</h3>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        {/* The list is duplicated for a seamless loop; the copy is hidden from assistive tech. */}
        <ul
          className={cn(
            "flex w-max gap-4 py-2 [--marquee-duration:36s] [--marquee-gap:1rem] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
          )}
        >
          {items.map((t) => (
            <TechChip key={t.key} tech={t} />
          ))}
          {items.map((t) => (
            <TechChip key={`${t.key}-dup`} tech={t} hidden />
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function TechSection() {
  const { t } = await getDictionary();
  return (
    <Section aria-labelledby="tech-title">
      <Container>
        <SectionHeader
          id="tech-title"
          eyebrow={t.tech.eyebrow}
          title={t.tech.title}
          highlight={t.tech.highlight}
          subtitle={t.tech.subtitle}
        />
        <div className="flex flex-col gap-10">
          <Marquee items={frontendStack} label={t.tech.frontend} />
          <Marquee items={backendStack} label={t.tech.backend} reverse />
        </div>
      </Container>
    </Section>
  );
}
