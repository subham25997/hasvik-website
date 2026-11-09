# HASVIK Technologies: Website

The bilingual (English + हिन्दी) marketing site for **HASVIK Technologies**, an Udyam-registered MSME in Maniar, Ballia that offers tech and non-tech services.

Built with **Next.js 16** (App Router, Cache Components), **React 19**, **TypeScript (strict)**, **Tailwind CSS v4**, Radix UI primitives, Motion, Resend and Vercel Analytics.

> Design decisions, deviations from the brief and owner TODOs: [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md)
> History of changes: [`docs/CHANGELOG.md`](docs/CHANGELOG.md)

---

## 1. Quick start

Requirements: **Node.js ≥ 20.9** and npm.

```bash
npm install
cp .env.example .env.local      # then fill in values (see §2)
npm run dev                     # http://localhost:3000  (Hindi: /hi)
```

| Script                        | What it does                                               |
| ----------------------------- | ---------------------------------------------------------- |
| `npm run dev`                 | Local dev server (Turbopack)                               |
| `npm run build` / `npm start` | Production build / serve it                                |
| `npm run lint`                | ESLint                                                     |
| `npm run typecheck`           | Generate route types, then `tsc --noEmit`                  |
| `npm run format`              | Prettier (with Tailwind class sorting)                     |
| `npm run images`              | Convert `public/images/**/*.{png,jpg}` to optimized WebP   |
| `npm run icons`               | Regenerate the favicon set and the tech/social logo module |

A Husky pre-commit hook runs ESLint and Prettier on staged files (`lint-staged`).

## 2. Environment variables

| Name                        | Required   | Purpose                                                             |
| --------------------------- | ---------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | yes        | Canonical origin, e.g. `https://hasviktech.com` (no trailing slash) |
| `NEXT_PUBLIC_LEADS_CRM_URL` | yes        | Public URL opened by the “Explore Leads CRM” button                 |
| `RESEND_API_KEY`            | production | Sends quote-form emails via [Resend](https://resend.com)            |
| `CONTACT_TO_EMAIL`          | no         | Inbox that receives quote requests (default `sales@hasviktech.com`) |
| `CONTACT_FROM_EMAIL`        | no         | Sender. Must be on a domain verified in Resend                      |
| `CRM_API_URL`               | production | Server-only base URL for the CRM API                                |
| `CRM_API_EMAIL`             | production | Server-only CRM service account used for demo and quote requests    |
| `CRM_API_PASSWORD`          | production | Server-only CRM service account password                            |

Without `RESEND_API_KEY`, development logs submissions to the terminal. **Production shows an error** so a missing key is noticed straight away.
The “Explore Leads CRM” button uses `NEXT_PUBLIC_LEADS_CRM_URL`, which is inlined into the client bundle at build time. The Book Demo and Get a Quote forms use `CRM_API_URL` and the CRM credentials only in server actions to submit leads. Quote requests continue to send an email through Resend as well. Configure these values in `.env.local` for development and in the deployment environment for production; never expose the CRM credentials with a `NEXT_PUBLIC_` prefix.

## 3. Editing content (no coding knowledge needed)

All text, images and data live in **`src/content/`** and **`src/i18n/dictionaries/`**. Components never contain copy.

| I want to…                                                         | Edit                                                            |
| ------------------------------------------------------------------ | --------------------------------------------------------------- |
| Change phone, emails, address, hours, socials, **stats**           | `src/content/site.ts`                                           |
| Add / edit a **service** (tech or non-tech)                        | `src/content/services.ts`. Set `published: true` to show it.    |
| Add a **portfolio project / case study**                           | `src/content/projects.ts` (put screenshots in `public/images/`) |
| Change the project in the "Website Successfully Delivered!" banner | `featuredProjectSlug` in `projects.ts`                          |
| Team members / mentors                                             | `src/content/team.ts` (photos in `public/images/team/`)         |
| Testimonials                                                       | `src/content/testimonials.ts`                                   |
| FAQs                                                               | `src/content/faqs.ts`                                           |
| City landing pages (local SEO)                                     | `src/content/locations.ts`                                      |
| Privacy policy / terms                                             | `src/content/legal.ts`                                          |
| Buttons, headings, labels (EN and HI)                              | `src/i18n/dictionaries/en.ts` and `hi.ts`                       |

**Translations:** text fields look like `{ en: "…", hi: "…" }`. A plain string is shown in both languages. TypeScript reports an error if `hi.ts` is missing a key that `en.ts` has.

**Images:** drop a PNG/JPG into `public/images/`, run `npm run images`, then reference the `.webp` file with its width and height (the script prints them).

**Finding open items:** search the code for `TODO(owner)`.

## 4. Project structure

```
src/
  app/
    [lang]/               every page (en = no prefix, hi = /hi), layout, 404/500, OG images
    actions/contact.ts    quote-form Server Action (validation, honeypot, time-trap, rate limit, Resend)
    sitemap.ts robots.ts manifest.ts favicon.ico icon.svg apple-icon.png
    globals.css           design tokens (light + dark), utilities, reveal animations
  components/             ui/ layout/ home/ services/ work/ team/ contact/ motion/ seo/
  content/                typed site content (edit here)
  i18n/                   locale config, dictionaries, server helpers
  lib/                    seo (metadata + JSON-LD), og image renderer, contact schema, utils
  proxy.ts                locale routing: /about → en, /hi/about → hi, /en/* → 308 to unprefixed
scripts/                  image, icon and logo generators
docs/                     PROJECT_CONTEXT.md (decisions, TODOs), CHANGELOG.md
```

## 5. Deploying to Vercel

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In Vercel: **Add New → Project → Import** the repo. The framework preset is detected automatically.
3. Add the environment variables from §2 under **Settings → Environment Variables** (Production + Preview).
4. Deploy.
5. **Domains:** add `hasviktech.com` as the primary domain and `www.hasviktech.com` as a redirect to it. (`next.config.ts` also redirects `www` → apex.)
6. In **Resend**, verify `hasviktech.com` (DNS records) and set `CONTACT_FROM_EMAIL` to an address on it.
7. Enable **Analytics** and **Speed Insights** in the Vercel project. The scripts load only on Vercel.
8. In **Google Search Console**, add the property and submit `https://hasviktech.com/sitemap.xml`.
9. Run **PageSpeed Insights** on the live URL to confirm Core Web Vitals.

## 6. Quality checklist (how it was verified)

- `npm run lint`, `npm run typecheck` and `next build` pass (102 statically prerendered pages).
- Every page checked in headless Edge at 1440 px and 375 px: no console errors or hydration warnings, no horizontal overflow.
- Quote form tested end to end: error summary + inline errors, focus management, the Server Action, and success and failure paths.
- Lighthouse (mobile, applied throttling): Accessibility 99–100, Best Practices 100, SEO 100, CLS 0, LCP 1.3–1.8 s. Performance: work 100, case studies / city / contact 98–99, home 92, services 87, Hindi home 82. Not every page meets the brief's 95 target yet; see `docs/PROJECT_CONTEXT.md` §6 for the open items and how to re-measure on the live site.
