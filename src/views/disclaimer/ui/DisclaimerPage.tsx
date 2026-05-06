import Link from "next/link";
import { PATHS } from "@/shared/config/paths";
import { TEXT } from "@/shared/config/text";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LegalArticle } from "@/widgets/legal-article";

export function DisclaimerPage() {
  return (
    <>
      <SiteHeader>
        <Link
          href={PATHS.HOME}
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
        <FooterLink href={PATHS.PRIVACY}>Privacy</FooterLink>
        <FooterLink href={PATHS.TERMS}>Terms</FooterLink>
        <FooterLink href={PATHS.COOKIES}>Cookies</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
