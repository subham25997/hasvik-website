import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./config";
import { dictionaryFor } from "./dictionaries";

/** Current locale from the root `[lang]` segment (Server Components only). */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary() {
  const locale = await getLocale();
  return { locale, t: dictionaryFor(locale) };
}
