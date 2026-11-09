import { getDictionary } from "@/i18n/server";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Mentors, TeamGrid } from "@/components/team/team-grid";

export async function TeamSection() {
  const { locale, t } = await getDictionary();
  return (
    <Section aria-labelledby="team-title">
      <Container>
        <SectionHeader
          id="team-title"
          eyebrow={t.team.eyebrow}
          title={t.team.title}
          highlight={t.team.highlight}
          subtitle={t.team.subtitle}
        />
        <TeamGrid locale={locale} />
        <Mentors locale={locale} t={t} />
      </Container>
    </Section>
  );
}
