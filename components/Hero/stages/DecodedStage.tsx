"use client";

import { motion } from "framer-motion";
import type { HeroShellStage } from "@/lib/content";
import { itemTransition } from "../heroVariants";

export function DecodedStage({ stage }: { stage: HeroShellStage }): React.JSX.Element {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {stage.decodedCards?.map((card, index) => (
        <motion.div
          key={card.title}
          className="relative rounded-3xl"
          variants={{
            exit: {
              opacity: 0,
              y: -32,
              scale: 0.95,
              transition: { duration: 1.4, ease: [0.4, 0, 1, 1] as const },
            },
          }}
        >
          {/* Step 2: card container materialises after content */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 rounded-3xl border border-white/8 bg-white/4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.7, delay: 0.45 + index * 0.13, ease: [0.16, 1, 0.3, 1] as const }}
          />
          {/* Step 1: card content slides up first */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative p-4"
            initial={{ opacity: 0, y: 20 }}
            transition={itemTransition(index)}
          >
            <p className="text-xs uppercase tracking-[0.24em] text-accent-strong">
              {card.meta}
            </p>
            <p className="mt-4 text-lg font-semibold tracking-[-0.03em] text-primary">
              {card.title}
            </p>
            <p className="mt-3 leading-7 text-secondary">
              {card.description}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
