import Link from "next/link";
import { Home } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { buttonVariants } from "@/components/ui/button";
import { StatusPage } from "@/components/layout/status-page";

export default async function NotFound() {
  const { locale, t } = await getDictionary();
  return (
    <StatusPage code="404" title={t.common.notFoundTitle} body={t.common.notFoundBody}>
      <Link href={localizePath("/", locale)} className={buttonVariants()}>
        <Home aria-hidden="true" />
        {t.common.backHome}
      </Link>
      <Link href={localizePath("/contact", locale)} className={buttonVariants({ variant: "glass" })}>
        {t.nav.contact}
      </Link>
    </StatusPage>
  );
}
