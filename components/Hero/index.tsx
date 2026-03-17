"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/lib/content";
import { GlitchTitle } from "./GlitchTitle";
import { StageBody } from "./StageBody";
import { WorkflowSteps } from "./WorkflowSteps";
import { panelVariants, decodedPanelVariants } from "./heroVariants";

interface HeroProps {
  hero: HeroContent;
}

export function Hero({ hero }: HeroProps): React.JSX.Element {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const lastStageIndex = hero.shellStages.length - 1;
  const activeStage = hero.shellStages[activeStageIndex];
  const isFirstRender = useRef(true);

  // Generate a fresh random exit animation each time the active stage changes
  const exitAnimation = useMemo(() => {
    const y = -(22 + Math.random() * 18);
    const x = (Math.random() - 0.5) * 16;
    const rotate = (Math.random() - 0.5) * 5;
    const scale = 0.93 + Math.random() * 0.05;
    const duration = 0.55 + Math.random() * 0.15;
    return {
      opacity: 0,
      y,
      x,
      rotate,
      scale,
      transition: { duration, ease: [0.4, 0, 1, 1] as const },
    };
  }, [activeStageIndex]);

  useEffect(() => {
    const currentStage = hero.shellStages[activeStageIndex];
    if (activeStageIndex >= lastStageIndex || currentStage.durationMs === undefined) {
      return;
    }

    // On first render, wait for the hero entry animation to finish before starting
    const initialDelay = isFirstRender.current ? 1500 : 0;
    isFirstRender.current = false;

    const timeoutId = window.setTimeout(() => {
      setActiveStageIndex((i) => i + 1);
    }, currentStage.durationMs + initialDelay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeStageIndex, hero.shellStages, lastStageIndex]);

  function handleStepClick(stepIndex: number): void {
    setActiveStageIndex(stepIndex);
  }

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
          <GlitchTitle
            text={hero.headline}
            className="glitch-title text-balance text-5xl font-semibold tracking-[-0.06em] text-primary sm:text-6xl lg:text-7xl"
          />
          <p className="mx-auto max-w-3xl mt-2.5 text-[1.2rem] text-white">
            // {hero.subheadline}
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
              render={<a href={cta.href} />}
              nativeButton={false}
              className="min-w-50"
              key={cta.label}
              size="lg"
              variant={cta.variant === "primary" ? "primary" : "outline"}
            >
              {cta.label}
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
          <div id="screenshot-shell" className="screenshot-shell relative mx-auto flex h-105 w-full max-w-6xl flex-col overflow-hidden rounded-4xl border border-dashed border-border-strong bg-[linear-gradient(180deg,rgba(8,12,20,0.96),rgba(11,18,31,0.92))] p-4 shadow-[0_28px_80px_rgba(3,7,14,0.56)] sm:h-120">
            <div className="mb-4 flex items-center gap-2 rounded-full border border-white/8 bg-white/3 px-4 py-2 text-left text-xs uppercase tracking-[0.22em] text-muted">
              <span className="h-2 w-2 rounded-full bg-accent-secondary" />
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="h-2 w-2 rounded-full bg-white/35" />
              <span className="ml-2">{hero.shellTitle}</span>
              <span className="ml-1 animate-pulse opacity-50">▋</span>
            </div>
            <WorkflowSteps
              activeIndex={activeStage.workflowActiveIndex}
              compact
              onStepClick={handleStepClick}
              steps={hero.workflowSteps}
              title={hero.workflowTitle}
            />
            <div className="grid h-full gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="hidden rounded-3xl border border-white/6 bg-white/3 p-4 lg:block">
                <WorkflowSteps
                  activeIndex={activeStage.workflowActiveIndex}
                  onStepClick={handleStepClick}
                  steps={hero.workflowSteps}
                  title={hero.workflowTitle}
                />
              </div>

              {/* Outer container clips overflow from sliding children */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {/* Panel layout container — y-only animation so children are visible from mount */}
                  <motion.div
                    animate="animate"
                    className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(14,24,40,0.96),rgba(6,11,19,0.94))] p-6"
                    exit={activeStage.id === "decoded" ? "exit" : exitAnimation}
                    initial="initial"
                    key={activeStage.id}
                    variants={activeStage.id === "decoded" ? decodedPanelVariants : panelVariants}
                  >
                    <div className="app-grid absolute inset-0 opacity-30" />

                    {/* Header — decoded: after cards (step 3); others: early */}
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className="relative mb-6 space-y-3 border-b border-white/6 pb-5 text-left"
                      initial={{ opacity: 0, y: 18 }}
                      transition={{
                        duration: 0.7,
                        delay: activeStage.id === "decoded" ? 0.85 : 0.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
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

                    {/* Body — decoded: cards handle their own layered timing */}
                    <div className="relative my-auto">
                      <StageBody stage={activeStage} />
                    </div>

                    {/* Progress bar — rendered last so it sits on top of all content */}
                    <motion.div
                      animate={{ scaleX: 1, opacity: 0.55 }}
                      className="absolute inset-x-0 top-0 h-px origin-left bg-[linear-gradient(90deg,transparent_10%,rgba(99,179,255,0.9)_50%,transparent_90%)]"
                      initial={{ scaleX: 0, opacity: 1 }}
                      transition={{
                        duration: (activeStage.durationMs ?? 6000) / 1000,
                        ease: "linear",
                      }}
                    />
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
