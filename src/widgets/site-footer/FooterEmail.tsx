import { TEXT } from "@/shared/config/text";

export function FooterEmail() {
  return (
    <a
      href={`mailto:${TEXT.Footer.contact}`}
      className="text-ink-soft border-b border-rule pb-px hover:text-rust transition-colors"
    >
      {TEXT.Footer.contact}
    </a>
  );
}
