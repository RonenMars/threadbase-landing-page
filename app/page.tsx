import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HonestCons } from "@/components/HonestCons";
import { HowItWorks } from "@/components/HowItWorks";
import { ProblemSection } from "@/components/ProblemSection";
import { PullQuote } from "@/components/PullQuote";
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
  PULL_QUOTE,
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

        <HowItWorks content={HOW_IT_WORKS} />

        <FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />

        <PullQuote content={PULL_QUOTE} />

        <HonestCons items={HONEST_CONS} section={HONEST_CONS_SECTION} />
        <QuickStart content={QUICK_START} />
      </main>
      <Footer footer={FOOTER} />
    </div>
  );
}
