// src/app/[locale]/layout.tsx
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, JetBrains_Mono, Caveat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  SITE_METADATA_BASE,
  buildOgLocale,
  buildAlternates,
} from "@/shared/config/metadata";
import { SurveyDraftProvider } from "@/features/multi-step-form";
import { routing } from "@/i18n/routing";
import "../globals.css";

// Fraunces' next/font/google TypeScript types omit `cyrillic`, but the actual
// Google Fonts file ships Cyrillic glyphs and works at runtime. ts-expect-error
// documents the type-vs-runtime divergence so RU/UK headlines render in Fraunces
// instead of the system serif fallback.
const fraunces = Fraunces({
  // @ts-expect-error next/font types omit cyrillic for Fraunces; runtime supports it
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const caveat = Caveat({
  // Caveat is used only for the handwritten signature in en locale;
  // no Cyrillic usage is planned, so latin-only is intentional.
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "GlobalMeta" });

  const { locale: ogLocale, alternateLocale } = buildOgLocale(locale);
  // Use the root path ("") to derive the locale-specific home URL for og:url.
  // Per-page og:url is handled by each page's generateMetadata if needed.
  const { canonical: localeRootUrl } = buildAlternates(locale, "");
  // opengraph-image.tsx lives in [locale]/ so its route is /<locale>/opengraph-image.
  // For the default locale (en, no prefix on site) we still use /en/opengraph-image
  // because that's where Next.js serves the file — the middleware excludes it from i18n
  // redirect. We use a relative URL so metadataBase resolves it correctly.
  const ogImagePath = `/${locale}/opengraph-image`;

  return {
    metadataBase: SITE_METADATA_BASE,
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: localeRootUrl,
      locale: ogLocale,
      alternateLocale,
      images: [{ url: ogImagePath, width: 1200, height: 630, alt: "What actually slows down UK sole traders." }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImagePath],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type TRootLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: TRootLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const tCommon = await getTranslations("Common");

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em]"
        >
          {tCommon("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <SurveyDraftProvider>
            <div className="container max-w-[720px] mx-auto px-6 relative z-10">
              {children}
            </div>
          </SurveyDraftProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
