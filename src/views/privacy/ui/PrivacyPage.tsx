import Link from "next/link";
import { PATHS } from "@/shared/config/paths";
import { TEXT } from "@/shared/config/text";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LegalArticle } from "@/widgets/legal-article";

export function PrivacyPage() {
  return (
    <>
      <SiteHeader>
        <Link
          href={PATHS.HOME}
          className="text-ink-soft hover:text-rust transition-colors"
        >
          {TEXT.PrivacyPage.backLink}
        </Link>
        <span>Privacy</span>
      </SiteHeader>

      <main id="main">
        <LegalArticle
          label={TEXT.PrivacyPage.label}
          headline={TEXT.PrivacyPage.headline}
          lastUpdated={TEXT.PrivacyPage.lastUpdated}
          sections={TEXT.PrivacyPage.sections}
        />
      </main>

      <SiteFooter>
        <FooterLink href={PATHS.TERMS}>Terms</FooterLink>
        <FooterLink href={PATHS.COOKIES}>Cookies</FooterLink>
        <FooterLink href={PATHS.DISCLAIMER}>Disclaimer</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
