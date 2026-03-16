"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FeatureItem, SelectedPlatform, SectionContent } from "@/lib/content";

interface FeaturesGridProps {
  section: SectionContent;
  features: FeatureItem[];
  selectedPlatform: SelectedPlatform;
}

export function FeaturesGrid({
  section,
  features,
  selectedPlatform,
}: FeaturesGridProps): React.JSX.Element {
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
            <Badge className="section-kicker" variant="primary">
              {section.eyebrow}
            </Badge>
          ) : null}
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl lg:text-5xl">
            {section.heading}
          </h2>
          {section.description ? (
            <p className="text-lg leading-8 text-secondary">
              {section.description}
            </p>
          ) : null}
        </div>

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
        >
          {features.map((feature) => {
            const isHighlighted =
              selectedPlatform !== null &&
              (feature.platforms?.includes(selectedPlatform) ?? false);
            const isDimmed =
              selectedPlatform !== null &&
              !(feature.platforms?.includes(selectedPlatform) ?? false);

            return (
              <div
                key={feature.title}
                className={`transition-opacity duration-200 ${isDimmed ? "opacity-40" : "opacity-100"}`}
              >
                <motion.div variants={staggerItem}>
                  <Card className={`tech-card h-full transition-colors ${
                    isHighlighted ? "border-accent/30 bg-accent/6" : ""
                  }`}>
                    <CardHeader className="gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-strong bg-accent/12 text-xl text-accent-strong">
                          {feature.icon}
                        </span>
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="leading-7 text-secondary">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
