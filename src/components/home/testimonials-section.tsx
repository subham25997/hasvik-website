import { Star } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { TestimonialCarousel } from "./testimonial-carousel";

export async function TestimonialsSection() {
  const { locale, t } = await getDictionary();
  return (
    <Section tone="soft" aria-labelledby="testimonials-title">
      <Container>
        <SectionHeader
          id="testimonials-title"
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          highlight={t.testimonials.highlight}
          subtitle={t.testimonials.subtitle}
        />
        <Reveal className="-mt-6 mb-10 flex justify-center">
          <a
            href={site.mapsListingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-soft transition-shadow hover:shadow-lift"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7Z" />
              <path
                fill="#34A853"
                d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z"
              />
              <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
              <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9Z" />
            </svg>
            <span className="flex items-center gap-1 font-bold text-heading">
              {site.rating.value}
              <Star className="size-4 fill-[#f5b301] text-[#f5b301]" aria-hidden="true" />
            </span>
            <span className="text-sm text-muted-foreground">{t.testimonials.googleRating}</span>
            <span className="sr-only">{t.a11y.external}</span>
          </a>
        </Reveal>
        <TestimonialCarousel
          items={testimonials.map((it) => ({
            id: it.id,
            name: it.name,
            company: it.company,
            location: it.location,
            rating: it.rating,
            quote: it.quote,
            projectHref: it.projectSlug ? localizePath(`/work/${it.projectSlug}`, locale) : undefined,
          }))}
          strings={{
            previous: t.a11y.previous,
            next: t.a11y.next,
            pause: t.a11y.pause,
            play: t.a11y.play,
            goToSlide: t.a11y.goToSlide,
            rating: t.a11y.rating,
            viewProject: t.testimonials.viewProject,
          }}
        />
      </Container>
    </Section>
  );
}
