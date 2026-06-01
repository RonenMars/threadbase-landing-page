"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fadeUp } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import type { RoadmapMilestone, RoadmapStatus, SectionContent } from "@/lib/content";
import { RoadmapMilestoneCard } from "./RoadmapMilestoneCard";
import { RoadmapMilestoneNode } from "./RoadmapMilestoneNode";
import { WaitlistForm } from "./WaitlistForm";

interface RoadmapTeaserProps {
  milestones: RoadmapMilestone[];
  section: SectionContent;
}

const STATUS_LABEL: Record<RoadmapStatus, string> = {
  shipped: "Shipped",
  "this-week": "This week",
  next: "Next",
  later: "Later",
  future: "Future",
};

export function RoadmapTeaser({ milestones, section }: RoadmapTeaserProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleOpen(index: number): void {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <motion.section
      animate={inView ? "visible" : "hidden"}
      className="px-6 py-24 sm:px-8 lg:px-10"
      initial="hidden"
      ref={ref}
      variants={fadeUp}
    >
      <div className="container-shell max-w-3xl">
        <div className="mb-16 space-y-4 text-center">
          {section.eyebrow && (
            <Badge className="section-kicker" variant="secondary">
              {section.eyebrow}
            </Badge>
          )}
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl lg:text-5xl">
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
                  <div className={isLeft ? "text-right" : ""}>
                    {isLeft ? (
                      <RoadmapMilestoneCard
                        milestone={milestone}
                        isOpen={isOpen}
                        onClick={() => toggleOpen(index)}
                      />
                    ) : (
                      <p className="text-right text-xs font-bold uppercase tracking-[0.18em] text-muted">
                        {STATUS_LABEL[milestone.status]}
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
                        {STATUS_LABEL[milestone.status]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <WaitlistForm />
      </div>
    </motion.section>
  );
}
