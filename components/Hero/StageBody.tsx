"use client";
import type { HeroShellStage } from "@/lib/content";
import { CommandPaletteStage } from "./stages/CommandPaletteStage";
import { DecodedStage } from "./stages/DecodedStage";
import { DeepViewStage } from "./stages/DeepViewStage";
import { RawStage } from "./stages/RawStage";

export function StageBody({ stage }: { stage: HeroShellStage }): React.JSX.Element {
  switch (stage.id) {
    case "raw-jsonl": return <RawStage stage={stage} />;
    case "decoded":   return <DecodedStage stage={stage} />;
    case "command-palette": return <CommandPaletteStage stage={stage} />;
    case "deep-view": return <DeepViewStage stage={stage} />;
    default: return <div />;
  }
}
