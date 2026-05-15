import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PATHS } from "@/shared/config/paths";

export function LandingHero() {
  const t = useTranslations("HomePage.hero");
  const tLede = useTranslations("HomePage.hero.lede");
  const tNote = useTranslations("HomePage.hero.note");

  return (
    <section className="relative pt-10 md:pt-15 pb-15 border-b border-rule">
      <div className="font-mono text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.18em] text-rust mb-8 font-medium animate-reveal opacity-0 [animation-delay:0.05s]">
        {t("kicker")}
      </div>

      <h1 className="font-serif font-medium leading-[1.05] tracking-[-0.02em] mb-8 text-ink animate-reveal opacity-0 [animation-delay:0.15s] text-[clamp(40px,7vw,64px)]">
        {t("headlinePart1")}
        <br />
        {t("headlinePart2")}
        <br />
        <em className="italic text-rust-deep font-semibold not-italic-fix">
          {t("headlineEmphasis")}
        </em>
        <br />
        {t("headlinePart3")}
      </h1>

      <p className="text-[21px] leading-[1.55] text-ink-soft max-w-[580px] mb-10 animate-reveal opacity-0 [animation-delay:0.28s] font-serif">
        {tLede("regular1")}
        <strong className="text-ink font-semibold">
          {tLede("strong")}
        </strong>
        {tLede("regular2")}
      </p>

      <div className="bg-paper border-l-[3px] border-rust px-7 py-6 my-10 text-[17px] leading-[1.6] text-ink-soft font-serif animate-reveal opacity-0 [animation-delay:0.42s]">
        {tNote("body")}
        <span className="block mt-4 font-handwritten text-[22px] text-rust-deep">
          {tNote("signature")}
        </span>
        <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft mt-1.5">
          {tNote("meta")}
        </span>
      </div>

      <div className="mt-6 animate-reveal opacity-0 [animation-delay:0.55s]">
        <Link
          href={PATHS.SURVEY}
          className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.14em] text-ink-soft hover:text-rust-deep underline underline-offset-[6px] decoration-ink-soft/40 hover:decoration-rust-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
        >
          {t("skipLink")}
        </Link>
      </div>
    </section>
  );
}
