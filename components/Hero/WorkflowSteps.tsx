"use client";

export function WorkflowSteps({
  activeIndex,
  compact = false,
  onStepClick,
  steps,
  title,
}: {
  activeIndex: number;
  compact?: boolean;
  onStepClick?: (index: number) => void;
  steps: string[];
  title: string;
}): React.JSX.Element {
  if (compact) {
    return (
      <div className="mb-4 lg:hidden">
        <p className="mb-3 text-left text-xs uppercase tracking-[0.24em] text-accent-strong">
          {title}
        </p>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = index < activeIndex;

            return (
              <li
                aria-current={isActive ? "step" : undefined}
                className={`rounded-2xl border px-3 py-3 text-left transition-colors ${onStepClick ? "cursor-pointer" : ""} ${isActive
                  ? "border-accent/40 bg-accent/10 text-primary shadow-[0_0_0_1px_rgba(76,184,255,0.08)]"
                  : isComplete
                    ? "border-white/8 bg-white/4 text-primary"
                    : "border-white/6 bg-white/2 text-secondary"
                  }`}
                key={`compact-${step}`}
                onClick={() => onStepClick?.(index)}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {index + 1}
                </p>
                <p className="mt-2 leading-6">{step}</p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.24em] text-accent-strong">
        {title}
      </p>
      <ol className="space-y-3">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;

          return (
            <li
              aria-current={isActive ? "step" : undefined}
              className={`rounded-2xl border px-4 py-3 transition-colors ${onStepClick ? "cursor-pointer" : ""} ${isActive
                ? "border-accent/40 bg-accent/10 text-primary shadow-[0_0_0_1px_rgba(76,184,255,0.08)]"
                : isComplete
                  ? "border-white/8 bg-white/4 text-primary"
                  : "border-white/6 bg-white/2 text-secondary"
                }`}
              key={step}
              onClick={() => onStepClick?.(index)}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-xs ${isActive || isComplete
                    ? "border-accent/40 bg-accent/10 text-accent-strong"
                    : "border-white/10 bg-white/4 text-muted"
                    }`}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="leading-6">{step}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
