import { getDictionary } from "@/i18n/server";
import { localizePath, tr } from "@/i18n/config";
import type { LegalDoc } from "@/content/legal";
import { Container, Section } from "@/components/ui/section";
import { PageHero, splitTitle } from "./page-hero";

export async function LegalPage({ doc, title, path }: { doc: LegalDoc; title: string; path: string }) {
  const { locale, t } = await getDictionary();
  const L = (p: string) => localizePath(p, locale);
  const { start, highlight } = splitTitle(title);
  const updated = new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-IN", { dateStyle: "long" }).format(new Date(doc.updatedISO));
  return (
    <>
      <PageHero
        eyebrow={`${t.legal.updated}: ${updated}`}
        title={start}
        highlight={highlight}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { name: t.common.home, href: L("/") },
          { name: title, href: L(path) },
        ]}
      />
      <Section>
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-10">
            {doc.sections.map((s, i) => (
              <section key={i} aria-labelledby={`legal-${i}`}>
                <h2 id={`legal-${i}`} className="mb-3 text-xl font-bold">
                  {i + 1}. {tr(s.heading, locale)}
                </h2>
                <p className="leading-relaxed text-muted-foreground">{tr(s.body, locale)}</p>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
