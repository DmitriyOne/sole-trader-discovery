import { useTranslations } from "next-intl";

export function FooterEmail() {
  const t = useTranslations("Footer");

  return (
    <a
      href={`mailto:${t('contact')}`}
      className="text-ink-soft border-b border-rule pb-px hover:text-rust transition-colors"
    >
      {t('contact')}
    </a>
  );
}
