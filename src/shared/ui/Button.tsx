import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/shared/lib/cn";

type TButtonVariant = "primary" | "ghost";
type TButtonSize = "md" | "lg";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: TButtonVariant;
  size?: TButtonSize;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
};

const baseClasses =
  "inline-flex items-center justify-center font-mono uppercase tracking-[0.18em] font-medium transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust";

const variantClasses: Record<TButtonVariant, string> = {
  primary:
    "bg-ink text-paper hover:bg-rust-deep disabled:bg-rule disabled:text-paper",
  ghost:
    "bg-transparent text-ink-soft border border-rule hover:border-rust hover:text-ink",
};

const sizeClasses: Record<TButtonSize, string> = {
  md: "px-6 py-3 text-[11px]",
  lg: "px-7 py-[18px] text-xs w-full",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ref,
  ...rest
}: TButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
