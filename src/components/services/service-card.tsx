import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { localizePath, tr, type Locale } from "@/i18n/config";
import type { Service } from "@/content/services";
import { Icon } from "@/components/icon";
import { Spotlight } from "@/components/motion/spotlight";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  locale,
  learnMore,
  featured = false,
  className,
}: {
  service: Service;
  locale: Locale;
  learnMore: string;
  featured?: boolean;
  className?: string;
}) {
  const href = localizePath(`/services/${service.slug}`, locale);
  const title = tr(service.title, locale);

  return (
    <Spotlight
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift",
        featured && "md:flex-row",
        className,
      )}
    >
      <div className={cn("relative aspect-[16/10] overflow-hidden", featured && "md:aspect-auto md:w-[46%]")}>
        <Image
          src={service.image.src}
          alt={tr(service.image.alt, locale)}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-600 text-white shadow-soft transition-transform duration-200 group-hover:scale-110 group-hover:rotate-[-4deg]">
          <Icon name={service.icon} className="size-6" />
        </span>
        <h3 className="mb-2 text-lg leading-snug font-semibold sm:text-xl">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {title}
          </Link>
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">{tr(service.short, locale)}</p>
        <ul className="mb-6 flex flex-col gap-2 text-sm">
          {service.features.map((f) => (
            <li key={tr(f, "en")} className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-eyebrow text-eyebrow-foreground">
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="text-foreground/90">{tr(f, locale)}</span>
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-link">
          {learnMore}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
      {/* Focus ring for the stretched link */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card ring-ring group-has-[a:focus-visible]:ring-[3px]"
      />
    </Spotlight>
  );
}
