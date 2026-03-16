"use client";

import { motion } from "framer-motion";
import type { HeroShellStage } from "@/lib/content";

export function DeepViewStage({ stage }: { stage: HeroShellStage }): React.JSX.Element {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      {/* Left card — content first, container second */}
      <div className="relative rounded-3xl">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 rounded-3xl border border-white/6 bg-black/28"
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
        />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative p-4"
          initial={{ opacity: 0, y: 22 }}
          transition={{ duration: 0.75, delay: 0.0, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="rounded-2xl border border-accent/35 bg-accent/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.22em] text-accent-strong">
              {stage.browserProject}
            </p>
            <p className="mt-3 font-semibold text-primary">
              {stage.browserSession}
            </p>
            <p className="mt-2 text-muted">{stage.browserMeta}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-white/6 bg-white/3 px-4 py-4">
            <p className="font-medium text-primary">
              Highlighted Result
            </p>
            <p className="mt-3 leading-7 text-secondary">
              {stage.browserHighlight}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right card — content first, container second */}
      <div className="relative rounded-3xl">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 rounded-3xl border border-white/6 bg-white/3"
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
        />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative p-4"
          initial={{ opacity: 0, y: 22 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="flex items-center justify-between border-b border-white/6 pb-3">
            <p className="text-xs uppercase tracking-[0.22em] text-accent-strong">
              Conversation Browser
            </p>
            <p className="text-muted">Ready to resume</p>
          </div>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/6 bg-black/20 px-4 py-3">
              <p className="font-medium text-primary">
                Search result selected
              </p>
              <p className="mt-2 leading-7 text-secondary">
                {stage.browserHighlight}
              </p>
            </div>
            <div className="rounded-2xl border border-white/6 bg-black/35 px-4 py-3 font-mono text-accent-strong">
              {stage.browserTerminal}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
