import Link from "next/link";
import { TEXT } from "@/shared/config/text";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LegalArticle } from "@/widgets/legal-article";

export function TermsPage() {
  return (
    <>
      <SiteHeader>
        <Link
          href="/"
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
        <FooterLink href="/privacy">Privacy</FooterLink>
        <FooterLink href="/cookies">Cookies</FooterLink>
        <FooterLink href="/disclaimer">Disclaimer</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
