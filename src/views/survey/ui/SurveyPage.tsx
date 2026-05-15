import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PATHS } from "@/shared/config/paths";
import { SurveyFlow } from "@/widgets/survey-flow/SurveyFlow";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LocaleSwitcher } from "@/shared/ui/locale-switcher";

export function SurveyPage() {
  const tFooter = useTranslations("Footer");
  const tSurvey = useTranslations("SurveyPage");
  const tLinks = useTranslations("Footer.links");

  return (
    <>
      <SiteHeader>
        <Link
          href={PATHS.HOME}
          className="text-ink-soft hover:text-rust transition-colors"
        >
          <span className="sm:hidden">←</span>
          <span className="hidden sm:inline">← {tFooter("issue")}</span>
        </Link>
        <span className="flex items-center gap-2 sm:gap-4">
          {tSurvey("headerLabel")}
          <LocaleSwitcher />
        </span>
      </SiteHeader>

      <main id="main">
        <div className="py-8 md:py-12">
          <SurveyFlow />
        </div>
      </main>

      <SiteFooter>
        <FooterLink href={PATHS.PRIVACY}>{tLinks("privacy")}</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
