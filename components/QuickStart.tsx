"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { QuickStartBlock, SectionContent } from "@/lib/content";

interface QuickStartProps {
  section: SectionContent;
  blocks: QuickStartBlock[];
}

const accentMap: Record<QuickStartBlock["accentColor"], string> = {
  orange: "bg-accent-secondary",
  blue:   "bg-accent",
  violet: "bg-violet-400",
  green:  "bg-green-400",
};

export function QuickStart({
  section,
  blocks,
}: QuickStartProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      animate={inView ? "visible" : "hidden"}
      className="px-6 py-24 sm:px-8 lg:px-10"
      id="quick-start"
      initial="hidden"
      ref={ref}
      variants={fadeUp}
    >
      <div className="container-shell">
        <div className="mb-12 max-w-4xl space-y-4">
          {section.eyebrow ? (
            <Badge className="section-kicker" variant="neutral">
              {section.eyebrow}
            </Badge>
          ) : null}
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl lg:text-6xl">
            {section.heading}
          </h2>
        </div>

        <motion.div
          className="grid gap-5 xl:grid-cols-3"
          variants={staggerContainer}
        >
          {blocks.map((block) => (
            <motion.div key={block.platformId} variants={staggerItem}>
              <Card className="tech-card h-full p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full shadow-[0_0_24px_currentColor] ${accentMap[block.accentColor]}`}
                  />
                  <p className="font-medium tracking-tight text-primary">
                    {block.platformName}
                  </p>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
