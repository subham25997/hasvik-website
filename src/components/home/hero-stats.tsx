import { Counter } from "@/components/motion/counter";

export type HeroStat = { value: number; suffix?: string; label: string };

/**
 * Four-cell proof strip separated by hairlines. Stays a server component: the only
 * client piece is <Counter>, which counts up once in view and renders the final
 * number straight away for SSR and for reduced motion.
 */
export function HeroStats({ stats }: { stats: HeroStat[] }) {
  return (
    <dl className="grid grid-cols-2 border-t border-l border-hero-line lg:grid-cols-4">
      {stats.map((s) => (
        // dt (term) comes first in the DOM for valid markup; flex-col-reverse shows the number on top.
        <div key={s.label} className="flex flex-col-reverse justify-end gap-2 border-r border-b border-hero-line px-5 py-6 sm:px-7 sm:py-8">
          <dt className="font-mono text-[0.7rem] tracking-[0.12em] text-hero-muted uppercase sm:text-xs">{s.label}</dt>
          <dd className="font-display text-4xl leading-none font-semibold tracking-tight text-hero-fg tabular-nums sm:text-5xl">
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
