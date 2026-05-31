"use client";

import * as PhosphorIcons from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FeatureItem, SectionContent } from "@/lib/content";

interface FeaturesGridProps {
  features: FeatureItem[];
  section: SectionContent;
}

function resolveIcon(name: string): Icon | null {
  // PhosphorIcons is a namespace of icon components keyed by name.
  const candidate = (PhosphorIcons as unknown as Record<string, unknown>)[name];
  return typeof candidate === "function" ||
    (typeof candidate === "object" && candidate !== null)
    ? (candidate as Icon)
    : null;
}

export function FeaturesGrid({
  section,
  features,
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
            const MainIcon = resolveIcon(feature.icon);
            return (
              <div key={feature.title}>
                <motion.div variants={staggerItem}>
                  <Card className="tech-card relative h-full transition-colors">
                    <div className="absolute right-4 top-4 flex items-center gap-1">
                      {feature.surfaceTags.map((tagName) => {
                        const TagIcon = resolveIcon(tagName);
                        return TagIcon ? (
                          <TagIcon
                            key={tagName}
                            className="text-secondary"
                            size={14}
                            weight="regular"
                          />
                        ) : null;
                      })}
                    </div>
                    <CardHeader className="gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-strong bg-accent/12 text-xl text-accent-strong">
                          {MainIcon ? (
                            <MainIcon
                              className="text-accent-strong"
                              size={24}
                              weight="regular"
                            />
                          ) : null}
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
