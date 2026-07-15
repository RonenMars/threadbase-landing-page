"use client";

import { Bell, Coffee, type Icon, MapPin } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProblemItem, SectionContent } from "@/lib/content";
import { getProblemContent } from "@/lib/translated-content";

interface ProblemSectionProps {
  section?: SectionContent;
  items?: ProblemItem[];
}

const ICON_MAP: Record<string, Icon> = {
  Coffee,
  Bell,
  MapPin,
};

export function ProblemSection({
  section: sectionProp,
  items: itemsProp,
}: ProblemSectionProps): React.JSX.Element {
  const fallback = getProblemContent(useTranslations("home.problem"));
  const section = sectionProp ?? fallback.section;
  const items = itemsProp ?? fallback.items;

  return (
    <motion.section
      animate="visible"
      className="relative bg-bg-secondary px-6 py-24 sm:px-8 lg:px-10"
      initial={false}
      variants={fadeUp}
    >
      <div className="container-shell">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tighter text-primary sm:text-4xl lg:text-5xl">
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
                    {(() => {
                      const IconComp = ICON_MAP[item.icon];
                      return IconComp ? (
                        <IconComp
                          className="text-accent-strong"
                          size={24}
                          weight="regular"
                        />
                      ) : null;
                    })()}
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
