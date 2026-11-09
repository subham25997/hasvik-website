"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const FILTER_EVENT = "work-filters-change";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(FILTER_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(FILTER_EVENT, onChange);
  };
}

type Item = { slug: string; status: string; category: string; node: ReactNode };
type Group = { label: string; all: string; options: { value: string; label: string }[] };

/**
 * Filter chips over pre-rendered project cards. Filter state is kept in the URL
 * (?status=&category=) so filtered views are shareable.
 */
export function WorkFilters({
  items,
  status,
  category,
  strings,
}: {
  items: Item[];
  status: Group;
  category: Group;
  strings: { empty: string; reset: string; results: string };
}) {
  // The URL query is the single source of truth (server snapshot = unfiltered).
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  const sel = useMemo(() => {
    const q = new URLSearchParams(search);
    return { s: q.get("status") ?? "", c: q.get("category") ?? "" };
  }, [search]);

  const update = (next: { s: string; c: string }) => {
    const q = new URLSearchParams();
    if (next.s) q.set("status", next.s);
    if (next.c) q.set("category", next.c);
    const qs = q.toString();
    window.history.replaceState(window.history.state, "", qs ? `?${qs}` : window.location.pathname);
    window.dispatchEvent(new Event(FILTER_EVENT));
  };

  const visible = useMemo(() => items.filter((i) => (!sel.s || i.status === sel.s) && (!sel.c || i.category === sel.c)), [items, sel]);

  const chip = (active: boolean) =>
    cn(
      "min-h-11 rounded-full border px-4 text-sm font-semibold transition-all duration-200",
      active
        ? "border-brand-900 bg-brand-900 text-white shadow-soft dark:border-accent-ink dark:bg-accent-ink dark:text-white"
        : "border-border bg-card text-muted-foreground hover:border-brand-600/40 hover:text-heading",
    );

  const renderGroup = (g: Group, key: "s" | "c") => (
    <div role="group" aria-label={g.label} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{g.label}</span>
      {[{ value: "", label: g.all }, ...g.options].map((o) => (
        <button
          key={o.value || "all"}
          type="button"
          aria-pressed={sel[key] === o.value}
          onClick={() => update({ ...sel, [key]: o.value })}
          className={chip(sel[key] === o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-xl2 border border-border bg-card p-5 shadow-soft lg:flex-row lg:items-center lg:justify-between">
        {renderGroup(status, "s")}
        {renderGroup(category, "c")}
      </div>
      <p role="status" className="mb-6 text-sm text-muted-foreground">
        {strings.results.replace("{n}", String(visible.length))}
      </p>
      {visible.length ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((i) => (
            <li key={i.slug}>{i.node}</li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl2 border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">{strings.empty}</p>
          <button type="button" onClick={() => update({ s: "", c: "" })} className={chip(false)}>
            {strings.reset}
          </button>
        </div>
      )}
    </div>
  );
}
