import Link from "next/link";
import { TEXT } from "@/shared/config/text";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LegalArticle } from "@/widgets/legal-article";

export function DisclaimerPage() {
  return (
    <>
      <SiteHeader>
        <Link
          href="/"
          className="text-ink-soft hover:text-rust transition-colors"
        >
          {TEXT.DisclaimerPage.backLink}
        </Link>
        <span>Disclaimer</span>
      </SiteHeader>

      <main id="main">
        <LegalArticle
          label={TEXT.DisclaimerPage.label}
          headline={TEXT.DisclaimerPage.headline}
          lastUpdated={TEXT.DisclaimerPage.lastUpdated}
          sections={TEXT.DisclaimerPage.sections}
        />
      </main>

      <SiteFooter>
        <FooterLink href="/privacy">Privacy</FooterLink>
        <FooterLink href="/terms">Terms</FooterLink>
        <FooterLink href="/cookies">Cookies</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
