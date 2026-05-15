"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Self-reflective names: same value in all locales, no translation needed.
const LOCALE_LABEL = {
  en: "English",
  ru: "Русский",
  uk: "Українська",
} as const;

export function LocaleSwitcher() {
  const active = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-rust transition-colors"
        aria-label={t("label")}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {active.toUpperCase()} ▾
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 bg-paper border border-rule py-1 min-w-[140px] z-10 shadow-lg"
        >
          {routing.locales
            .filter((l) => l !== active)
            .map((l) => (
              <li key={l} role="option">
                <Link
                  href={pathname}
                  locale={l}
                  className="block px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-rust hover:bg-bg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {LOCALE_LABEL[l]}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
