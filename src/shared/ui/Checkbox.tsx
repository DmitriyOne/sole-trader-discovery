"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type TCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  children: ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, TCheckboxProps>(
  function Checkbox({ className, children, ...rest }, ref) {
    return (
      <label
        className={cn(
          "flex items-start gap-3 cursor-pointer p-3.5 border border-rule bg-bg",
          "transition-colors duration-150 hover:border-rust hover:bg-paper",
          "has-[:focus-visible]:border-rust has-[:focus-visible]:bg-paper has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rust",
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="mt-1 accent-rust h-4 w-4 cursor-pointer"
          {...rest}
        />
        <span className="text-[15px] text-ink-soft font-serif leading-[1.5]">
          {children}
        </span>
      </label>
    );
  }
);
