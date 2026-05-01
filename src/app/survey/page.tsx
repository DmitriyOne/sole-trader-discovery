import Link from "next/link";
import { TEXT } from "@/shared/config/text";
import { SurveyFlow } from "@/widgets/survey-flow/SurveyFlow";

export default function SurveyPage() {
  return (
    <>
      <header className="border-b border-rule py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft flex justify-between items-center">
        <Link
          href="/"
          className="text-ink-soft hover:text-rust transition-colors"
        >
          ← Discovery № 001
        </Link>
        <span>Survey</span>
      </header>

      <main id="main">
        <div className="py-12">
          <SurveyFlow />
        </div>
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
