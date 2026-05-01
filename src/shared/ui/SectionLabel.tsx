import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type TSectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: TSectionLabelProps) {
  return (
    <div
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.18em] text-rust mb-6 font-medium",
        className
      )}
    >
      <span aria-hidden="true" className="text-ink-soft">
        §{" "}
      </span>
      {children}
    </div>
  );
}
