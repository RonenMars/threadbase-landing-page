import { FeaturesGrid } from "@/components/FeaturesGrid";
import { FinalCta } from "@/components/FinalCta";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HonestCons } from "@/components/HonestCons";
import { PhoneStrip } from "@/components/PhoneStrip";
import { QuickStart } from "@/components/QuickStart";
import { SecuritySection } from "@/components/SecuritySection";
import { SocialProofLine } from "@/components/SocialProofLine";

export default function Home(): React.JSX.Element {
  return (
    <div className="app-shell min-h-screen">
      <main>
        <Hero />
        <FeaturesGrid />
        <PhoneStrip />
        <SecuritySection />
        <HonestCons />
        <QuickStart />
        <SocialProofLine />
        <FinalCta />
      </main>
      <Footer />
      <FloatingDock />
    </div>
  );
}
