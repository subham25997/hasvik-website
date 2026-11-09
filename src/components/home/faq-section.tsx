import { getDictionary } from "@/i18n/server";
import { tr } from "@/i18n/config";
import { faqs } from "@/content/faqs";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo";

export async function FaqSection() {
  const { locale, t } = await getDictionary();
  const items = faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }));
  return (
    <Section aria-labelledby="faq-title">
      <Container className="max-w-4xl">
        <SectionHeader id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} highlight={t.faq.highlight} subtitle={t.faq.subtitle} />
        <FaqAccordion items={items} />
      </Container>
      <JsonLd data={faqSchema(items)} />
    </Section>
  );
}
