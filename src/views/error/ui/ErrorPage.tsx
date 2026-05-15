"use client";

import { Link } from "@/i18n/navigation";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { PATHS } from "@/shared/config/paths";
import { SectionLabel } from "@/shared/ui/SectionLabel";

type TErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function ErrorPage({ error, reset }: TErrorPageProps) {
  const t = useTranslations("ErrorPage");
  const tFooter = useTranslations("Footer");

  useEffect(() => {
    console.error(error);
  }, [error]);

  // error.tsx is a Client Component — Next does not let it export `metadata`.
  // Set the document title manually so the browser tab/screen reader reflects
  // the error state instead of inheriting the underlying route's title.
  useEffect(() => {
    document.title = t('meta.title');
  }, [t]);

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
          <span>500</span>
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

          <p className="font-serif text-[19px] leading-[1.6] text-ink-soft mb-8">
            {t('body')}
          </p>

          {error.digest ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft mb-12 inline-block px-3 py-2 bg-paper border border-rule">
              {t('digestLabel')}{" "}
              <span className="text-rust">{error.digest}</span>
            </p>
          ) : null}

          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center bg-ink text-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            >
              {t('ctaPrimary')}
              <span
                aria-hidden="true"
                className="ml-2 text-[18px] leading-none"
              >
                ↻
              </span>
            </button>
            <Link
              href={PATHS.HOME}
              className="inline-flex items-center justify-center border border-rule px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium text-ink-soft hover:text-rust hover:border-rust transition-colors duration-200"
            >
              {t('ctaSecondary')} →
            </Link>
          </div>

          <p className="mt-10 font-serif text-[15px] text-ink-soft leading-[1.55]">
            {t('contactPrompt')}
            <a
              href={`mailto:${tFooter('contact')}`}
              className="text-rust-deep underline underline-offset-2 hover:text-rust"
            >
              {tFooter('contact')}
            </a>
            .
          </p>
        </article>
      </main>

      <footer className="border-t border-rule">
        <div className="max-w-[720px] mx-auto px-6 py-10 pb-15 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft flex justify-between flex-wrap gap-4">
          <span>{tFooter('issue')}</span>
        </div>
      </footer>
    </div>
  );
}
