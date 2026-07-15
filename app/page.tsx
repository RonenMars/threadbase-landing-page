import { FeaturesGrid } from "@/components/FeaturesGrid";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HonestCons } from "@/components/HonestCons";
import { ProblemSection } from "@/components/ProblemSection";
import { QuickStart } from "@/components/QuickStart";
import { RoadmapTeaser } from "@/components/RoadmapTeaser";
import {
  FEATURES,
  FEATURES_SECTION,
  FOOTER,
  HERO,
  HONEST_CONS,
  HONEST_CONS_SECTION,
  HOW_IT_WORKS,
  PROBLEM_ITEMS,
  PROBLEM_SECTION,
  QUICK_START,
  ROADMAP_MILESTONES,
  ROADMAP_SECTION,
} from "@/lib/content";

export default function Home(): React.JSX.Element {
  return (
    <div className="app-shell min-h-screen">
      <main>
        <Hero hero={HERO} />
        <ProblemSection items={PROBLEM_ITEMS} section={PROBLEM_SECTION} />

        <FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />

        <HonestCons items={HONEST_CONS} section={HONEST_CONS_SECTION} />
        <RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />
        <QuickStart content={QUICK_START} howItWorks={HOW_IT_WORKS} />
      </main>
      <Footer footer={FOOTER} />
      <FloatingDock />
    </div>
  );
}
