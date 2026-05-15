import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { routing, type TLocale } from "@/i18n/routing";

// Fallback 404 for paths the i18n middleware excludes (files with dots,
// e.g. /kk.xt). Real routes under /[locale]/ get the locale-aware 404 via
// [locale]/[...rest]/page.tsx. Locale here is detected from the NEXT_LOCALE
// cookie when present, falling back to routing.defaultLocale.
async function detectLocale(): Promise<TLocale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  if (cookieLocale && (routing.locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as TLocale;
  }

  // Fall back to Accept-Language if no cookie. Match on the first segment
  // (e.g. "ru-RU" -> "ru"). No fancy negotiation — this is a 404, not a hot path.
  const reqHeaders = await headers();
  const accept = reqHeaders.get("accept-language") ?? "";
  for (const lang of accept.split(",")) {
    const code = lang.split(";")[0]?.trim().split("-")[0]?.toLowerCase();
    if (code && (routing.locales as readonly string[]).includes(code)) {
      return code as TLocale;
    }
  }

  return routing.defaultLocale;
}

function localeHref(locale: TLocale, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${path}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await detectLocale();
  const t = await getTranslations({ locale, namespace: "NotFoundPage.meta" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default async function RootNotFound() {
  const locale = await detectLocale();
  const t = await getTranslations({ locale, namespace: "NotFoundPage" });

  return (
    <main className="container max-w-[720px] mx-auto px-6 py-20 font-serif">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-rust-deep mb-4">
        {t("label")}
      </p>
      <h1 className="text-[clamp(28px,5vw,40px)] font-medium leading-[1.15] tracking-[-0.01em] mb-4 text-ink">
        {t("headline")}
      </h1>
      <p className="text-[17px] leading-[1.6] text-ink-soft mb-8">
        {t("body")}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={localeHref(locale, "/")}
          className="inline-flex items-center justify-center bg-ink text-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        >
          {t("ctaPrimary")}
        </Link>
        <Link
          href={localeHref(locale, "/survey")}
          className="inline-flex items-center justify-center border border-rule px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium text-ink-soft hover:text-rust hover:border-rust transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        >
          {t("ctaSecondary")}
        </Link>
      </div>
    </main>
  );
}
