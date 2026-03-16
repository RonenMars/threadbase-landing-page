"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { HeroShellStage } from "@/lib/content";
import { itemTransition } from "../heroVariants";
import { useTypewriter } from "../TypewriterLines";

export function CommandPaletteStage({
  stage,
}: {
  stage: HeroShellStage;
}): React.JSX.Element {
  const query = stage.paletteQuery ?? "";
  // Start typing 900 ms after mount so the palette overlay finishes animating in
  const typedQuery = useTypewriter(query, 45, 900);
  const queryDone = typedQuery.length >= query.length;

  return (
    <div className="relative flex min-h-62.5 items-end rounded-3xl border border-white/6 bg-[linear-gradient(180deg,rgba(8,13,22,0.98),rgba(9,14,24,0.92))] p-5">
      {/* Step 1: background cards slide up at 35% opacity */}
      <motion.div
        animate={{ opacity: 0.35, y: 0 }}
        className="grid w-full gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 14 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="rounded-5xl border border-white/6 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Conversation
          </p>
          <p className="mt-4 font-medium text-primary">
            Auth refresh loop fixed
          </p>
          <p className="mt-3 leading-7 text-secondary">
            Retry logic isolated and token renewal extracted into a helper.
          </p>
        </div>
        <div className="rounded-5xl border border-white/6 bg-white/3 p-4" />
        <div className="rounded-5xl border border-white/6 bg-white/3 p-4" />
      </motion.div>

      {/* Step 2: overlay panel materialises with delay */}
      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute inset-x-8 top-8 rounded-3xl border border-border-strong bg-[linear-gradient(180deg,rgba(16,28,44,0.98),rgba(11,19,31,0.96))] p-5 shadow-[0_20px_60px_rgba(1,6,14,0.55)]"
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/8 bg-black/25 px-4 py-3 font-mono text-primary"
          initial={{ opacity: 0, y: 16 }}
          transition={itemTransition(0)}
        >
          &gt; {typedQuery}
          {!queryDone && <span className="animate-pulse opacity-70">▋</span>}
        </motion.div>

        <AnimatePresence>
          {queryDone && (
            <motion.div
              animate={{ opacity: 1 }}
              className="mt-4 space-y-3"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Results appear after queryDone, stagger starts fresh from index 0 */}
              {stage.paletteOptions?.map((option, index) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border px-4 py-3 ${index === 0
                    ? "border-accent/40 bg-accent/10"
                    : "border-white/6 bg-white/3"
                    }`}
                  initial={{ opacity: 0, y: 16 }}
                  key={option.label}
                  transition={itemTransition(index)}
                >
                  <p className="font-medium text-primary">
                    {option.label}
                  </p>
                  <p className="mt-1 text-muted">{option.meta}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
