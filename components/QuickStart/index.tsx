"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fadeUp } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import type { QuickStartBlock, SelectedPlatform, SectionContent } from "@/lib/content";
import { QuickStartCodePanel } from "./QuickStartCodePanel";
import { QuickStartTabBar } from "./QuickStartTabBar";

interface QuickStartProps {
  section: SectionContent;
  blocks: QuickStartBlock[];
  selectedPlatform: SelectedPlatform;
}

export function QuickStart({ section, blocks, selectedPlatform }: QuickStartProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [activeId, setActiveId] = useState<string>(blocks[0]?.platformId ?? "desktop");

  useEffect(() => {
    if (selectedPlatform !== null) {
      const match = blocks.find((b) => b.platformId === selectedPlatform);
      if (match) setActiveId(match.platformId);
    }
  }, [selectedPlatform, blocks]);

  const activeBlock = blocks.find((b) => b.platformId === activeId) ?? blocks[0];

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
        <QuickStartTabBar blocks={blocks} activeId={activeId} onTabChange={setActiveId} />
        {activeBlock && <QuickStartCodePanel block={activeBlock} />}
      </div>
    </motion.section>
  );
}
