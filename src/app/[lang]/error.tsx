"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { localizePath } from "@/i18n/config";
import { buttonVariants } from "@/components/ui/button";
import { StatusPage } from "@/components/layout/status-page";

// Kept inline (instead of importing the full dictionaries) to keep this client bundle small.
// Mirror of `common.*` in src/i18n/dictionaries.
const strings = {
  en: { title: "Something went wrong", body: "An unexpected error occurred. Please try again.", retry: "Try again", home: "Back to home" },
  hi: {
    title: "कुछ गड़बड़ हो गई",
    body: "एक अनपेक्षित त्रुटि हुई। कृपया फिर से कोशिश करें।",
    retry: "फिर कोशिश करें",
    home: "होम पर जाएँ",
  },
} as const;

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = usePathname()?.split("/")[1] === "hi" ? "hi" : "en";
  const t = strings[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage code="500" title={t.title} body={t.body}>
      <button type="button" onClick={reset} className={buttonVariants()}>
        <RotateCcw aria-hidden="true" />
        {t.retry}
      </button>
      <Link href={localizePath("/", locale)} className={buttonVariants({ variant: "glass" })}>
        {t.home}
      </Link>
    </StatusPage>
  );
}
