"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { HeroContent } from "@/lib/content";
import { staggerContainer, staggerItem } from "@/components/motion";
import { GlitchTitle } from "./GlitchTitle";

interface HeroProps {
  hero: HeroContent;
}

export function Hero({ hero }: HeroProps): React.JSX.Element {
  function handleCopyOutlineCta(label: string): void {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(label);
    }
  }

  return (
    <section
      role="banner"
      aria-labelledby="hero-headline"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-primary px-6 py-24"
    >
      {/* Background orbs — kept here; will be scoped page-wide in Milestone 9 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent-primary opacity-35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-16 h-96 w-96 rounded-full bg-accent-secondary opacity-35 blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.p
          variants={staggerItem}
          className="mb-6 inline-flex items-center rounded-full border border-border bg-bg-tertiary/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-secondary"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.div variants={staggerItem} className="w-full">
          <GlitchTitle text={hero.headline} />
        </motion.div>

        <motion.p
          variants={staggerItem}
          className="mt-6 font-mono text-sm text-accent-strong sm:text-base"
        >
          {hero.subheadline}
        </motion.p>

        <motion.ul
          variants={staggerItem}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {hero.badges.map((badge) => (
            <li
              key={badge.label}
              className="rounded-full border border-border bg-bg-tertiary/30 px-3 py-1 text-xs text-secondary"
            >
              {badge.label}
            </li>
          ))}
        </motion.ul>

        <motion.div
          variants={staggerItem}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          {hero.ctas.map((cta) =>
            cta.variant === "primary" ? (
              <Link
                key={cta.label}
                href={cta.href}
                className="rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-primary transition-transform hover:scale-[1.02]"
              >
                {cta.label}
              </Link>
            ) : (
              <button
                key={cta.label}
                type="button"
                onClick={() => handleCopyOutlineCta(cta.label)}
                className="rounded-full border border-border bg-bg-tertiary/40 px-6 py-3 font-mono text-sm text-primary transition-colors hover:border-accent-primary"
              >
                {cta.label}
              </button>
            ),
          )}
        </motion.div>

        {/* Milestone 8 will mount the DeviceMesh below the CTAs */}
        <div
          id="hero-centerpiece"
          aria-hidden="true"
          className="mt-16 h-px w-full"
        />
      </motion.div>
    </section>
  );
}
