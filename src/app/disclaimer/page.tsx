import type { Metadata } from "next";
import Link from "next/link";
import { TEXT } from "@/shared/config/text";
import { SectionLabel } from "@/shared/ui/SectionLabel";

export const metadata: Metadata = {
  title: TEXT.DisclaimerPage.meta.title,
  description: TEXT.DisclaimerPage.meta.description,
  robots: { index: true, follow: true },
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function DisclaimerPage() {
  return (
    <>
      <header className="border-b border-rule py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft flex justify-between items-center">
        <Link
          href="/"
          className="text-ink-soft hover:text-rust transition-colors"
        >
          {TEXT.DisclaimerPage.backLink}
        </Link>
        <span>Disclaimer</span>
      </header>

      <main id="main">
        <article className="py-16 max-w-[640px]">
          <SectionLabel>{TEXT.DisclaimerPage.label}</SectionLabel>

          <h1 className="font-serif font-medium text-[clamp(32px,5vw,44px)] leading-[1.1] tracking-[-0.02em] mb-4 text-ink">
            {TEXT.DisclaimerPage.headline}
          </h1>

          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft mb-12">
            {TEXT.DisclaimerPage.lastUpdated}
          </p>

          <div className="space-y-10">
            {TEXT.DisclaimerPage.sections.map((section) => {
              const id = slugify(section.heading);
              return (
                <section key={section.heading}>
                  <h2
                    id={id}
                    className="font-serif font-medium text-[22px] leading-[1.3] mb-3 text-ink scroll-mt-24"
                  >
                    {section.heading}
                  </h2>
                  <p className="font-serif text-[17px] leading-[1.6] text-ink-soft">
                    {section.body}
                  </p>
                </section>
              );
            })}
          </div>

          <div className="mt-16 pt-8 border-t border-rule">
            <Link
              href="/survey"
              className="inline-flex items-center justify-center bg-ink text-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
            >
              Back to the survey →
            </Link>
          </div>
        </article>
      </main>

      <footer className="py-10 pb-15 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft flex justify-between flex-wrap gap-4">
        <span>{TEXT.Footer.issue}</span>
        <span className="flex flex-wrap gap-x-6 gap-y-3">
          <Link
            href="/privacy"
            className="text-ink-soft border-b border-rule pb-px hover:text-rust transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-ink-soft border-b border-rule pb-px hover:text-rust transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/cookies"
            className="text-ink-soft border-b border-rule pb-px hover:text-rust transition-colors"
          >
            Cookies
          </Link>
          <a
            href={`mailto:${TEXT.Footer.contact}`}
            className="text-ink-soft border-b border-rule pb-px hover:text-rust transition-colors"
          >
            {TEXT.Footer.contact}
          </a>
        </span>
      </footer>
    </>
  );
}
