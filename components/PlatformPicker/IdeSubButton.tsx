"use client";
import type { PlatformItem, SelectedPlatform } from "@/lib/content";

interface IdeSubButtonProps {
  platform: PlatformItem;
  selected: SelectedPlatform;
  onSelect: (id: SelectedPlatform) => void;
}

export function IdeSubButton({ platform, selected, onSelect }: IdeSubButtonProps): React.JSX.Element {
  const isActive = selected === platform.id;
  return (
    <button
      onClick={() => onSelect(isActive ? null : platform.id)}
      className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-3 text-center text-xs font-medium transition-all ${
        isActive
          ? "border-accent/50 bg-accent/6 text-primary shadow-[0_0_0_1px_rgba(99,179,255,0.12)]"
          : "border-border-strong bg-black/20 text-muted hover:border-accent/30 hover:text-secondary"
      }`}
    >
      <span className="text-lg">{platform.icon}</span>
      <span>{platform.name}</span>
    </button>
  );
}
