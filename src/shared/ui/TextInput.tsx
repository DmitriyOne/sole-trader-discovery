import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type TTextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TTextInputProps>(
  function TextInput({ className, ...rest }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-bg border border-rule px-4 py-3.5 font-serif text-[17px] text-ink",
          "transition-[color,background-color,border-color] duration-200",
          "focus:outline-none focus:border-rust focus:bg-paper",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust",
          "placeholder:text-ink-soft/50",
          className
        )}
        {...rest}
      />
    );
  }
);
