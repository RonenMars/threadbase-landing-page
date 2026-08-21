import { FeaturesGrid } from "@/components/FeaturesGrid";
import { FinalCta } from "@/components/FinalCta";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HonestCons } from "@/components/HonestCons";
import { QuickStart } from "@/components/QuickStart";
import { SecuritySection } from "@/components/SecuritySection";

export default function Home(): React.JSX.Element {
  return (
    <div className="app-shell min-h-screen">
      <main>
        <Hero />
        <FeaturesGrid />
        <SecuritySection />
        <HonestCons />
        <QuickStart />
        <FinalCta />
      </main>
      <Footer />
      <FloatingDock />
    </div>
  );
}
