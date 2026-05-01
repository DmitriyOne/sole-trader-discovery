import { cn } from "@/shared/lib/cn";

type TStepIndicatorProps = {
  current: number;
  total: number;
};

export function StepIndicator({ current, total }: TStepIndicatorProps) {
  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`Step ${current + 1} of ${total}`}
      className="flex items-center gap-1.5 mb-8"
    >
      {Array.from({ length: total }).map((_, idx) => {
        const completed = idx < current;
        const isCurrent = idx === current;
        return (
          <span
            key={idx}
            aria-hidden="true"
            className={cn(
              "h-[3px] flex-1 transition-colors duration-300",
              completed && "bg-rust",
              isCurrent && "bg-ink",
              !completed && !isCurrent && "bg-rule"
            )}
          />
        );
      })}
    </div>
  );
}
