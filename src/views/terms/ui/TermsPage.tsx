import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PATHS } from "@/shared/config/paths";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LegalArticle } from "@/widgets/legal-article";

export async function TermsPage() {
  // Always EN content for legal pages — UK law applies regardless of viewer locale
  const t = await getTranslations({ locale: "en", namespace: "TermsPage" });
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
        <span>Terms</span>
      </SiteHeader>

      <main id="main">
        <LegalArticle
          label={t("label")}
          headline={t("headline")}
          lastUpdated={t("lastUpdated")}
          sections={sections}
        />
      </main>

      <SiteFooter>
        <FooterLink href={PATHS.PRIVACY}>Privacy</FooterLink>
        <FooterLink href={PATHS.COOKIES}>Cookies</FooterLink>
        <FooterLink href={PATHS.DISCLAIMER}>Disclaimer</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
