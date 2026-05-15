import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Sole Trader Discovery",
  robots: { index: false, follow: false },
};

// Fallback 404 for paths the i18n middleware excludes (files with dots,
// e.g. /kk.xt). Real routes under /[locale]/ get the locale-aware
// not-found via [locale]/[...rest]/page.tsx. English only — locale
// is unknowable here.
export default function RootNotFound() {
  return (
    <main className="container max-w-[720px] mx-auto px-6 py-20 font-serif">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-rust-deep mb-4">
        404 · Not found
      </p>
      <h1 className="text-[clamp(28px,5vw,40px)] font-medium leading-[1.15] tracking-[-0.01em] mb-4 text-ink">
        This page doesn’t exist.
      </h1>
      <p className="text-[17px] leading-[1.6] text-ink-soft mb-8">
        Maybe you mistyped the URL. Maybe the page was deleted. Either way,
        sorry for the dead end.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-ink text-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
      >
        Back to home
      </Link>
    </main>
  );
}
