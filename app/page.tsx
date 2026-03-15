import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HonestCons } from "@/components/HonestCons";
import { PlatformPicker } from "@/components/PlatformPicker";
import { ProblemSection } from "@/components/ProblemSection";
import { QuickStart } from "@/components/QuickStart";
import { Screenshots } from "@/components/Screenshots";
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
  SCREENSHOTS,
  SCREENSHOTS_SECTION,
} from "@/lib/content";

export default function Home(): React.JSX.Element {
  return (
    <div className="app-shell min-h-screen">
      <main>
        <Hero hero={HERO} />
        <ProblemSection items={PROBLEM_ITEMS} section={PROBLEM_SECTION} />
        <FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />
        <PlatformPicker platforms={PLATFORMS} section={PLATFORM_SECTION} />
        <Screenshots section={SCREENSHOTS_SECTION} shots={SCREENSHOTS} />
        <HonestCons items={HONEST_CONS} section={HONEST_CONS_SECTION} />
        <QuickStart blocks={QUICK_START} section={QUICK_START_SECTION} />
      </main>
      <Footer footer={FOOTER} />
    </div>
  );
}
