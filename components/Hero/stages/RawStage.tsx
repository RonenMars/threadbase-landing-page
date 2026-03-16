"use client";

import { motion } from "framer-motion";
import type { HeroShellStage } from "@/lib/content";
import { TypewriterLines } from "../TypewriterLines";

export function RawStage({ stage }: { stage: HeroShellStage }): React.JSX.Element {
  return (
    <div className="relative rounded-3xl">
      {/* Step 2: container border/bg materialises after header */}
      <motion.div
        animate={{ opacity: 1 }}
        className="absolute inset-0 rounded-3xl border border-white/6 bg-black/28"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
      />
      {/* Step 1: terminal header slides up first */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-4 flex items-center justify-between border-b border-white/6 px-4 pb-3 pt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted"
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <span>local session file</span>
        <span>jsonl</span>
      </motion.div>
      {/* Lines type within the container */}
      <div className="relative space-y-3 px-4 pb-4 font-mono leading-7 text-secondary">
        <TypewriterLines lines={stage.rawLines ?? []} charDelayMs={14} lineGapMs={130} />
      </div>
    </div>
  );
}
