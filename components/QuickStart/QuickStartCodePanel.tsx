"use client";
import { Card } from "@/components/ui/card";
import type { QuickStartBlock } from "@/lib/content";

const accentMap: Record<QuickStartBlock["accentColor"], string> = {
  orange: "bg-accent-secondary",
  blue:   "bg-accent",
  violet: "bg-violet-400",
  green:  "bg-green-400",
};

interface QuickStartCodePanelProps {
  block: QuickStartBlock;
}

export function QuickStartCodePanel({ block }: QuickStartCodePanelProps): React.JSX.Element {
  return (
    <Card className="tech-card p-6">
      <div className="mb-5 flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full shadow-[0_0_24px_currentColor] ${accentMap[block.accentColor]}`}
        />
        <p className="font-medium tracking-tight text-primary">{block.platformName}</p>
      </div>
      <pre className="terminal-block overflow-x-auto rounded-3xl border border-white/6 p-5 leading-7 text-primary">
        <code className="font-mono">
          {block.steps.map((line, index) => {
            if (line.length === 0) {
              return <span className="block h-4" key={`${block.platformId}-${index}`} />;
            }

            const lineClassName = line.startsWith("#")
              ? "text-emerald-300/80"
              : "text-primary";

            return (
              <span
                className={`block whitespace-pre-wrap ${lineClassName}`}
                key={`${block.platformId}-${index}`}
              >
                {line}
              </span>
            );
          })}
        </code>
      </pre>
    </Card>
  );
}
