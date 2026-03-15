"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ScreenshotSlot, SectionContent } from "@/lib/content";
import { cn } from "@/lib/utils";

interface ScreenshotsProps {
  section: SectionContent;
  shots: ScreenshotSlot[];
}

export function Screenshots({
  section,
  shots,
}: ScreenshotsProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      animate={inView ? "visible" : "hidden"}
      className="px-6 py-24 sm:px-8 lg:px-10"
      initial="hidden"
      ref={ref}
      variants={fadeUp}
    >
      <div className="container-shell">
        <div className="mb-12 max-w-3xl space-y-4">
          {section.eyebrow ? (
            <Badge className="section-kicker" variant="secondary">
              {section.eyebrow}
            </Badge>
          ) : null}
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl lg:text-5xl">
            {section.heading}
          </h2>
        </div>

        <motion.div className="space-y-6" variants={staggerContainer}>
          {shots.map((shot, index) => (
            <motion.article
              className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-stretch"
              key={shot.caption}
              variants={staggerItem}
            >
              <div
                className={cn(
                  "flex h-full flex-col justify-center rounded-7 border border-border bg-white/3 p-8",
                  index % 2 === 1 ? "lg:order-2" : "",
                )}
              >
                <p className="mb-4 text-xs uppercase tracking-[0.28em] text-accent-strong">
                  {shot.caption}
                </p>
                <p className="text-xl font-semibold tracking-[-0.03em] text-primary sm:text-2xl">
                  {shot.caption}
                </p>
                <p className="mt-4 leading-7 text-secondary">
                  {shot.description}
                </p>
              </div>
              <Card
                className={cn(
                  "screenshot-shell flex min-h-90 items-center justify-center px-8 py-10 text-center",
                  index % 2 === 1 ? "lg:order-1" : "",
                )}
              >
                <p className="max-w-xl text-lg leading-8 text-secondary">
                  {shot.placeholderLabel}
                </p>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
