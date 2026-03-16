"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import type { PlatformItem, SelectedPlatform, SectionContent } from "@/lib/content";
import { IdeGroup } from "./IdeGroup";
import { PlatformCard } from "./PlatformCard";

interface PlatformPickerProps {
  section: SectionContent;
  platforms: PlatformItem[];
  selected: SelectedPlatform;
  onSelect: (id: SelectedPlatform) => void;
}

export function PlatformPicker({ section, platforms, selected, onSelect }: PlatformPickerProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const desktop  = platforms.find((p) => p.id === "desktop")!;
  const vsCode   = platforms.find((p) => p.id === "vscode")!;
  const intellij = platforms.find((p) => p.id === "intellij")!;
  const cli      = platforms.find((p) => p.id === "cli")!;

  const anySelected = selected !== null;

  function isDimmed(ids: Array<PlatformItem["id"]>): boolean {
    return anySelected && !ids.includes(selected!);
  }

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
            <p className="text-lg leading-8 text-secondary">{section.description}</p>
          ) : null}
        </div>

        {!anySelected && (
          <p className="mb-6 text-center text-sm text-muted">
            Pick your environment to see a tailored experience.
          </p>
        )}

        <div className="grid gap-5 xl:grid-cols-3">
          <PlatformCard
            platform={desktop}
            selected={selected}
            onSelect={onSelect}
            dimmed={isDimmed(["desktop"])}
          />
          <IdeGroup
            vsCode={vsCode}
            intellij={intellij}
            selected={selected}
            onSelect={onSelect}
            dimmed={isDimmed(["vscode", "intellij"])}
          />
          <PlatformCard
            platform={cli}
            selected={selected}
            onSelect={onSelect}
            dimmed={isDimmed(["cli"])}
          />
        </div>
      </div>
    </motion.section>
  );
}
