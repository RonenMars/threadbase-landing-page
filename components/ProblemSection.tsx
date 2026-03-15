"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProblemItem, SectionContent } from "@/lib/content";

interface ProblemSectionProps {
  section: SectionContent;
  items: ProblemItem[];
}

export function ProblemSection({
  section,
  items,
}: ProblemSectionProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      animate={inView ? "visible" : "hidden"}
      className="relative bg-bg-secondary px-6 py-24 sm:px-8 lg:px-10"
      initial="hidden"
      ref={ref}
      variants={fadeUp}
    >
      <div className="container-shell">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl lg:text-5xl">
            {section.heading}
          </h2>
        </div>

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
        >
          {items.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <Card className="tech-card h-full">
                <CardHeader className="gap-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-strong bg-white/4 text-xl">
                    {item.icon}
                  </span>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-secondary">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
