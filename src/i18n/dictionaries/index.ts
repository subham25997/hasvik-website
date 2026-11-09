import type { Locale } from "../config";
import { en } from "./en";
import { hi } from "./hi";

export type { Dictionary } from "./en";

const dictionaries = { en, hi } as const;

/** Dictionary for an explicit locale (safe in metadata, OG images, server actions). */
export function dictionaryFor(locale: Locale) {
  return dictionaries[locale];
}

/** Replace "{key}" placeholders. */
export function fmt(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? `{${k}}`));
}
