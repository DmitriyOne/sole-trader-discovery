import type { ReactNode } from "react";
import { TEXT } from "@/shared/config/text";

type TSiteFooterProps = {
  children: ReactNode;
};

export function SiteFooter({ children }: TSiteFooterProps) {
  return (
    <footer className="border-t border-rule py-10 pb-15 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
      <div className="flex justify-between flex-wrap gap-4">
        <span>{TEXT.Footer.issue}</span>
        <span className="flex flex-wrap gap-x-6 gap-y-3">{children}</span>
      </div>
    </footer>
  );
}
