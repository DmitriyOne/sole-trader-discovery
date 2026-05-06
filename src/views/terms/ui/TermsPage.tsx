import Link from "next/link";
import { PATHS } from "@/shared/config/paths";
import { TEXT } from "@/shared/config/text";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LegalArticle } from "@/widgets/legal-article";

export function TermsPage() {
  return (
    <>
      <SiteHeader>
        <Link
          href={PATHS.HOME}
          className="text-ink-soft hover:text-rust transition-colors"
        >
          {TEXT.TermsPage.backLink}
        </Link>
        <span>Terms</span>
      </SiteHeader>

      <main id="main">
        <LegalArticle
          label={TEXT.TermsPage.label}
          headline={TEXT.TermsPage.headline}
          lastUpdated={TEXT.TermsPage.lastUpdated}
          sections={TEXT.TermsPage.sections}
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
