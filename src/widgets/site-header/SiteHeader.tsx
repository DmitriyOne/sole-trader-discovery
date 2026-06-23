import type { ReactNode } from "react";

type TSiteHeaderProps = {
  children: ReactNode;
};

export function SiteHeader({ children }: TSiteHeaderProps) {
  return (
    <header className="relative z-10 border-b border-rule py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-soft flex justify-between items-center">
      {children}
    </header>
  );
}
