import Link from "next/link";
import { PATHS } from "@/shared/config/paths";
import { TEXT } from "@/shared/config/text";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LegalArticle } from "@/widgets/legal-article";

export function CookiesPage() {
  return (
    <>
      <SiteHeader>
        <Link
          href={PATHS.HOME}
          className="text-ink-soft hover:text-rust transition-colors"
        >
          {TEXT.CookiesPage.backLink}
        </Link>
        <span>Cookies</span>
      </SiteHeader>

      <main id="main">
        <LegalArticle
          label={TEXT.CookiesPage.label}
          headline={TEXT.CookiesPage.headline}
          lastUpdated={TEXT.CookiesPage.lastUpdated}
          sections={TEXT.CookiesPage.sections}
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
