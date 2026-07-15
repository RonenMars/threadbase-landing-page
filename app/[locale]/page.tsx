import { FeaturesGrid } from "@/components/FeaturesGrid";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HonestCons } from "@/components/HonestCons";
import { ProblemSection } from "@/components/ProblemSection";
import { QuickStart } from "@/components/QuickStart";
import { RoadmapTeaser } from "@/components/RoadmapTeaser";

export default function Home(): React.JSX.Element {
  return (
    <div className="app-shell min-h-screen">
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesGrid />
        <HonestCons />
        <RoadmapTeaser />
        <QuickStart />
      </main>
      <Footer />
      <FloatingDock />
    </div>
  );
}
