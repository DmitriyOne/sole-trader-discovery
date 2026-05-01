"use client";

import Link from "next/link";
import { useEffect } from "react";
import { TEXT } from "@/shared/config/text";
import { SectionLabel } from "@/shared/ui/SectionLabel";

type TErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: TErrorBoundaryProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative left-1/2 -ml-[50vw] w-screen min-h-screen flex flex-col">
      <header className="border-b border-rule">
        <div className="max-w-[720px] mx-auto px-6 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft flex justify-between items-center">
          <Link
            href="/"
            className="text-ink-soft hover:text-rust transition-colors"
          >
            ← Back to home
          </Link>
          <span>500</span>
        </div>
      </header>

      <main
        id="main"
        className="flex-1 flex items-center justify-center px-6 py-16"
      >
        <article className="max-w-[640px] w-full">
          <SectionLabel>{TEXT.ErrorPage.label}</SectionLabel>

          <h1 className="font-serif font-medium text-[clamp(32px,5vw,44px)] leading-[1.1] tracking-[-0.02em] mb-6 text-ink">
            {TEXT.ErrorPage.headline}
          </h1>

          <p className="font-serif text-[19px] leading-[1.6] text-ink-soft mb-8">
            {TEXT.ErrorPage.body}
          </p>

          {error.digest ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft mb-12 inline-block px-3 py-2 bg-paper border border-rule">
              {TEXT.ErrorPage.digestLabel}{" "}
              <span className="text-rust">{error.digest}</span>
            </p>
          ) : null}

          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center bg-ink text-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            >
              {TEXT.ErrorPage.ctaPrimary}
              <span
                aria-hidden="true"
                className="ml-2 text-[18px] leading-none"
              >
                ↻
              </span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-rule px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium text-ink-soft hover:text-rust hover:border-rust transition-colors duration-200"
            >
              {TEXT.ErrorPage.ctaSecondary} →
            </Link>
          </div>

          <p className="mt-10 font-serif text-[15px] text-ink-soft leading-[1.55]">
            {TEXT.ErrorPage.contactPrompt}
            <a
              href={`mailto:${TEXT.Footer.contact}`}
              className="text-rust-deep underline underline-offset-2 hover:text-rust"
            >
              {TEXT.Footer.contact}
            </a>
            .
          </p>
        </article>
      </main>

      <footer className="border-t border-rule">
        <div className="max-w-[720px] mx-auto px-6 py-10 pb-15 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft flex justify-between flex-wrap gap-4">
          <span>{TEXT.Footer.issue}</span>
        </div>
      </footer>
    </div>
  );
}
