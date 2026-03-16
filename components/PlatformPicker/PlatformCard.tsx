"use client";
import type { PlatformItem, SelectedPlatform } from "@/lib/content";

interface PlatformCardProps {
  platform: PlatformItem;
  selected: SelectedPlatform;
  onSelect: (id: SelectedPlatform) => void;
  dimmed: boolean;
}

export function PlatformCard({ platform, selected, onSelect, dimmed }: PlatformCardProps): React.JSX.Element {
  const isActive = selected === platform.id;
  return (
    <button
      onClick={() => onSelect(isActive ? null : platform.id)}
      className={`tech-card flex h-full w-full flex-col gap-5 rounded-4xl border p-6 text-left transition-all ${
        isActive
          ? "border-accent/50 bg-accent/6 shadow-[0_0_0_1px_rgba(99,179,255,0.12)]"
          : "border-border-strong bg-white/3 hover:border-accent/30"
      } ${dimmed ? "opacity-45" : "opacity-100"}`}
    >
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-strong bg-white/4 text-3xl">
          {platform.icon}
        </span>
        <div className="space-y-1">
          <p className="font-semibold tracking-tight text-primary">{platform.name}</p>
          <p className="text-sm text-muted">{platform.meta}</p>
        </div>
      </div>
      <p className="leading-7 text-secondary">{platform.description}</p>
    </button>
  );
}
