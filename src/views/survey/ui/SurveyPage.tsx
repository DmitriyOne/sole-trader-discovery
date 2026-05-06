import Link from "next/link";
import { PATHS } from "@/shared/config/paths";
import { SurveyFlow } from "@/widgets/survey-flow/SurveyFlow";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";

export function SurveyPage() {
  return (
    <>
      <SiteHeader>
        <Link
          href={PATHS.HOME}
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
        <FooterLink href={PATHS.PRIVACY}>Privacy</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
