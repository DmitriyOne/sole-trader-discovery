import {
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/shared/lib/cn";

type TFieldProps = {
  number?: string;
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: ReactNode;
  className?: string;
  asFieldset?: boolean;
};

type TInjectableProps = {
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export function Field({
  number,
  label,
  required,
  help,
  error,
  children,
  className,
  asFieldset = false,
}: TFieldProps) {
  const inputId = useId();
  const helpId = useId();
  const errorId = useId();

  const describedBy =
    [help ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  const titleClasses =
    "block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-2.5 font-medium";

  const titleInner = (
    <>
      {number && (
        <span className="text-rust mr-1.5" aria-hidden="true">
          {number}
        </span>
      )}
      {label}
      {required && (
        <>
          <span className="text-rust ml-1" aria-hidden="true">
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </>
  );

  const helpEl = help ? (
    <div
      id={helpId}
      className="font-serif text-[13px] italic text-ink-soft mt-1.5 mb-2.5"
    >
      {help}
    </div>
  ) : null;

  const errorEl = error ? (
    <div
      id={errorId}
      role="alert"
      aria-live="polite"
      className="mt-2 px-3 py-2 border-l-2 border-rust bg-rust/10 font-mono text-[12px] uppercase tracking-[0.1em] text-rust-deep font-semibold"
    >
      <span aria-hidden="true">↑ </span>
      {error}
    </div>
  ) : null;

  if (asFieldset) {
    return (
      <fieldset
        className={cn("mb-7 border-0 p-0 m-0", className)}
        aria-describedby={describedBy}
      >
        <legend className={cn(titleClasses, "p-0")}>{titleInner}</legend>
        {helpEl}
        {children}
        {errorEl}
      </fieldset>
    );
  }

  const enhancedChild = isValidElement(children)
    ? cloneElement(children as ReactElement<TInjectableProps>, {
        id: inputId,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div className={cn("mb-7", className)}>
      <label htmlFor={inputId} className={titleClasses}>
        {titleInner}
      </label>
      {helpEl}
      {enhancedChild}
      {errorEl}
    </div>
  );
}
