"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    __hasvikReveal?: () => void;
  }
}

/** Pill tabs. Panels are passed in pre-rendered (Server Components) so only the switcher is client JS. */
export function PillTabs({
  label,
  tabs,
  defaultValue,
  className,
}: {
  label: string;
  tabs: { value: string; label: string; content: ReactNode }[];
  defaultValue?: string;
  className?: string;
}) {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue ?? tabs[0]?.value}
      className={className}
      onValueChange={() => {
        // Radix mounts the newly active panel after this event; rescan it for
        // scroll reveals on the next frame so its cards are not left hidden.
        window.requestAnimationFrame(() => window.__hasvikReveal?.());
      }}
    >
      <TabsPrimitive.List
        aria-label={label}
        className="mx-auto mb-10 flex w-fit max-w-full gap-1 rounded-full border border-border bg-card p-1.5 shadow-soft"
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "min-h-11 rounded-full px-5 text-sm font-semibold text-muted-foreground transition-all duration-200 sm:px-7 sm:text-base",
              "hover:text-heading data-[state=active]:bg-brand-900 data-[state=active]:text-white data-[state=active]:shadow-soft dark:data-[state=active]:bg-accent-ink dark:data-[state=active]:text-white",
            )}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map((tab) => (
        <TabsPrimitive.Content key={tab.value} value={tab.value} className="outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
