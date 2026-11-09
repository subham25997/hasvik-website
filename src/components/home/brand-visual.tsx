import Image from "next/image";
import { Database, MapPin, ShieldCheck, Star } from "lucide-react";

/**
 * Brand composition used instead of the old office photo:
 * laptop + phone frames with real project screenshots, connected service chips.
 * Purely decorative apart from the caption.
 */
export function BrandVisual({
  caption,
  laptop,
  phone,
}: {
  caption: string;
  laptop: { src: string; alt: string };
  phone: { src: string; alt: string };
}) {
  return (
    <figure className="relative">
      <div className="on-dark bg-hero relative overflow-hidden rounded-[2rem] p-6 shadow-lift sm:p-10">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
        <div aria-hidden="true" className="absolute -top-20 -right-20 size-72 rounded-full bg-accent/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-24 -left-10 size-72 rounded-full bg-[#2fa3ff]/30 blur-3xl" />

        {/* connection lines */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 300"
          className="absolute inset-0 size-full text-white/25"
          fill="none"
          preserveAspectRatio="none"
        >
          <path d="M40 60 C 140 20, 220 120, 330 70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d="M60 250 C 160 210, 250 280, 360 220" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
        </svg>

        <div className="relative mx-auto aspect-[4/3] max-w-md">
          {/* Laptop */}
          <div className="absolute inset-x-0 top-[6%] mx-auto w-[86%]">
            <div className="rounded-t-xl border-[6px] border-b-0 border-[#0b1c3e] bg-[#0b1c3e] shadow-2xl">
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-[4px] bg-white">
                <Image src={laptop.src} alt={laptop.alt} fill sizes="(min-width: 1024px) 380px, 70vw" className="object-cover object-top" />
              </div>
            </div>
            <div className="mx-auto h-3 w-[112%] -translate-x-[5.5%] rounded-b-xl bg-gradient-to-b from-slate-300 to-slate-400 shadow-lg" />
          </div>

          {/* Phone */}
          <div className="absolute right-[-2%] bottom-[2%] w-[30%] rotate-[4deg] rounded-[1.4rem] border-[5px] border-[#0b1c3e] bg-[#0b1c3e] shadow-2xl">
            <div className="relative aspect-[9/18] overflow-hidden rounded-[1rem] bg-white">
              <Image src={phone.src} alt={phone.alt} fill sizes="140px" className="object-cover object-top" />
            </div>
          </div>

          {/* Floating service chips */}
          <div
            aria-hidden="true"
            className="glass absolute top-[0%] left-[-4%] flex animate-float items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white"
          >
            <MapPin className="size-4 text-accent" /> Google Maps
          </div>
          <div
            aria-hidden="true"
            className="glass absolute bottom-[8%] left-[-2%] flex animate-float items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white [animation-delay:-2s]"
          >
            <Database className="size-4 text-accent" /> Data Entry
          </div>
          <div
            aria-hidden="true"
            className="glass absolute top-[-4%] right-[2%] flex animate-float items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white [animation-delay:-4s]"
          >
            <Star className="size-4 fill-accent text-accent" /> 4.5
          </div>
          <div
            aria-hidden="true"
            className="absolute bottom-[38%] left-[30%] inline-flex size-10 items-center justify-center rounded-full bg-accent-ink text-white shadow-lg ring-4 ring-white/20"
          >
            <ShieldCheck className="size-5" />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
