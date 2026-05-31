import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HonestCons } from "@/components/HonestCons";
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

        {/* Milestone 6 will replace this stub with the real HowItWorks component */}
        <section
          id="how-it-works"
          aria-labelledby="how-it-works-heading"
          className="bg-bg-primary py-24"
        >
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">
              {HOW_IT_WORKS.eyebrow}
            </p>
            <h2
              id="how-it-works-heading"
              className="text-3xl font-semibold text-primary sm:text-4xl"
            >
              {HOW_IT_WORKS.heading}
            </h2>
            <ol className="mt-10 space-y-6 text-left text-secondary">
              {HOW_IT_WORKS.steps.map((step, i) => (
                <li key={step.title}>
                  <p className="font-mono text-xs text-accent-primary">
                    {i + 1}
                  </p>
                  <p className="mt-1 text-lg text-primary">{step.title}</p>
                  <p className="mt-1">{step.description}</p>
                  {step.postscript ? (
                    <p className="mt-2 italic text-muted">{step.postscript}</p>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm italic text-muted">
              {HOW_IT_WORKS.trustNote}
            </p>
          </div>
        </section>

        <FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />

        <PullQuote content={PULL_QUOTE} />

        <HonestCons items={HONEST_CONS} section={HONEST_CONS_SECTION} />
        <RoadmapTeaser
          milestones={ROADMAP_MILESTONES}
          section={ROADMAP_SECTION}
        />
        <QuickStart content={QUICK_START} />
      </main>
      <Footer footer={FOOTER} />
    </div>
  );
}
