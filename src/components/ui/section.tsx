import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Section({
  className,
  tone = "plain",
  children,
  ...props
}: ComponentProps<"section"> & { tone?: "plain" | "soft" | "surface" | "dark" }) {
  return (
    <section
      className={cn(
        "relative py-20 sm:py-24 lg:py-28",
        tone === "soft" && "bg-soft",
        tone === "surface" && "bg-surface",
        tone === "dark" && "on-dark bg-band text-white",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, className, onDark }: { children: ReactNode; className?: string; onDark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase",
        onDark ? "bg-white/10 text-[#9be47f] ring-1 ring-white/15" : "bg-eyebrow text-eyebrow-foreground ring-1 ring-accent/25",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

/** Heading with the signature green highlighted words. */
export function HighlightTitle({
  as: Tag = "h2",
  start,
  highlight,
  end,
  className,
  id,
}: {
  as?: "h1" | "h2" | "h3";
  start: string;
  highlight: string;
  end?: string;
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("font-bold tracking-tight", className)}>
      {start} <span className="text-highlight">{highlight}</span>
      {end ? ` ${end}` : null}
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  titleEnd,
  subtitle,
  align = "center",
  onDark,
  id,
  as = "h2",
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  titleEnd?: string;
  subtitle?: string;
  align?: "center" | "left";
  onDark?: boolean;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex max-w-3xl flex-col gap-4 sm:mb-16",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
      )}
    >
      <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      <HighlightTitle
        as={as}
        id={id}
        start={title}
        highlight={highlight}
        end={titleEnd}
        className={cn(
          as === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
          onDark && "text-white",
        )}
      />
      <span aria-hidden="true" className="h-1 w-14 rounded-full bg-gradient-to-r from-accent to-accent-teal" />
      {subtitle ? <p className={cn("text-base sm:text-lg", onDark ? "text-white/80" : "text-muted-foreground")}>{subtitle}</p> : null}
    </Reveal>
  );
}
