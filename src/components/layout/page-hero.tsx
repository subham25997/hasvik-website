import type { ReactNode } from "react";
import { Container, Eyebrow, HighlightTitle } from "@/components/ui/section";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Dark hero band used at the top of every inner page (H1 + breadcrumbs). */
export function PageHero({
  eyebrow,
  title,
  highlight,
  titleEnd,
  intro,
  crumbs,
  crumbLabel,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  titleEnd?: string;
  intro?: string;
  crumbs: Crumb[];
  crumbLabel: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="on-dark bg-hero relative isolate overflow-hidden pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-40 size-[30rem] animate-aurora rounded-full bg-[#71c554]/20 blur-[110px]" />
        <div className="absolute top-0 -right-32 size-[28rem] animate-aurora rounded-full bg-[#2fa3ff]/25 blur-[110px] [animation-delay:-8s]" />
        <div className="bg-grid absolute inset-0" />
      </div>
      <Container className={aside ? "grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]" : undefined}>
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} label={crumbLabel} />
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <HighlightTitle
            as="h1"
            start={title}
            highlight={highlight}
            end={titleEnd}
            className="mt-5 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          />
          {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{intro}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        {aside}
      </Container>
    </section>
  );
}

/** Split a translated title so its last word(s) get the green highlight. */
export function splitTitle(text: string, highlightWords = 1) {
  const words = text.trim().split(/\s+/);
  if (words.length <= highlightWords) return { start: "", highlight: text };
  return { start: words.slice(0, -highlightWords).join(" "), highlight: words.slice(-highlightWords).join(" ") };
}
