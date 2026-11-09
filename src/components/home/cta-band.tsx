import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { whatsappLink } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { WhatsappGlyph } from "@/components/layout/whatsapp-fab";

export async function CtaBand() {
  const { locale, t } = await getDictionary();
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <Container>
        <Reveal className="on-dark bg-hero relative isolate overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white shadow-lift sm:px-12 sm:py-16">
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-70" />
          <div aria-hidden="true" className="absolute -top-24 -left-20 -z-10 size-80 animate-aurora rounded-full bg-accent/30 blur-3xl" />
          <div
            aria-hidden="true"
            className="absolute -right-16 -bottom-24 -z-10 size-80 animate-aurora rounded-full bg-[#2fa3ff]/30 blur-3xl [animation-delay:-8s]"
          />
          <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85 sm:text-lg">{t.cta.body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`${localizePath("/contact", locale)}#quote`} className={buttonVariants({ size: "lg" })}>
              {t.cta.primary}
              <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "glass", size: "lg" })}>
              <WhatsappGlyph className="size-5" />
              {t.cta.secondary}
              <span className="sr-only">{t.a11y.external}</span>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
