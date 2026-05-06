import Link from "next/link";
import { PATHS } from "@/shared/config/paths";
import { TEXT } from "@/shared/config/text";
import { SectionLabel } from "@/shared/ui/SectionLabel";

export function LandingDeal() {
  return (
    <section className="py-16 border-b border-rule">
      <SectionLabel>{TEXT.HomePage.deal.label}</SectionLabel>

      <h2 className="font-serif font-medium text-[32px] leading-[1.15] tracking-[-0.01em] mb-7 text-ink">
        {TEXT.HomePage.deal.headline}
      </h2>

      <p className="text-ink-soft mb-4.5 font-serif text-[18px] leading-[1.55]">
        {TEXT.HomePage.deal.intro}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 my-10 border border-rule bg-paper">
        <div className="p-8 sm:border-r border-b sm:border-b-0 border-rule">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft mb-3">
            {TEXT.HomePage.deal.youGive.label}
          </div>
          <div className="font-serif text-[19px] leading-[1.4] text-ink font-medium">
            {TEXT.HomePage.deal.youGive.part1}
            <br />
            {TEXT.HomePage.deal.youGive.part2}{" "}
            <em className="italic text-rust-deep">
              {TEXT.HomePage.deal.youGive.emphasis}
            </em>{" "}
            {TEXT.HomePage.deal.youGive.part3}
          </div>
        </div>
        <div className="p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft mb-3">
            {TEXT.HomePage.deal.youGet.label}
          </div>
          <div className="font-serif text-[19px] leading-[1.4] text-ink font-medium">
            {TEXT.HomePage.deal.youGet.part1}
            <br />
            {TEXT.HomePage.deal.youGet.part2}{" "}
            <em className="italic text-rust-deep">
              {TEXT.HomePage.deal.youGet.emphasis}
            </em>{" "}
            {TEXT.HomePage.deal.youGet.part3}
          </div>
        </div>
      </div>

      <p className="text-ink-soft mb-10 font-serif text-[18px] leading-[1.55]">
        {TEXT.HomePage.deal.closing}
      </p>

      <Link
        href={PATHS.SURVEY}
        className="inline-flex items-center justify-center bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-200"
      >
        {TEXT.HomePage.deal.cta}
      </Link>

      {/* Email fallback for those who'd rather write freely */}
      <p className="mt-6 font-serif text-[15px] text-ink-soft leading-[1.55]">
        Forms not your thing? Just{" "}
        <a
          href={`mailto:${TEXT.Footer.contact}?subject=Discovery%20%E2%80%94%20my%20take`}
          className="text-rust-deep underline underline-offset-2 hover:text-rust"
        >
          email me directly
        </a>
        . Same person reads both.
      </p>
    </section>
  );
}
