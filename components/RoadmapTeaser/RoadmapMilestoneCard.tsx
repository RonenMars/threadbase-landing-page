"use client";
import { AnimatePresence, motion } from "framer-motion";
import type { RoadmapMilestone } from "@/lib/content";

interface RoadmapMilestoneCardProps {
  milestone: RoadmapMilestone;
  isOpen: boolean;
  onClick: () => void;
}

const cardBorder: Record<RoadmapMilestone["status"], string> = {
  shipped: "border-[rgba(116,151,199,0.16)]",
  soon:    "border-[rgba(240,138,36,0.3)] bg-[rgba(240,138,36,0.04)]",
  planned: "border-[rgba(116,151,199,0.08)]",
  future:  "border-[rgba(116,151,199,0.06)]",
};

export function RoadmapMilestoneCard({ milestone, isOpen, onClick }: RoadmapMilestoneCardProps): React.JSX.Element {
  const titleColor = milestone.status === "shipped"
    ? "text-[#607089]"
    : milestone.status === "soon"
      ? "text-[#f08a24]"
      : "text-[#3a4e64]";

  return (
    <button
      onClick={onClick}
      className={`w-full cursor-pointer rounded-3xl border bg-[rgba(11,19,31,0.8)] p-4 text-left transition-all hover:-translate-y-0.5 ${cardBorder[milestone.status]}`}
    >
      <p className={`mb-3 text-sm font-bold ${titleColor}`}>{milestone.title}</p>
      <div className="flex flex-wrap gap-2">
        {milestone.providers.map((p) => (
          <span
            key={p.name}
            className="flex items-center gap-2 rounded-xl border border-[rgba(116,151,199,0.12)] bg-[rgba(11,19,31,0.8)] px-3 py-2 text-xs"
          >
            <span>{p.icon}</span>
            <span>
              <span className={`block font-semibold ${titleColor}`}>{p.name}</span>
              <span className="text-[#3a4e64]">{p.type}</span>
            </span>
          </span>
        ))}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden text-sm leading-6 text-secondary"
          >
            {milestone.detail}
          </motion.p>
        )}
      </AnimatePresence>
    </button>
  );
}
