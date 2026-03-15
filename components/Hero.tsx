"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HeroContent, HeroShellStage } from "@/lib/content";

interface HeroProps {
  hero: HeroContent;
}

// Layer 3 — background panel frame (last to appear)
const panelVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.36, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  },
};

// Layer 2 — panel header text (second)
const headerVariants: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// Layer 1 — individual items inside stage body (first, staggered per index)
function itemTransition(index: number) {
  return { duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const };
}

function WorkflowSteps({
  activeIndex,
  compact = false,
  steps,
  title,
}: {
  activeIndex: number;
  compact?: boolean;
  steps: string[];
  title: string;
}): React.JSX.Element {
  if (compact) {
    return (
      <div className="mb-4 lg:hidden">
        <p className="mb-3 text-left text-xs uppercase tracking-[0.24em] text-accent-strong">
          {title}
        </p>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = index < activeIndex;

            return (
              <li
                aria-current={isActive ? "step" : undefined}
                className={`rounded-2xl border px-3 py-3 text-left transition-colors ${
                  isActive
                    ? "border-accent/40 bg-accent/10 text-primary shadow-[0_0_0_1px_rgba(76,184,255,0.08)]"
                    : isComplete
                      ? "border-white/8 bg-white/4 text-primary"
                      : "border-white/6 bg-white/2 text-secondary"
                }`}
                key={`compact-${step}`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {index + 1}
                </p>
                <p className="mt-2 leading-6">{step}</p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.24em] text-accent-strong">
        {title}
      </p>
      <ol className="space-y-3">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;

          return (
            <li
              aria-current={isActive ? "step" : undefined}
              className={`rounded-2xl border px-4 py-3 transition-colors ${
                isActive
                  ? "border-accent/40 bg-accent/10 text-primary shadow-[0_0_0_1px_rgba(76,184,255,0.08)]"
                  : isComplete
                    ? "border-white/8 bg-white/4 text-primary"
                    : "border-white/6 bg-white/2 text-secondary"
              }`}
              key={step}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                    isActive || isComplete
                      ? "border-accent/40 bg-accent/10 text-accent-strong"
                      : "border-white/10 bg-white/4 text-muted"
                  }`}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="leading-6">{step}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function RawStage({ stage }: { stage: HeroShellStage }): React.JSX.Element {
  return (
    <div className="rounded-6 border border-white/6 bg-black/28 p-4">
      <div className="mb-4 flex items-center justify-between border-b border-white/6 pb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span>local session file</span>
        <span>jsonl</span>
      </div>
      <div className="space-y-3 font-mono leading-7 text-secondary">
        {stage.rawLines?.map((line, index) => (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className={index === 2 ? "text-accent-strong" : ""}
            initial={{ opacity: 0, y: 16 }}
            key={`${stage.id}-${index}`}
            transition={itemTransition(index)}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

function DecodedStage({ stage }: { stage: HeroShellStage }): React.JSX.Element {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {stage.decodedCards?.map((card, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-6 border border-white/8 bg-white/4 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          initial={{ opacity: 0, y: 20 }}
          key={card.title}
          transition={itemTransition(index)}
        >
          <p className="text-xs uppercase tracking-[0.24em] text-accent-strong">
            {card.meta}
          </p>
          <p className="mt-4 text-lg font-semibold tracking-[-0.03em] text-primary">
            {card.title}
          </p>
          <p className="mt-3 leading-7 text-secondary">
            {card.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function CommandPaletteStage({
  stage,
}: {
  stage: HeroShellStage;
}): React.JSX.Element {
  return (
    <div className="relative flex min-h-62.5 items-end rounded-6 border border-white/6 bg-[linear-gradient(180deg,rgba(8,13,22,0.98),rgba(9,14,24,0.92))] p-5">
      <div className="grid w-full gap-4 opacity-35 md:grid-cols-3">
        <div className="rounded-5 border border-white/6 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Conversation
          </p>
          <p className="mt-4 font-medium text-primary">
            Auth refresh loop fixed
          </p>
          <p className="mt-3 leading-7 text-secondary">
            Retry logic isolated and token renewal extracted into a helper.
          </p>
        </div>
        <div className="rounded-5 border border-white/6 bg-white/3 p-4" />
        <div className="rounded-5 border border-white/6 bg-white/3 p-4" />
      </div>

      <div className="absolute inset-x-8 top-8 rounded-6 border border-border-strong bg-[linear-gradient(180deg,rgba(16,28,44,0.98),rgba(11,19,31,0.96))] p-5 shadow-[0_20px_60px_rgba(1,6,14,0.55)]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/8 bg-black/25 px-4 py-3 font-mono text-primary"
          initial={{ opacity: 0, y: 16 }}
          transition={itemTransition(0)}
        >
          &gt; {stage.paletteQuery}
        </motion.div>
        <div className="mt-4 space-y-3">
          {stage.paletteOptions?.map((option, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border px-4 py-3 ${index === 0
                  ? "border-accent/40 bg-accent/10"
                  : "border-white/6 bg-white/3"
                }`}
              initial={{ opacity: 0, y: 16 }}
              key={option.label}
              transition={itemTransition(index + 1)}
            >
              <p className="font-medium text-primary">
                {option.label}
              </p>
              <p className="mt-1 text-muted">{option.meta}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeepViewStage({ stage }: { stage: HeroShellStage }): React.JSX.Element {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="rounded-6 border border-white/6 bg-black/28 p-4"
        initial={{ opacity: 0, y: 20 }}
        transition={itemTransition(0)}
      >
        <div className="rounded-2xl border border-accent/35 bg-accent/10 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.22em] text-accent-strong">
            {stage.browserProject}
          </p>
          <p className="mt-3 font-semibold text-primary">
            {stage.browserSession}
          </p>
          <p className="mt-2 text-muted">{stage.browserMeta}</p>
        </div>
        <div className="mt-4 rounded-2xl border border-white/6 bg-white/3 px-4 py-4">
          <p className="font-medium text-primary">
            Highlighted Result
          </p>
          <p className="mt-3 leading-7 text-secondary">
            {stage.browserHighlight}
          </p>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="rounded-6 border border-white/6 bg-white/3 p-4"
        initial={{ opacity: 0, y: 20 }}
        transition={itemTransition(1)}
      >
        <div className="flex items-center justify-between border-b border-white/6 pb-3">
          <p className="text-xs uppercase tracking-[0.22em] text-accent-strong">
            Conversation Browser
          </p>
          <p className="text-muted">Ready to resume</p>
        </div>
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl border border-white/6 bg-black/20 px-4 py-3">
            <p className="font-medium text-primary">
              Search result selected
            </p>
            <p className="mt-2 leading-7 text-secondary">
              {stage.browserHighlight}
            </p>
          </div>
          <div className="rounded-2xl border border-white/6 bg-black/35 px-4 py-3 font-mono text-accent-strong">
            {stage.browserTerminal}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StageBody({ stage }: { stage: HeroShellStage }): React.JSX.Element {
  switch (stage.id) {
    case "raw-jsonl":
      return <RawStage stage={stage} />;
    case "decoded":
      return <DecodedStage stage={stage} />;
    case "command-palette":
      return <CommandPaletteStage stage={stage} />;
    case "deep-view":
      return <DeepViewStage stage={stage} />;
    default:
      return <div />;
  }
}

export function Hero({ hero }: HeroProps): React.JSX.Element {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const lastStageIndex = hero.shellStages.length - 1;
  const activeStage = hero.shellStages[activeStageIndex];

  useEffect(() => {
    let elapsedMs = 0;
    const timeoutIds: number[] = [];

    hero.shellStages.forEach((stage, index) => {
      if (index >= lastStageIndex || stage.durationMs === undefined) {
        return;
      }

      elapsedMs += stage.durationMs;

      const timeoutId = window.setTimeout(() => {
        setActiveStageIndex(index + 1);
      }, elapsedMs);

      timeoutIds.push(timeoutId);
    });

    return () => {
      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, [hero.shellStages, lastStageIndex]);

  return (
    <motion.section
      animate="visible"
      className="relative overflow-hidden px-6 pb-24 pt-10 sm:px-8 lg:px-10 lg:pb-32 lg:pt-14"
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <div className="hero-mesh absolute inset-0 opacity-90" aria-hidden="true" />
      <div
        className="floating-orb motion-preset-float-sm absolute -left-32 top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(89,191,255,0.3),rgba(89,191,255,0))] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="floating-orb motion-preset-float-sm absolute -right-24 top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(240,138,36,0.22),rgba(240,138,36,0))] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-shell relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 text-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <Badge className="section-kicker" variant="secondary">
            {hero.eyebrow}
          </Badge>
          <div className="flex flex-wrap justify-center gap-3">
            {hero.badges.map((badge) => (
              <Badge key={badge.label} variant="neutral">
                {badge.label}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="max-w-5xl space-y-6"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.06em] text-primary sm:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-secondary sm:text-xl">
            {hero.subheadline}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {hero.ctas.map((cta) => (
            <Button
              asChild
              className="min-w-50"
              key={cta.label}
              size="lg"
              variant={cta.variant === "primary" ? "primary" : "outline"}
            >
              <a href={cta.href}>{cta.label}</a>
            </Button>
          ))}
        </motion.div>

        <motion.div
          className="w-full"
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <div className="screenshot-shell relative mx-auto flex h-105 w-full max-w-6xl flex-col overflow-hidden rounded-8 border border-dashed border-border-strong bg-[linear-gradient(180deg,rgba(8,12,20,0.96),rgba(11,18,31,0.92))] p-4 shadow-[0_28px_80px_rgba(3,7,14,0.56)] sm:h-120">
            <div className="mb-4 flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-4 py-2 text-left text-xs uppercase tracking-[0.22em] text-muted">
              <span className="h-2 w-2 rounded-full bg-accent-secondary" />
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="h-2 w-2 rounded-full bg-white/35" />
              <span className="ml-2">{hero.shellTitle}</span>
            </div>
            <WorkflowSteps
              activeIndex={activeStage.workflowActiveIndex}
              compact
              steps={hero.workflowSteps}
              title={hero.workflowTitle}
            />
            <div className="grid h-full gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="hidden rounded-6 border border-white/6 bg-white/3 p-4 lg:block">
                <WorkflowSteps
                  activeIndex={activeStage.workflowActiveIndex}
                  steps={hero.workflowSteps}
                  title={hero.workflowTitle}
                />
              </div>

              {/* Outer container clips overflow from sliding children */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="sync">
                  {/* Layer 3: background panel frame — last to appear */}
                  <motion.div
                    animate="animate"
                    className="absolute inset-0 flex flex-col overflow-hidden rounded-6 border border-white/8 bg-[linear-gradient(180deg,rgba(14,24,40,0.96),rgba(6,11,19,0.94))] p-6"
                    exit="exit"
                    initial="initial"
                    key={activeStage.id}
                    variants={panelVariants}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(99,179,255,0.8),transparent)]" />
                    <div className="app-grid absolute inset-0 opacity-30" />

                    {/* Layer 2: header text — second */}
                    <motion.div
                      animate="animate"
                      className="relative mb-6 space-y-3 border-b border-white/6 pb-5 text-left"
                      initial="initial"
                      variants={headerVariants}
                    >
                      <p className="text-xs uppercase tracking-[0.26em] text-accent-strong">
                        {activeStage.panelEyebrow}
                      </p>
                      <p className="text-2xl font-semibold tracking-[-0.04em] text-primary">
                        {activeStage.panelTitle}
                      </p>
                      <p className="max-w-3xl leading-7 text-secondary">
                        {activeStage.panelBody}
                      </p>
                    </motion.div>

                    {/* Layer 1: stage body items — first (staggered inside each component) */}
                    <div className="relative my-auto">
                      <StageBody stage={activeStage} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
