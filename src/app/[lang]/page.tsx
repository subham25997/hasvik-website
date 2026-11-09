import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { hasLocale, localizePath } from "@/i18n/config";
import { localBusinessSchema, organizationSchema, pageMetadata, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { Hero } from "@/components/home/hero";
import { AboutSection } from "@/components/home/about-section";
import { WhySection } from "@/components/home/why-section";
import { TechSection } from "@/components/home/tech-section";
import { WorkSection } from "@/components/home/work-section";
import { TeamSection } from "@/components/home/team-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { ContactSection } from "@/components/contact/contact-section";
import { ServicesGrid } from "@/components/services/services-grid";
import { ProcessStrip } from "@/components/services/process-strip";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata({ locale: lang, path: "/" });
}

export default async function HomePage() {
  const { locale, t } = await getDictionary();

  return (
    <>
      <JsonLd data={[organizationSchema(), localBusinessSchema(locale), websiteSchema(locale)]} />
      <Hero />
      <AboutSection />

      <Section tone="surface" id="services" aria-labelledby="services-title">
        <Container>
          <SectionHeader
            id="services-title"
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            highlight={t.services.highlight}
            subtitle={t.services.subtitle}
          />
          <ServicesGrid locale={locale} t={t} />
          <div className="mt-10 flex justify-center">
            <Link href={localizePath("/services", locale)} className={buttonVariants({ variant: "outline" })}>
              {t.services.viewAll}
              <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-24">
            <ProcessStrip locale={locale} t={t} />
          </div>
        </Container>
      </Section>

      <WhySection />
      <TechSection />
      <WorkSection />
      <TeamSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
