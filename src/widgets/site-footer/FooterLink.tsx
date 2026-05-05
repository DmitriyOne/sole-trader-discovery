import Link from "next/link";
import type { ComponentProps } from "react";

type TFooterLinkProps = ComponentProps<typeof Link>;

export function FooterLink({ className, ...rest }: TFooterLinkProps) {
  return (
    <Link
      {...rest}
      className={`text-ink-soft border-b border-rule pb-px hover:text-rust transition-colors${className ? ` ${className}` : ""}`}
    />
  );
}
