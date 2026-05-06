import { PATHS } from "@/shared/config/paths";
import { TEXT } from "@/shared/config/text";
import { LandingHero } from "@/widgets/landing-hero/LandingHero";
import { LandingDeal } from "@/widgets/landing-deal/LandingDeal";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";

export function HomePage() {
  return (
    <>
      <SiteHeader>
        <span className="flex items-center">
          <span
            aria-hidden="true"
            className="inline-block w-2 h-2 bg-rust rounded-full mr-2 pulse-dot"
          />
          {TEXT.HomePage.strip.status}
        </span>
        <span>{TEXT.HomePage.strip.issue}</span>
      </SiteHeader>

      <main id="main">
        <LandingHero />
        <LandingDeal />
      </main>

      <SiteFooter>
        <FooterLink href={PATHS.PRIVACY}>Privacy</FooterLink>
        <FooterLink href={PATHS.TERMS}>Terms</FooterLink>
        <FooterLink href={PATHS.COOKIES}>Cookies</FooterLink>
        <FooterLink href={PATHS.DISCLAIMER}>Disclaimer</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
