import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type TTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TTextAreaProps>(
  function TextArea({ className, rows = 5, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full bg-bg border border-rule px-4 py-3.5 font-serif text-[17px] text-ink leading-[1.5]",
          "transition-[color,background-color,border-color] duration-200 resize-y min-h-[120px]",
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
