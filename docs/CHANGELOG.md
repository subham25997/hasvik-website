# Changelog

All notable changes to the HASVIK website rebuild. Newest first.

## Step 8: Docs & handover (2026-10-14)

- README covering setup, scripts, environment variables, a content-editing guide, structure, Vercel deploy steps and the verification summary. `.env.example` added.
- `docs/PROJECT_CONTEXT.md` §6: performance work, measured results and open items.

## Step 7: Accessibility, performance & tooling pass (2026-10-14)

- Lighthouse-driven fixes: inlined CSS; trimmed fonts (252 KB → 33 KB) with `display: optional` (CLS 0.19 → 0); CSS + IntersectionObserver scroll reveals with an inline pre-hydration bootstrap instead of 60 Motion observers; aurora blobs and float animations desktop-only; zod `jitless` to satisfy the CSP; 24 px carousel dot targets; heading-order fixes on /work and /services.
- ESLint (React Compiler rules) clean: work filters now read the URL via `useSyncExternalStore`; the form uses `useWatch`; components hoisted out of render.
- Prettier (+ Tailwind class sorting), lint-staged, Husky pre-commit hook, plus npm scripts `typecheck`, `format`, `images` and `icons`.
- Dark mode reviewed section by section.

## Step 6: Contact form (2026-10-14)

- End-to-end browser test of validation, the error summary (focused when 2+ fields fail), single-field focus, the Server Action, the success state + toast, and the error toast when Resend isn't configured in production.
- Spam protection: honeypot, time-trap and per-IP rate limit. HTML-escaped email body.

## Step 5: SEO layer (2026-10-14)

- `sitemap.xml` (every route × EN/HI with hreflang alternates), `robots.txt`, `manifest.webmanifest`.
- Brand favicon set (`scripts/generate-icons.mjs`): favicon.ico, icon.svg, apple-icon, PWA icons.
- Dynamic OG/Twitter cards via `next/og` in Poppins (Latin + Devanagari) for home, every service, case study and city page.
- JSON-LD: Organization, LocalBusiness/ProfessionalService (geo, hours, areaServed, rating), WebSite, FAQPage, BreadcrumbList, Service, CreativeWork (+ Review), and a city-level ProfessionalService.

## Step 4: Inner pages (2026-10-14)

- /about, /services, /services/[slug] (7 published), /work (URL-synced filters), /work/[slug] (6 case studies), /team, /careers, /contact, /locations, /locations/[city] (13 cities), /privacy, /terms. Every page in EN and HI with breadcrumbs.

## Step 3: Homepage (2026-10-14)

- Every homepage section, in brief order: Hero (aurora + grid background, rotating service phrases, 3D browser mockup cycling real screenshots, floating glass badges, trust strip) → About (brand device visual, timeline, value cards) → Featured delivery (data-driven, browser-chrome carousel with pause/prev/next and a hover-scroll preview) → Services (Tech / Non-Tech tabs, bento grid, "How We Work" 5-step strip) → Why Choose Us (animated counters from `site.ts`) → Tech stack (two opposite marquees, pause on hover, static under reduced motion) → Portfolio (status badges use icon + text + colour) → Team + anonymous mentors → Testimonials (scroll-snap swipe, autoplay with pause, Google rating badge) → FAQ (Radix accordion + FAQPage JSON-LD) → Contact (channels, quote form, click-to-load map).
- Branded 404 (`not-found.tsx` + catch-all route) and 500 (`error.tsx`) pages.
- Verified in headless Edge: no hydration warnings and no horizontal overflow at 1440 px.
- Fixes found during review: the rotating phrase no longer blanks between items; the bottom hero badge no longer collides with the slide dots; Vercel Analytics renders only on Vercel (it 404'd locally).

## Step 2: Content layer (2026-10-14)

- Typed content in `src/content/`: `site.ts`, `services.ts`, `projects.ts`, `team.ts`, `testimonials.ts`, `faqs.ts`, `locations.ts` (13 cities, unique copy each), `tech.ts`.
- Rewrote the "Website Maintenance & Support" copy (the old site reused the data-entry text).
- Non-tech services: Data Entry is live; five more are drafted as unpublished `TODO(owner)` entries.
- English + Hindi UI dictionaries (`src/i18n/dictionaries`), with Hinglish search terms in readable copy.
- 23 images downloaded from hasviktech.com and converted to WebP (`scripts/optimize-images.mjs`). `office.jpeg` excluded, as required.
- Tech and social logos generated locally from simple-icons (`scripts/generate-tech-icons.mjs`).

## Step 1: Scaffold & foundations (2026-10-14)

- `create-next-app` (Next 16.4, React 19.3, TS strict, Tailwind v4, ESLint, Turbopack).
- Design tokens (brand primitives + light/dark semantic tokens) in `globals.css`.
- Poppins + Noto Sans Devanagari via `next/font`. Inline theme script (light default).
- `proxy.ts` locale routing (EN unprefixed, `/hi` Hindi, `/en/*` → 308).
- Security headers (CSP, HSTS, XFO, nosniff, Referrer-Policy, Permissions-Policy) and a www → apex redirect in `next.config.ts`.
- Glass navbar (shrinks on scroll, active-route indicator, Radix-dialog mobile sheet, EN/हिं + theme toggles), footer (quick links, services, contact, areas served, cached year), floating WhatsApp button, skip link.
