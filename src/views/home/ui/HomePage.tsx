import { useTranslations } from "next-intl";
import { PATHS } from "@/shared/config/paths";
import { LandingHero } from "@/widgets/landing-hero/LandingHero";
import { LandingDeal } from "@/widgets/landing-deal/LandingDeal";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter, FooterLink, FooterEmail } from "@/widgets/site-footer";
import { LocaleSwitcher } from "@/shared/ui/locale-switcher";

export function HomePage() {
  const t = useTranslations("HomePage.strip");
  const tLinks = useTranslations("Footer.links");

  return (
    <>
      <SiteHeader>
        <span className="flex items-center">
          <span
            aria-hidden="true"
            className="inline-block w-2 h-2 bg-rust rounded-full mr-2 pulse-dot"
          />
          {t("status")}
        </span>
        <span className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:inline">{t("issue")}</span>
          <LocaleSwitcher />
        </span>
      </SiteHeader>

      <main id="main">
        <LandingHero />
        <LandingDeal />
      </main>

      <SiteFooter>
        <FooterLink href={PATHS.PRIVACY}>{tLinks("privacy")}</FooterLink>
        <FooterLink href={PATHS.TERMS}>{tLinks("terms")}</FooterLink>
        <FooterLink href={PATHS.COOKIES}>{tLinks("cookies")}</FooterLink>
        <FooterLink href={PATHS.DISCLAIMER}>{tLinks("disclaimer")}</FooterLink>
        <FooterEmail />
      </SiteFooter>
    </>
  );
}
