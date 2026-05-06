"use client";

import { useId, type ChangeEvent } from "react";
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
  id?: string;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  className,
  id,
  "aria-required": ariaRequired,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
}: TRadioGroupProps) {
  const reactId = useId();
  const baseId = id ?? reactId;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {options.map((option) => {
        const checked = value === option.value;
        const inputId = `${baseId}-${option.value}`;
        return (
          <label
            key={option.value}
            htmlFor={inputId}
            className={cn(
              "flex items-start px-3.5 py-3 border cursor-pointer",
              "transition-[color,background-color,border-color] duration-150",
              "bg-bg hover:bg-paper hover:border-rust",
              "has-[:focus-visible]:border-rust has-[:focus-visible]:bg-paper has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rust",
              checked ? "border-rust bg-paper" : "border-rule"
            )}
          >
            <input
              id={inputId}
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={handleChange}
              aria-required={ariaRequired}
              aria-invalid={ariaInvalid}
              aria-describedby={ariaDescribedby}
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
