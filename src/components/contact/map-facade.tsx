"use client";

import { useState } from "react";
import { MapPin, MousePointerClick } from "lucide-react";

/** Google Map behind a click-to-load facade: no third-party requests until the visitor asks. */
export function MapFacade({
  src,
  title,
  loadLabel,
  notice,
  address,
}: {
  src: string;
  title: string;
  loadLabel: string;
  notice: string;
  address: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 border border-border bg-surface-2 shadow-soft sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-80">
      {loaded ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="on-dark group bg-hero absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-white"
        >
          <span aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
          {/* stylised map lines */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 300"
            className="absolute inset-0 size-full text-white/15"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path d="M0 210 C 80 190, 140 240, 220 200 S 360 150, 400 170" stroke="currentColor" strokeWidth="10" />
            <path d="M120 0 C 140 80, 100 160, 160 300" stroke="currentColor" strokeWidth="6" />
            <path d="M0 90 L 400 120" stroke="currentColor" strokeWidth="4" />
            <path d="M300 0 L 260 300" stroke="currentColor" strokeWidth="4" />
          </svg>
          <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-accent-ink text-white shadow-lg ring-8 ring-accent/25 transition-transform group-hover:scale-110">
            <MapPin className="size-7" aria-hidden="true" />
          </span>
          <span className="relative max-w-xs text-sm text-white/85">{address}</span>
          <span className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/25 group-hover:bg-white/25">
            <MousePointerClick className="size-4" aria-hidden="true" />
            {loadLabel}
          </span>
          <span className="relative text-xs text-white/65">{notice}</span>
        </button>
      )}
    </div>
  );
}
