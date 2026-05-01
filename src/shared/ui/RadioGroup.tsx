"use client";

import type { ChangeEvent } from "react";
import { cn } from "@/shared/lib/cn";

type TRadioOption = {
  value: string;
  label: string;
};

type TRadioGroupProps = {
  name: string;
  options: ReadonlyArray<TRadioOption>;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  className,
}: TRadioGroupProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {options.map((option) => {
        const checked = value === option.value;
        return (
          <label
            key={option.value}
            className={cn(
              "flex items-start px-3.5 py-3 border cursor-pointer",
              "transition-[color,background-color,border-color] duration-150",
              "bg-bg hover:bg-paper hover:border-rust",
              "has-[:focus-visible]:border-rust has-[:focus-visible]:bg-paper has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rust",
              checked ? "border-rust bg-paper" : "border-rule"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={handleChange}
              className="mr-3 mt-1 accent-rust"
            />
            <span className="text-[16px] text-ink font-serif">
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
