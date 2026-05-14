import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";

export function LegalBanner() {
  const locale = useLocale();
  const t = useTranslations("LegalBanner");

  // Banner is meaningless on EN — content is already in English
  if (locale === routing.defaultLocale) return null;

  return (
    <aside
      role="note"
      className="border-l-2 border-rust pl-4 mt-8 mb-0 font-serif italic text-sm leading-relaxed text-ink-soft"
    >
      <p>{t("body")}</p>
    </aside>
  );
}
