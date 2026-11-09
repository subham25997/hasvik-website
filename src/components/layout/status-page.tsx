import type { ReactNode } from "react";
import { Container } from "@/components/ui/section";

/** Branded full-height status screen (404 / error). */
export function StatusPage({ code, title, body, children }: { code: string; title: string; body: string; children: ReactNode }) {
  return (
    <section className="on-dark bg-hero relative isolate flex min-h-[80dvh] items-center overflow-hidden pt-36 pb-20 text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute top-10 -left-32 -z-10 size-[28rem] animate-aurora rounded-full bg-accent/25 blur-[110px]"
      />
      <Container className="flex flex-col items-center gap-5 text-center">
        <p className="text-highlight text-7xl font-extrabold tracking-tight sm:text-8xl">{code}</p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="max-w-md text-white/80">{body}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">{children}</div>
      </Container>
    </section>
  );
}
