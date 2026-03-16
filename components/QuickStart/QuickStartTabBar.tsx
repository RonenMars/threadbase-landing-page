"use client";
import type { QuickStartBlock } from "@/lib/content";

interface QuickStartTabBarProps {
  blocks: QuickStartBlock[];
  activeId: string;
  onTabChange: (id: string) => void;
}

export function QuickStartTabBar({ blocks, activeId, onTabChange }: QuickStartTabBarProps): React.JSX.Element {
  return (
    <div className="mb-6 flex gap-1 rounded-2xl border border-border bg-black/20 p-1">
      {blocks.map((block) => (
        <button
          key={block.platformId}
          onClick={() => onTabChange(block.platformId)}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
            activeId === block.platformId
              ? "bg-accent/10 text-primary shadow-[0_0_0_1px_rgba(99,179,255,0.2)]"
              : "text-muted hover:text-secondary"
          }`}
        >
          {block.platformName}
        </button>
      ))}
    </div>
  );
}
