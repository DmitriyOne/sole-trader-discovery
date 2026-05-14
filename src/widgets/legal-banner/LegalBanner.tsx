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
      className="border border-rule bg-bg-deep p-4 mb-4 font-serif text-sm text-ink-soft"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rust mb-2">
        {t("headline")}
      </p>
      <p>{t("body")}</p>
    </aside>
  );
}
