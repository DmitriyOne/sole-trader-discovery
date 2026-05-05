import Link from "next/link";
import { SurveyFlow } from "@/widgets/survey-flow/SurveyFlow";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";

export function SurveyPage() {
  return (
    <>
      <SiteHeader>
        <Link
          href="/"
          className="text-ink-soft hover:text-rust transition-colors"
        >
          ← Discovery № 001
        </Link>
        <span>Survey</span>
      </SiteHeader>

      <main id="main">
        <div className="py-12">
          <SurveyFlow />
        </div>
      </main>

      <SiteFooter>
        <FooterLink href="/privacy">Privacy</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
