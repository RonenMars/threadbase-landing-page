"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { fadeUp } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import type {
  RoadmapMilestone,
  RoadmapStatus,
  SectionContent,
} from "@/lib/content";
import { getRoadmapContent } from "@/lib/translated-content";
import { RoadmapMilestoneCard } from "./RoadmapMilestoneCard";
import { RoadmapMilestoneNode } from "./RoadmapMilestoneNode";
import { NewsletterForm } from "./NewsletterForm";

interface RoadmapTeaserProps {
  section?: SectionContent;
  milestones?: RoadmapMilestone[];
  statusLabels?: Record<RoadmapStatus, string>;
}

export function RoadmapTeaser({
  section: sectionProp,
  milestones: milestonesProp,
  statusLabels: statusLabelsProp,
}: RoadmapTeaserProps): React.JSX.Element {
  const fallback = getRoadmapContent(useTranslations("home.roadmap"));
  const section = sectionProp ?? fallback.section;
  const milestones = milestonesProp ?? fallback.milestones;
  const statusLabels = statusLabelsProp ?? fallback.statusLabels;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleOpen(index: number): void {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <motion.section
      animate="visible"
      className="px-6 py-24 sm:px-8 lg:px-10"
      initial={false}
      variants={fadeUp}
    >
      <div className="container-shell max-w-3xl">
        <div className="mb-16 space-y-4 text-center">
          {section.eyebrow && (
            <Badge className="section-kicker" variant="secondary">
              {section.eyebrow}
            </Badge>
          )}
          <h2 className="text-balance text-3xl font-semibold tracking-tighter text-primary sm:text-4xl lg:text-5xl">
            {section.heading}
          </h2>
          {section.description && (
            <p className="mx-auto max-w-lg text-base leading-7 text-secondary">
              {section.description}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Gradient spine */}
          <div
            className="absolute left-1/2 top-5 -translate-x-1/2 w-0.5 bottom-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(116,151,199,0.22) 0%, rgba(116,151,199,0.22) 22%, rgba(240,138,36,0.5) 38%, #f08a24 50%, rgba(240,138,36,0.5) 62%, rgba(116,151,199,0.08) 100%)",
            }}
          />

          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              const isOpen = openIndex === index;
              return (
                <div key={milestone.title} className="relative grid grid-cols-[1fr_56px_1fr] items-center gap-4">
                  {/* Left slot */}
                  <div className={isLeft ? "text-end" : ""}>
                    {isLeft ? (
                      <RoadmapMilestoneCard
                        milestone={milestone}
                        isOpen={isOpen}
                        onClick={() => toggleOpen(index)}
                      />
                    ) : (
                      <p className="text-end text-xs font-bold uppercase tracking-[0.18em] text-muted">
                        {statusLabels[milestone.status]}
                      </p>
                    )}
                  </div>

                  {/* Center node */}
                  <div className="flex justify-center">
                    <RoadmapMilestoneNode
                      milestone={milestone}
                      isOpen={isOpen}
                      onClick={() => toggleOpen(index)}
                    />
                  </div>

                  {/* Right slot */}
                  <div>
                    {!isLeft ? (
                      <RoadmapMilestoneCard
                        milestone={milestone}
                        isOpen={isOpen}
                        onClick={() => toggleOpen(index)}
                      />
                    ) : (
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                        {statusLabels[milestone.status]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <NewsletterForm />
      </div>
    </motion.section>
  );
}
