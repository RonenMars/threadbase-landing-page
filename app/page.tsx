"use client";

import { useRef, useState } from "react";
import type { SelectedPlatform } from "@/lib/content";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HonestCons } from "@/components/HonestCons";
import { PlatformPicker } from "@/components/PlatformPicker";
import { ProblemSection } from "@/components/ProblemSection";
import { QuickStart } from "@/components/QuickStart";
import { Screenshots } from "@/components/Screenshots";
// import { RoadmapTeaser } from "@/components/RoadmapTeaser";
import {
  FEATURES,
  FEATURES_SECTION,
  FOOTER,
  HERO,
  HONEST_CONS,
  HONEST_CONS_SECTION,
  PLATFORMS,
  PLATFORM_SECTION,
  PROBLEM_ITEMS,
  PROBLEM_SECTION,
  QUICK_START,
  QUICK_START_SECTION,
  ROADMAP_MILESTONES,
  ROADMAP_SECTION,
  SCREENSHOTS,
  SCREENSHOTS_PLATFORM_LABELS,
  SCREENSHOTS_SECTION,
} from "@/lib/content";

export default function Home(): React.JSX.Element {
  const [selectedPlatform, setSelectedPlatform] = useState<SelectedPlatform>(null);
  const quickStartRef = useRef<HTMLDivElement>(null);

  function handlePlatformSelect(id: SelectedPlatform): void {
    setSelectedPlatform(id);
    if (id !== null) {
      setTimeout(() => {
        quickStartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }

  return (
    <div className="app-shell min-h-screen">
      <main>
        <Hero hero={HERO} />
        <ProblemSection items={PROBLEM_ITEMS} section={PROBLEM_SECTION} />
        <PlatformPicker
          platforms={PLATFORMS}
          section={PLATFORM_SECTION}
          selected={selectedPlatform}
          onSelect={handlePlatformSelect}
        />
        <FeaturesGrid
          features={FEATURES}
          section={FEATURES_SECTION}
          selectedPlatform={selectedPlatform}
        />
        <Screenshots
          section={SCREENSHOTS_SECTION}
          shots={SCREENSHOTS}
          selectedPlatform={selectedPlatform}
          platformLabels={SCREENSHOTS_PLATFORM_LABELS}
        />
        <HonestCons items={HONEST_CONS} section={HONEST_CONS_SECTION} />
        {/* <RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} /> */}
        <div ref={quickStartRef}>
          <QuickStart
            blocks={QUICK_START}
            section={QUICK_START_SECTION}
            selectedPlatform={selectedPlatform}
          />
        </div>
      </main>
      <Footer footer={FOOTER} />
    </div>
  );
}
