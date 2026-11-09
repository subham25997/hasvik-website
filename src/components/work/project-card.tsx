import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, FlaskConical, Loader } from "lucide-react";
import { localizePath, tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project, ProjectStatus } from "@/content/projects";
import { cn } from "@/lib/utils";

const statusStyle: Record<ProjectStatus, { cls: string; Icon: typeof CheckCircle2 }> = {
  completed: { cls: "bg-accent-ink text-white ring-accent-ink/40", Icon: CheckCircle2 },
  "in-progress": { cls: "bg-[#fff1e4] text-[#a14b00] ring-[#ff9533]/40", Icon: Loader },
  demo: { cls: "bg-[#e6f1ff] text-[#004c9a] ring-[#015bb5]/30", Icon: FlaskConical },
};

/** Status uses colour + icon + text (never colour alone). */
export function StatusBadge({ status, label, className }: { status: ProjectStatus; label: string; className?: string }) {
  const { cls, Icon } = statusStyle[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1", cls, className)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

export function ProjectCard({ project, locale, t, priority }: { project: Project; locale: Locale; t: Dictionary; priority?: boolean }) {
  const caseHref = localizePath(`/work/${project.slug}`, locale);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <Image
          src={project.image.src}
          alt={tr(project.image.alt, locale)}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 92vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[rgb(2_6_23/0.85)] via-[rgb(2_6_23/0.15)] to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <StatusBadge status={project.status} label={t.work.status[project.status]} />
        </div>
        <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/25 backdrop-blur">
          {t.work.category[project.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-lg font-semibold">
          <Link href={caseHref} className="group-has-[a:focus-visible]:underline hover:text-link focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{tr(project.description, locale)}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-link hover:underline"
          >
            {t.work.visitLive}
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">
              {project.name} {t.a11y.external}
            </span>
          </a>
          <Link href={caseHref} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-heading hover:underline">
            {t.work.caseStudy}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            <span className="sr-only">: {project.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
