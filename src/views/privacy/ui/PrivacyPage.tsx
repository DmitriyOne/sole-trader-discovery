import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PATHS } from "@/shared/config/paths";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LegalArticle } from "@/widgets/legal-article";
import { LegalBanner } from "@/widgets/legal-banner";
import { LocaleSwitcher } from "@/shared/ui/locale-switcher";

export async function PrivacyPage() {
  // Always EN content for legal pages — UK law applies regardless of viewer locale
  const t = await getTranslations({ locale: "en", namespace: "PrivacyPage" });
  // Header/footer labels follow user's locale (chrome stays localised)
  const tFooter = await getTranslations("Footer");
  const tLinks = await getTranslations("Footer.links");
  const sections = t.raw("sections") as { heading: string; body: string }[];

  return (
    <>
      <SiteHeader>
        <Link
          href={PATHS.HOME}
          className="text-ink-soft hover:text-rust transition-colors"
        >
          {tFooter("backLink")}
        </Link>
        <span className="flex items-center gap-4">
          <span>{tLinks("privacy")}</span>
          <LocaleSwitcher />
        </span>
      </SiteHeader>

      <main id="main">
        <LegalBanner />
        <LegalArticle
          label={t("label")}
          headline={t("headline")}
          lastUpdated={t("lastUpdated")}
          sections={sections}
          ctaLabel={tFooter("backToSurvey")}
        />
      </main>

      <SiteFooter>
        <FooterLink href={PATHS.TERMS}>{tLinks("terms")}</FooterLink>
        <FooterLink href={PATHS.COOKIES}>{tLinks("cookies")}</FooterLink>
        <FooterLink href={PATHS.DISCLAIMER}>{tLinks("disclaimer")}</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
