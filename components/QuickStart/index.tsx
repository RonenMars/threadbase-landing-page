"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { HowItWorksContent, QuickStartContent } from "@/lib/content";
import { fadeUp } from "@/components/motion";
import {
  GLOW_LOOP_DARK_MS,
  GLOW_LOOP_EASE,
  GLOW_LOOP_FADE_MS,
  GLOW_LOOP_STEP_MS,
} from "@/lib/glow-loop";
import { Card } from "@/components/ui/card";

interface QuickStartProps {
  content: QuickStartContent;
  howItWorks?: HowItWorksContent;
}

// Pingpong sequence over the 3 step badges: 0 → 1 → 2 → 1 → 0 → 1 → ...
const STEP_PINGPONG = [0, 1, 2, 1];

export function QuickStart({
  content,
  howItWorks,
}: QuickStartProps): React.JSX.Element {
  const reducedMotion = useReducedMotion();
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const stepsInView = useInView(stepsRef, { once: false, amount: 0.3 });
  const [activeStep, setActiveStep] = useState<number>(-1);
  const displayActive =
    reducedMotion || !howItWorks || !stepsInView ? -1 : activeStep;

  useEffect(() => {
    if (reducedMotion || !howItWorks || !stepsInView) return;
    // Sequence per slot: hold the badge active for STEP_MS, then go dark for
    // DARK_MS, then advance to the next slot. Start fresh from slot 0 every
    // time the steps section scrolls into view.
    let i = 0;
    const timers: number[] = [];
    const schedule = () => {
      setActiveStep(STEP_PINGPONG[i]);
      timers.push(
        window.setTimeout(() => {
          setActiveStep(-1);
          timers.push(
            window.setTimeout(() => {
              i = (i + 1) % STEP_PINGPONG.length;
              schedule();
            }, GLOW_LOOP_DARK_MS),
          );
        }, GLOW_LOOP_STEP_MS),
      );
    };
    schedule();
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [reducedMotion, howItWorks, stepsInView]);
  return (
    <section
      id="quick-start"
      className="px-6 py-16 sm:px-8 lg:px-10"
      aria-labelledby="quick-start-heading"
    >
      <div className="container-shell">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mx-auto max-w-3xl"
        >
          {howItWorks ? (
            <div
              ref={stepsRef}
              id="how-it-works"
              aria-labelledby="how-it-works-heading"
              className="mb-12"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.26em] text-muted">
                {howItWorks.eyebrow}
              </p>
              <h2
                id="how-it-works-heading"
                className="text-balance text-2xl font-semibold tracking-[-0.04em] text-primary sm:text-3xl"
              >
                {howItWorks.heading}
              </h2>
              <ol className="mt-5 grid gap-3 sm:grid-cols-3">
                {howItWorks.steps.map((step, i) => {
                  const isActive = i === displayActive;
                  return (
                    <li
                      key={step.title}
                      className="flex items-start gap-3 rounded-2xl border border-white/6 bg-bg-secondary/40 p-3"
                    >
                      <motion.span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-bg-secondary text-[12px]"
                        aria-hidden="true"
                        animate={{
                          scale: isActive ? 1.15 : 1,
                          boxShadow: isActive
                            ? "0 0 18px 4px rgba(240,138,36,0.45)"
                            : "0 0 0px 0px rgba(240,138,36,0)",
                          color: isActive ? "#f08a24" : "#b5e3ff",
                          borderColor: isActive
                            ? "rgba(240,138,36,0.55)"
                            : "rgba(116,151,199,0.18)",
                        }}
                        transition={{
                          duration: GLOW_LOOP_FADE_MS / 1000,
                          ease: GLOW_LOOP_EASE,
                        }}
                      >
                        {i + 1}
                      </motion.span>
                      <span className="text-sm leading-snug text-secondary">
                        {step.title}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-4 text-xs italic text-muted">
                {howItWorks.trustNote}
              </p>
            </div>
          ) : null}

          {content.eyebrow ? (
            <p className="mb-3 text-xs uppercase tracking-[0.26em] text-muted">
              {content.eyebrow}
            </p>
          ) : null}
          <h2
            id="quick-start-heading"
            className="text-balance text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl lg:text-5xl"
          >
            {content.heading}
          </h2>

          <Card className="tech-card mt-10 p-6">
            <pre className="terminal-block overflow-x-auto rounded-3xl border border-white/6 p-5 leading-7 text-primary">
              <code className="font-mono">
                {content.steps.map((line, index) => {
                  if (line.length === 0) {
                    return (
                      <span className="block h-4" key={`qs-${index}`} />
                    );
                  }
                  const lineClassName = line.startsWith("#")
                    ? "text-emerald-300/80"
                    : "text-primary";
                  return (
                    <span
                      className={`block whitespace-pre-wrap ${lineClassName}`}
                      key={`qs-${index}`}
                    >
                      {line}
                    </span>
                  );
                })}
              </code>
            </pre>
          </Card>

          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary">
            {content.links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
