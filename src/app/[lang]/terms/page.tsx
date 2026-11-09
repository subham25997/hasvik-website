import type { Metadata } from "next";
import { getDictionary } from "@/i18n/server";
import { hasLocale } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { terms } from "@/content/legal";
import { LegalPage } from "@/components/layout/legal-page";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata({ locale: lang, path: "/terms", title: dictionaryFor(lang).legal.termsTitle });
}

export default async function TermsPage() {
  const { t } = await getDictionary();
  return <LegalPage doc={terms} title={t.legal.termsTitle} path="/terms" />;
}
