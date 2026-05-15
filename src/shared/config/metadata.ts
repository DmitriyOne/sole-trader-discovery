import { env } from "./env";
import { routing } from "@/i18n/routing";

// Shared metadataBase for all page-level generateMetadata exports.
// Next.js merges layout + page metadata, but leaf-page metadata must
// include metadataBase explicitly to guarantee og/twitter image resolution.
// env.NEXT_PUBLIC_SITE_URL is validated at boot — no fallback needed.
export const SITE_METADATA_BASE = new URL(env.NEXT_PUBLIC_SITE_URL);

const SITE = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

/** Maps locale codes to BCP-47 / Open Graph locale tags. */
export const LOCALE_OG_TAG: Record<string, string> = {
  en: "en_GB",
  ru: "ru_RU",
  uk: "uk_UA",
};

/**
 * Returns `alternates.canonical` and `alternates.languages` for a given
 * locale + path combination.
 *
 * @param locale  - current locale (e.g. "en", "ru", "uk")
 * @param path    - path without locale prefix, must start with "/" or be ""
 *                  e.g. "" for home, "/survey", "/privacy"
 */
export function buildAlternates(
  locale: string,
  path: string,
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const localePrefix = (l: string) =>
    l === routing.defaultLocale ? "" : `/${l}`;

  const canonical = `${SITE}${localePrefix(locale)}${path}`;

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE}${localePrefix(l)}${path}`]),
  );

  return { canonical, languages };
}

/**
 * Returns the og:locale and og:locale:alternate values for a given locale.
 */
export function buildOgLocale(locale: string): {
  locale: string;
  alternateLocale: string[];
} {
  return {
    locale: LOCALE_OG_TAG[locale] ?? locale,
    alternateLocale: routing.locales
      .filter((l) => l !== locale)
      .map((l) => LOCALE_OG_TAG[l] ?? l),
  };
}
