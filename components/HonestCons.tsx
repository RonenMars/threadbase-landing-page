"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import type { HonestCon, SectionContent } from "@/lib/content";
import {
  GLOW_LOOP_DARK_MS,
  GLOW_LOOP_EASE,
  GLOW_LOOP_FADE_MS,
  GLOW_LOOP_STEP_MS,
} from "@/lib/glow-loop";

interface HonestConsProps {
  section: SectionContent;
  items: HonestCon[];
}

// Pingpong over the 4 cons: 0 → 1 → 2 → 3 → 2 → 1 → 0 → 1 → ...
// (Slowed-down ambient glow that matches the HowItWorks steps pattern.)
const PINGPONG_4 = [0, 1, 2, 3, 2, 1];

export function HonestCons({
  section,
  items,
}: HonestConsProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const reducedMotion = useReducedMotion();
  const listRef = useRef<HTMLUListElement | null>(null);
  const listInView = useInView(listRef, { once: false, amount: 0.3 });
  const [activeCon, setActiveCon] = useState<number>(-1);

  useEffect(() => {
    if (reducedMotion || !listInView) {
      setActiveCon(-1);
      return;
    }
    // Sequence per slot: hold the badge active for STEP_MS, then go dark for
    // DARK_MS, then advance to the next slot. Start fresh from slot 0 every
    // time the list scrolls into view.
    let i = 0;
    const timers: number[] = [];
    const schedule = () => {
      setActiveCon(PINGPONG_4[i]);
      timers.push(
        window.setTimeout(() => {
          setActiveCon(-1);
          timers.push(
            window.setTimeout(() => {
              i = (i + 1) % PINGPONG_4.length;
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
  }, [reducedMotion, listInView]);

  return (
    <motion.section
      animate={inView ? "visible" : "hidden"}
      className="px-6 py-16 sm:px-8 lg:px-10"
      initial="hidden"
      ref={ref}
      variants={fadeUp}
    >
      <div className="mx-auto max-w-3xl rounded-4xl border border-border bg-[linear-gradient(180deg,rgba(14,19,29,0.92),rgba(10,15,23,0.9))] p-8 shadow-[0_18px_45px_rgba(3,7,14,0.34)]">
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-secondary sm:text-3xl">
          {section.heading}
        </h2>
        {section.description ? (
          <p className="mt-4 text-base leading-7 text-muted">
            {section.description}
          </p>
        ) : null}

        <motion.ul
          ref={listRef}
          className="mt-8 space-y-5"
          variants={staggerContainer}
        >
          {items.map((item, i) => {
            const isActive = i === activeCon;
            return (
              <motion.li
                className="flex gap-4 rounded-4-5xl border border-white/6 bg-white/2 px-5 py-4"
                key={item.title}
                variants={staggerItem}
              >
                <motion.span
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong bg-accent/10"
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
                  i
                </motion.span>
                <div>
                  <p className="font-medium text-primary">
                    {item.title}
                  </p>
                  <p className="mt-2 leading-7 text-secondary">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}
