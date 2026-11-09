import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail + BreadcrumbList JSON-LD. Last item is the current page. */
export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <>
      <nav aria-label={label} className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/75">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-white">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="rounded hover:text-white hover:underline">
                      {c.name}
                    </Link>
                    <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items.map((c) => ({ name: c.name, url: absoluteUrl(c.href) })))} />
    </>
  );
}
