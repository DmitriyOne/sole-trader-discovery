import { useTranslations } from "next-intl";
import { PATHS } from "@/shared/config/paths";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/shared/ui/SectionLabel";

export function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  const tFooter = useTranslations("Footer");

  return (
    <div className="relative left-1/2 -ml-[50vw] w-screen min-h-screen flex flex-col">
      <header className="border-b border-rule">
        <div className="max-w-[720px] mx-auto px-6 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft flex justify-between items-center">
          <Link
            href={PATHS.HOME}
            className="text-ink-soft hover:text-rust transition-colors"
          >
            {t('backLink')}
          </Link>
          <span>404</span>
        </div>
      </header>

      <main
        id="main"
        className="flex-1 flex items-center justify-center px-6 py-16"
      >
        <article className="max-w-[640px] w-full">
          <SectionLabel>{t('label')}</SectionLabel>

          <h1 className="font-serif font-medium text-[clamp(32px,5vw,44px)] leading-[1.1] tracking-[-0.02em] mb-6 text-ink">
            {t('headline')}
          </h1>

          <p className="font-serif text-[19px] leading-[1.6] text-ink-soft mb-12">
            {t('body')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={PATHS.HOME}
              className="inline-flex items-center justify-center bg-ink text-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            >
              {t('ctaPrimary')} →
            </Link>
            <Link
              href={PATHS.SURVEY}
              className="inline-flex items-center justify-center border border-rule px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium text-ink-soft hover:text-rust hover:border-rust transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            >
              {t('ctaSecondary')} ↗
            </Link>
          </div>
        </article>
      </main>

      <footer className="border-t border-rule">
        <div className="max-w-[720px] mx-auto px-6 py-10 pb-15 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft flex justify-between flex-wrap gap-4">
          <span>{tFooter('issue')}</span>
          <a
            href={`mailto:${tFooter('contact')}`}
            className="text-ink-soft border-b border-rule pb-px hover:text-rust transition-colors"
          >
            {tFooter('contact')}
          </a>
        </div>
      </footer>
    </div>
  );
}
