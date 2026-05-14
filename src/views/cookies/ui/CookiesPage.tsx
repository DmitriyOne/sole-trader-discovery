import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PATHS } from "@/shared/config/paths";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LegalArticle } from "@/widgets/legal-article";
import { LegalBanner } from "@/widgets/legal-banner";
import { LocaleSwitcher } from "@/shared/ui/locale-switcher";

export async function CookiesPage() {
  // Always EN content for legal pages — UK law applies regardless of viewer locale
  const t = await getTranslations({ locale: "en", namespace: "CookiesPage" });
  const sections = t.raw("sections") as { heading: string; body: string }[];

  return (
    <>
      <SiteHeader>
        <Link
          href={PATHS.HOME}
          className="text-ink-soft hover:text-rust transition-colors"
        >
          {t("backLink")}
        </Link>
        <span className="flex items-center gap-4">
          <span>Cookies</span>
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
        />
      </main>

      <SiteFooter>
        <FooterLink href={PATHS.PRIVACY}>Privacy</FooterLink>
        <FooterLink href={PATHS.TERMS}>Terms</FooterLink>
        <FooterLink href={PATHS.DISCLAIMER}>Disclaimer</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
