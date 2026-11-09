# HASVIK Website: Project Context & Decisions

The working memory of this rebuild: why things are the way they are, and what is
still open. Update it whenever a decision changes.

- **Source brief:** `hasvik-nextjs-rebuild-prompt.md` (rebuild of hasviktech.com).
- **Started:** 14 Oct 2026.

## 1. Stack actually used

| Brief asked for                | Used                                                                                                           | Why                                                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js 15+ App Router         | **Next.js 16.4** (Turbopack, React 19.3)                                                                       | Latest stable from `create-next-app`. Ships with **Cache Components** + Partial Prefetching on.                                                    |
| Tailwind v4                    | Tailwind v4 (`@theme` tokens in `src/app/globals.css`)                                                         |                                                                                                                                                    |
| shadcn/ui (Radix)              | Radix primitives via the unified `radix-ui` package, hand-written shadcn-style wrappers in `src/components/ui` | The shadcn CLI is interactive; same result, fewer files.                                                                                           |
| Framer Motion                  | `motion` (`motion/react`) with `LazyMotion` + `m` + `MotionConfig reducedMotion="user"`                        | Smaller bundle; honours reduced-motion globally.                                                                                                   |
| lucide-react + local tech SVGs | lucide-react; tech/social logos generated from CC0 `simple-icons` into `src/content/tech-icons.generated.ts`   | No hot-linking. Java uses the OpenJDK mark (Oracle's Java logo isn't distributed). LinkedIn glyph is hand-drawn.                                   |
| next-intl (or dictionary)      | **Dictionary** (`src/i18n/dictionaries/{en,hi}.ts`) + `next/root-params`                                       | Native to Next 16; zero client JS for translations.                                                                                                |
| next-themes                    | **Not used**: 1-line inline head script + CSS-only toggle                                                      | next-themes renders a `<script>` inside a client component, which React 19.2+ warns about in the console (the brief requires zero console errors). |
| next-sitemap                   | App Router `sitemap.ts` / `robots.ts`                                                                          | Built-in.                                                                                                                                          |
| Resend                         | Resend in a Server Action                                                                                      |                                                                                                                                                    |
| Toasts                         | `sonner`                                                                                                       | What shadcn uses now.                                                                                                                              |

## 2. Routing & i18n

- `src/app/[lang]/…` holds every page. Locales: `en` (default), `hi`.
- `src/proxy.ts` (Next 16's new name for middleware):
  - `/about` is **rewritten** to `/en/about`, so English URLs stay clean and unprefixed.
  - `/hi/about` is served as is.
  - `/en/about` gets a **308 redirect** to `/about`, so there are no duplicate URLs.
- `hreflang` alternates (`en-IN`, `hi-IN`, `x-default`) come from `pageMetadata()` in `src/lib/seo.ts`.
- Content strings use `Localized = string | { en, hi }` and `tr(value, locale)`.
  Client quotes (testimonials) are intentionally **not** translated.
- Unknown URLs: `app/[lang]/[...rest]/page.tsx` calls `notFound()`, which renders the branded `not-found.tsx`.

## 3. Next 16 / Cache Components rules we follow

- Every dynamic segment exports `generateStaticParams`, so pages prerender statically.
- `new Date()` (footer year) lives inside a `'use cache'` function with `cacheLife("days")`.
- `params` are Promises. Use the `PageProps<'/[lang]/…'>` helpers.
- `next/root-params` (`lang()`) is called only from Server Components (`getDictionary()`).
  Metadata, OG images and actions use `dictionaryFor(locale)` instead.

## 4. Design decisions

- Brand tokens are preserved (navy `#002F6C`/`#004C9A`, leaf green `#71C554`, Poppins).
- **Contrast fixes (WCAG AA):**
  - Small green text uses `--accent-ink: #367C25` (5.3:1 on white). The brief's `#3E8E2A` measures **4.1:1** and fails AA for small text.
  - Green **heading highlights** on light backgrounds use the gradient `#3E8E2A → #2F8F57` (≥3:1 for large text). `#71C554` on white is only 2.1:1, so it fails even for large text. On navy/dark backgrounds the original bright green is used.
  - Green buttons use **navy text** (`#0B1C3E` on `#71C554` = 7.9:1); white text would be 2.1:1.
- Dark mode is opt-in (light stays the default, per the brief), toggled from the navbar and stored in `localStorage.theme`.
- The old office photo is **not used anywhere**. The About visual is a composed device mockup (`brand-visual.tsx`) built from real project screenshots.
- The design-system pass came from the `ui-ux-pro-max` skill: Swiss-minimal structure, 200–250 ms hovers, 40–60 ms staggers, ≥44 px targets, pausable carousels, reduced-motion support.

## 5. Content decisions & owner TODOs

Search the code for `TODO(owner)` to find all of these.

| Item                                                                                 | Where                                        | Status                                                                                               |
| ------------------------------------------------------------------------------------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Non-tech services (back-office, digitization, typing, social media, design/printing) | `src/content/services.ts`                    | Drafted as `published: false`. Hidden until you write copy and publish. Only Data Entry is live.     |
| LinkedIn company URL                                                                 | `src/content/site.ts` → `socials.linkedin`   | Empty, so the icon is hidden.                                                                        |
| Google Business Profile link + review count                                          | `site.ts` → `mapsListingUrl`, `rating.count` | Search-URL placeholder; count set to 3.                                                              |
| Exact office geo-coordinates                                                         | `site.ts` → `address.geo`                    | Approximate (Maniar).                                                                                |
| FAQ answers on pricing / non-tech / domain / payment terms                           | `src/content/faqs.ts` (`needsReview: true`)  | Drafted, need owner review.                                                                          |
| Case-study text                                                                      | `src/content/projects.ts`                    | Drafted from the old site's one-liners. Review them.                                                 |
| RM Suncity sub-page links (`/about`, `/academics`, `/gallery`)                       | `projects.ts` gallery `href`                 | Assumed paths. Verify.                                                                               |
| Stats (7 completed / 4 in progress / 7 clients / 1+ yr)                              | `site.ts` → `stats`                          | Kept as business totals. The portfolio shows only 6 projects, so these numbers intentionally differ. |
| Mentor names                                                                         | `src/content/team.ts`                        | Anonymous, as on the old site.                                                                       |
| SVG logo                                                                             | `public/images/logo.webp`                    | A PNG→WebP of the old logo is used. Replace it when you have an SVG.                                 |
| Project screenshots                                                                  | `public/images/*.webp`                       | Real screenshots from the old site, converted to WebP. Replace them as you add projects.             |

## 6. Performance & accessibility work (and what is still open)

Measured with Lighthouse 13 (mobile, slow-4G + 4× CPU) against `next start` in headless Edge.

| Change                                                                                                                           | Why / effect                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `experimental.inlineCss`                                                                                                         | Removes the render-blocking stylesheet request (≈1 s on throttled mobile). Trade-off: CSS isn't cached separately, which is fine because Tailwind output is small and most visitors are first-time mobile users.                                                                                                                                         |
| Poppins trimmed to 400/600/700, `display: "optional"` + preload; Devanagari `optional` without preload                           | Font transfer fell from 252 KB to 33 KB on English pages. `optional` removed the font-swap layout shift (CLS 0.19 → 0) and the late LCP re-paint. A first visit on a very slow connection may see the size-adjusted fallback font once.                                                                                                                  |
| Scroll reveals moved from 60 Motion `whileInView` wrappers to CSS + one IntersectionObserver (`components/motion/reveal*.ts[x]`) | Less hydration work. An inline bootstrap at the end of `<body>` reveals above-the-fold content before hydration. Hidden-until-revealed only applies when JS runs (`html.js`), and reduced-motion users see everything immediately. Motion is still used for the carousels and rotating text.                                                             |
| Aurora blur blobs hidden and floating badges static below 768 px                                                                 | About 1 s of style/paint work on phones.                                                                                                                                                                                                                                                                                                                 |
| `z.config({ jitless: true })`                                                                                                    | zod v4's `new Function` probe tripped the CSP (Best Practices 96 → 100).                                                                                                                                                                                                                                                                                 |
| next/script for the theme and reveal bootstraps                                                                                  | A raw `<script>` in the root layout made React 19 log "Encountered a script tag while rendering React component" in the dev overlay (it only appears in dev, so production browser checks missed it). Both scripts are now `<Script strategy="beforeInteractive">`; the reveal script waits for `DOMContentLoaded` because it is injected into `<head>`. |
| `prefetch={false}` on footer links to /careers, /locations, /privacy, /terms                                                     | In Next 16.4 the segment prefetch (`//__PAGE__`) for these fully static pages returns 404 behind the locale rewrite in `proxy.ts`. Clicking works; only the prefetch fails. Turning `partialPrefetching` off did not help. Re-test after upgrading Next and remove the workaround if the 404s are gone.                                                  |
| Carousel dot buttons ≥ 24×24 px; visually hidden `h2` on /work and /services                                                     | WCAG 2.2 target size and heading order (Accessibility 100).                                                                                                                                                                                                                                                                                              |

**Best results on a healthy host (applied throttling):** work 100, locations 99, contact 98, home 92, services 87, /hi 82. LCP 1.3–1.8 s, CLS 0, Accessibility/Best Practices/SEO 100.

**Still open, not yet verified:**

- **Total Blocking Time on the homepage** (≈350 ms EN, ≈650 ms HI under 4× CPU). It comes from hydrating the interactive islands (hero mockup, carousels, quote form). The next step is to lazy-hydrate below-the-fold islands, e.g. render the quote form only once it scrolls near the viewport.
- **/services LCP** was 3.9 s while reveals waited for hydration. The inline reveal bootstrap fixes that by design, but the host machine slowed down mid-session (Lighthouse benchmark index fell from ~3,650 to ~2,000), so the fix couldn't be re-measured reliably.
- **Re-measure on the live Vercel URL with PageSpeed Insights.** That's the number that matters for the "95+" goal.

## 7. Deliberate deviations from the brief

- **No `SearchAction` in the WebSite JSON-LD.** The site has no search page, and Google retired the sitelinks search box in Nov 2024, so the markup would be invalid.
- **Email is optional** in the quote form. Phone/WhatsApp is required, because most target clients prefer phone.
- **Rate limiting is in-memory** (per server instance). That's fine against casual spam. Swap in Upstash/Vercel KV for strict global limits.
- **The CSP uses `'unsafe-inline'` for scripts.** A nonce-based CSP would force every page to render dynamically and lose static prerendering. The rest of the header set (HSTS, XFO, nosniff, Referrer-Policy, Permissions-Policy) is strict.
