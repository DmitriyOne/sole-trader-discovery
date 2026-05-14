import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PATHS } from "@/shared/config/paths";
import { SurveyFlow } from "@/widgets/survey-flow/SurveyFlow";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";

export function SurveyPage() {
  const tFooter = useTranslations("Footer");
  const tPrivacy = useTranslations("PrivacyPage");

  return (
    <>
      <SiteHeader>
        <Link
          href={PATHS.HOME}
          className="text-ink-soft hover:text-rust transition-colors"
        >
          ← {tFooter("issue")}
        </Link>
        <span>Survey</span>
      </SiteHeader>

      <main id="main">
        <div className="py-8 md:py-12">
          <SurveyFlow />
        </div>
      </main>

      <SiteFooter>
        <FooterLink href={PATHS.PRIVACY}>{tPrivacy("label")}</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
