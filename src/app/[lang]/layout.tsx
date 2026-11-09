import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { hasLocale, htmlLang, locales } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { Providers, themeScript } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { revealScript } from "@/components/motion/reveal-script";

const poppins = Poppins({
  subsets: ["latin"],
  // 3 weights keep font transfer small (font-medium -> 400/600, font-extrabold -> 700).
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  // "optional" + preload: no late font swap, so no layout shift and no LCP re-paint.
  // If the font misses the ~100ms window on a slow first visit, the size-adjusted
  // fallback is used for that page view and Poppins is served from cache afterwards.
  display: "optional",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "700"],
  variable: "--font-devanagari",
  display: "optional", // falls back to the system Devanagari font rather than reflowing
  preload: false, // only needed on Hindi pages; avoids preloading on English ones
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#004C9A" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1C3E" },
  ],
  colorScheme: "light dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaryFor(lang);
  return {
    metadataBase: new URL(siteUrl),
    ...pageMetadata({ locale: lang, path: "/" }),
    title: { default: t.meta.defaultTitle, template: `%s | ${site.name}` },
    applicationName: site.name,
    authors: [{ name: site.name, url: siteUrl }],
    creator: site.name,
    formatDetection: { telephone: true, email: true, address: true },
    appleWebApp: { title: site.shortName, capable: true, statusBarStyle: "black-translucent" },
    category: "technology",
  };
}

export default function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  return (
    <Suspense fallback={null}>
      <RootLayoutContent params={params}>{children}</RootLayoutContent>
    </Suspense>
  );
}

async function RootLayoutContent({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = dictionaryFor(lang);

  return (
    <html
      lang={htmlLang[lang]}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${devanagari.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-dvh overflow-x-clip bg-background">
        {/* next/script (not a raw <script>) avoids React 19's "script tag while rendering" warning. */}
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#main"
          className="fixed top-4 left-4 z-[100] -translate-y-24 rounded-full bg-accent-ink px-5 py-3 font-semibold text-white transition-transform focus:translate-y-0"
        >
          {t.a11y.skip}
        </a>
        <Providers>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <WhatsappFab label={t.a11y.whatsapp} />
          <RevealObserver />
        </Providers>
        <Script id="reveal-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: revealScript }} />
        {/* Vercel Analytics scripts only exist on Vercel deployments. */}
        {process.env.VERCEL ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
