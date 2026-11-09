import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { projects } from "@/content/projects";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/work/project-card";

export async function WorkSection() {
  const { locale, t } = await getDictionary();
  return (
    <Section tone="surface" aria-labelledby="work-title">
      <Container>
        <SectionHeader
          id="work-title"
          eyebrow={t.work.eyebrow}
          title={t.work.title}
          highlight={t.work.highlight}
          subtitle={t.work.subtitle}
        />
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.slug}>
              <ProjectCard project={p} locale={locale} t={t} />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-12 flex justify-center">
          <Link href={localizePath("/work", locale)} className={buttonVariants({ variant: "navy" })}>
            {t.work.viewAll}
            <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
