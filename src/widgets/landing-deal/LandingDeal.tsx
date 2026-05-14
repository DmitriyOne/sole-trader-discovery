
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PATHS } from "@/shared/config/paths";
import { SectionLabel } from "@/shared/ui/SectionLabel";

export function LandingDeal() {
  const t = useTranslations("HomePage.deal");
  const tYouGive = useTranslations("HomePage.deal.youGive");
  const tYouGet = useTranslations("HomePage.deal.youGet");
  const tFooter = useTranslations("Footer");

  return (
    <section className="py-16 border-b border-rule">
      <SectionLabel>{t("label")}</SectionLabel>

      <h2 className="font-serif font-medium text-[32px] leading-[1.15] tracking-[-0.01em] mb-7 text-ink">
        {t("headline")}
      </h2>

      <p className="text-ink-soft mb-4.5 font-serif text-[18px] leading-[1.55]">
        {t("intro")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 my-10 border border-rule bg-paper">
        <div className="p-8 sm:border-r border-b sm:border-b-0 border-rule">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft mb-3">
            {tYouGive("label")}
          </div>
          <div className="font-serif text-[19px] leading-[1.4] text-ink font-medium">
            {tYouGive("part1")}
            <br />
            {tYouGive("part2")}{" "}
            <em className="italic text-rust-deep">
              {tYouGive("emphasis")}
            </em>{" "}
            {tYouGive("part3")}
          </div>
        </div>
        <div className="p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft mb-3">
            {tYouGet("label")}
          </div>
          <div className="font-serif text-[19px] leading-[1.4] text-ink font-medium">
            {tYouGet("part1")}
            <br />
            {tYouGet("part2")}{" "}
            <em className="italic text-rust-deep">
              {tYouGet("emphasis")}
            </em>{" "}
            {tYouGet("part3")}
          </div>
        </div>
      </div>

      <p className="text-ink-soft mb-10 font-serif text-[18px] leading-[1.55]">
        {t("closing")}
      </p>

      <Link
        href={PATHS.SURVEY}
        className="inline-flex items-center justify-center bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] font-medium hover:bg-rust-deep transition-colors duration-200"
      >
        {t("cta")}
      </Link>

      {/* Email fallback for those who'd rather write freely */}
      <p className="mt-6 font-serif text-[15px] text-ink-soft leading-[1.55]">
        {t("emailFallback.before")}{" "}
        <a
          href={`mailto:${tFooter("contact")}?subject=Discovery%20%E2%80%94%20my%20take`}
          className="text-rust-deep underline underline-offset-2 hover:text-rust"
        >
          {t("emailFallback.linkLabel")}
        </a>
        {t("emailFallback.after")}
      </p>
    </section>
  );
}
