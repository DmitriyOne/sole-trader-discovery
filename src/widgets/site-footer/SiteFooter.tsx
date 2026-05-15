import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

type TSiteFooterProps = {
  children: ReactNode;
};

export function SiteFooter({ children }: TSiteFooterProps) {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-bg relative z-10 border-t border-rule py-10 pb-15 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
      <div className="flex justify-between flex-wrap gap-4">
        <span>{t('issue')}</span>
        <span className="flex flex-wrap gap-x-6 gap-y-3">{children}</span>
      </div>
    </footer>
  );
}
