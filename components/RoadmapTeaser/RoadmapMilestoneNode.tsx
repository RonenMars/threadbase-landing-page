"use client";
import {
  CheckCircle,
  Rocket,
  ArrowRight,
  Clock,
  DotsThree,
  type Icon,
} from "@phosphor-icons/react";
import type { RoadmapMilestone, RoadmapStatus } from "@/lib/content";

interface RoadmapMilestoneNodeProps {
  milestone: RoadmapMilestone;
  isOpen: boolean;
  onClick: () => void;
}

const nodeStyles: Record<RoadmapStatus, string> = {
  shipped:     "border-[rgba(116,151,199,0.3)] bg-[rgba(116,151,199,0.08)] text-[#607089]",
  "this-week": "border-[rgba(240,138,36,0.7)] bg-[rgba(240,138,36,0.15)] text-[#f08a24] shadow-[0_0_0_6px_rgba(240,138,36,0.08),0_0_18px_rgba(240,138,36,0.25)]",
  next:        "border-[rgba(116,151,199,0.14)] bg-[rgba(11,19,31,0.9)] text-[#3a4e64]",
  later:       "border-[rgba(116,151,199,0.14)] bg-[rgba(11,19,31,0.9)] text-[#3a4e64]",
  future:      "border-[rgba(116,151,199,0.10)] bg-[rgba(11,19,31,0.9)] text-[#2a3a4a]",
};

const STATUS_ICON: Record<RoadmapStatus, Icon> = {
  shipped: CheckCircle,
  "this-week": Rocket,
  next: ArrowRight,
  later: Clock,
  future: DotsThree,
};

const STATUS_COLOR: Record<RoadmapStatus, string> = {
  shipped: "text-emerald-400",
  "this-week": "text-accent-secondary",
  next: "text-accent-primary",
  later: "text-secondary",
  future: "text-muted",
};

export function RoadmapMilestoneNode({ milestone, isOpen, onClick }: RoadmapMilestoneNodeProps): React.JSX.Element {
  const status = milestone.status;
  const IconComp = STATUS_ICON[status];
  return (
    <button
      onClick={onClick}
      className={`relative z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 text-sm font-bold transition-transform hover:scale-110 ${nodeStyles[status]}`}
      aria-expanded={isOpen}
    >
      <IconComp
        size={16}
        weight={status === "this-week" ? "fill" : "regular"}
        className={STATUS_COLOR[status]}
      />
      {status === "this-week" && (
        <span className="absolute inset-0 rounded-full animate-ping border-2 border-[rgba(240,138,36,0.4)]" />
      )}
    </button>
  );
}
