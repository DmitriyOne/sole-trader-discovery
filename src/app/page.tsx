import Link from "next/link";
import { TEXT } from "@/shared/config/text";
import { LandingHero } from "@/widgets/landing-hero/LandingHero";
import { LandingDeal } from "@/widgets/landing-deal/LandingDeal";

export default function LandingPage() {
  
  return (
    <>
      <header className="border-b border-rule py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft flex justify-between items-center">
        <span className="flex items-center">
          <span
            aria-hidden="true"
            className="inline-block w-2 h-2 bg-rust rounded-full mr-2 pulse-dot"
          />
          {TEXT.HomePage.strip.status}
        </span>
        <span>{TEXT.HomePage.strip.issue}</span>
      </header>

      <main id="main">
        <LandingHero />
        <LandingDeal />
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
          <Link
            href="/disclaimer"
            className="text-ink-soft border-b border-rule pb-px hover:text-rust transition-colors"
          >
            Disclaimer
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
