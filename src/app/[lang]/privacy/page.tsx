import type { Metadata } from "next";
import { getDictionary } from "@/i18n/server";
import { hasLocale } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { privacy } from "@/content/legal";
import { LegalPage } from "@/components/layout/legal-page";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata({ locale: lang, path: "/privacy", title: dictionaryFor(lang).legal.privacyTitle });
}

export default async function PrivacyPage() {
  const { t } = await getDictionary();
  return <LegalPage doc={privacy} title={t.legal.privacyTitle} path="/privacy" />;
}
