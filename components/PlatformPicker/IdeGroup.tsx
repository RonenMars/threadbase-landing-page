"use client";
import type { PlatformItem, SelectedPlatform } from "@/lib/content";
import { IdeSubButton } from "./IdeSubButton";

interface IdeGroupProps {
  vsCode: PlatformItem;
  intellij: PlatformItem;
  selected: SelectedPlatform;
  onSelect: (id: SelectedPlatform) => void;
  dimmed: boolean;
}

export function IdeGroup({ vsCode, intellij, selected, onSelect, dimmed }: IdeGroupProps): React.JSX.Element {
  const eitherActive = selected === "vscode" || selected === "intellij";
  return (
    <div
      className={`flex h-full flex-col rounded-4xl border p-6 transition-all ${
        eitherActive
          ? "border-accent/50 bg-accent/6"
          : "border-border-strong bg-white/3"
      } ${dimmed ? "opacity-45" : "opacity-100"}`}
    >
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">
        IDE Extensions
      </p>
      <p className="mt-auto mb-4 text-center text-sm leading-6 text-secondary">
        Native history browser for your IDE
      </p>
      <div className="grid grid-cols-2 gap-3">
        <IdeSubButton platform={vsCode} selected={selected} onSelect={onSelect} />
        <IdeSubButton platform={intellij} selected={selected} onSelect={onSelect} />
      </div>
    </div>
  );
}
