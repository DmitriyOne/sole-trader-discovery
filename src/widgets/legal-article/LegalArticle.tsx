import Link from "next/link";
import { PATHS } from "@/shared/config/paths";
import { SectionLabel } from "@/shared/ui/SectionLabel";
import { slugify } from "@/shared/lib/slugify";

type TLegalSection = {
  heading: string;
  body: string;
};

type TLegalArticleProps = {
  label: string;
  headline: string;
  lastUpdated: string;
  sections: readonly TLegalSection[];
  ctaLabel: string;
};

export function LegalArticle({
  label,
  headline,
  lastUpdated,
  sections,
  ctaLabel,
}: TLegalArticleProps) {
  return (
    <article className="pt-8 pb-10 md:pb-16 max-w-[640px]">
      <SectionLabel>{label}</SectionLabel>

      <h1 className="font-serif font-medium text-[clamp(32px,5vw,44px)] leading-[1.1] tracking-[-0.02em] mb-4 text-ink">
        {headline}
      </h1>

      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft mb-12">
        {lastUpdated}
      </p>

      <div className="space-y-10">
        {sections.map((section) => {
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
          href={PATHS.SURVEY}
          className="inline-flex items-center justify-center bg-ink text-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
