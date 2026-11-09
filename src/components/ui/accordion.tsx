"use client";

import { Accordion as A } from "radix-ui";
import { Plus } from "lucide-react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <A.Root type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3">
      {items.map((it, i) => (
        <A.Item
          key={it.q}
          value={`item-${i}`}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-colors data-[state=open]:border-accent/40"
        >
          <A.Header asChild>
            <h3>
              <A.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-heading sm:px-6">
                {it.q}
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-heading transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-accent-ink group-data-[state=open]:text-white">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </A.Trigger>
            </h3>
          </A.Header>
          <A.Content className="overflow-hidden text-muted-foreground data-[state=closed]:animate-[accordion-up_200ms_ease-out] data-[state=open]:animate-[accordion-down_250ms_ease-out]">
            <p className="px-5 pb-5 leading-relaxed sm:px-6">{it.a}</p>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
