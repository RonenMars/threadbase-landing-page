"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlatformItem, SectionContent } from "@/lib/content";

interface PlatformPickerProps {
  section: SectionContent;
  platforms: PlatformItem[];
}

export function PlatformPicker({
  section,
  platforms,
}: PlatformPickerProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      animate={inView ? "visible" : "hidden"}
      className="px-6 py-24 sm:px-8 lg:px-10"
      id="platform-picker"
      initial="hidden"
      ref={ref}
      variants={fadeUp}
    >
      <div className="container-shell">
        <div className="mb-12 max-w-4xl space-y-4">
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
          className="grid gap-5 xl:grid-cols-3"
          variants={staggerContainer}
        >
          {platforms.map((platform) => (
            <motion.div key={platform.id} variants={staggerItem}>
              <Card className="tech-card h-full">
                <CardHeader className="gap-5">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-strong bg-white/4 text-3xl">
                        {platform.icon}
                      </span>
                      <div className="space-y-1">
                        <CardTitle>{platform.name}</CardTitle>
                        <p className="text-muted">
                          {platform.meta}
                        </p>
                      </div>
                    </div>
                    {platform.badge ? (
                      <Badge
                        className="shrink-0"
                        variant={platform.id === "intellij" ? "neutral" : "primary"}
                      >
                        {platform.badge}
                      </Badge>
                    ) : null}
                  </div>
                </CardHeader>
                <CardContent className="flex h-full flex-col gap-6">
                  <p className="leading-7 text-secondary">
                    {platform.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 rounded-4.5 border border-border bg-black/20 px-4 py-4">
                    <span className="text-muted">
                      {platform.meta}
                    </span>
                    <Button asChild size="sm" variant="outline">
                      <a href={platform.ctaHref}>{platform.ctaLabel}</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
