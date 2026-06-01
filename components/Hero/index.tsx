"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Check, Copy } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/lib/content";
import { GlitchTitle } from "./GlitchTitle";

interface HeroProps {
  hero: HeroContent;
}

const COPIED_RESET_MS = 1500;

export function Hero({ hero }: HeroProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const copyResetRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetRef.current !== null) {
        window.clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  function handleCopyOutlineCta(label: string): void {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    void navigator.clipboard.writeText(label);
    setCopied(true);
    if (copyResetRef.current !== null) {
      window.clearTimeout(copyResetRef.current);
    }
    copyResetRef.current = window.setTimeout(() => {
      setCopied(false);
      copyResetRef.current = null;
    }, COPIED_RESET_MS);
  }

  return (
    <motion.section
      animate="visible"
      role="banner"
      aria-labelledby="hero-headline"
      className="relative h-screen flex items-center justify-center overflow-hidden px-6 pb-24 pt-10 sm:px-8 lg:px-10 lg:pb-32 lg:pt-14"
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

      <div className="container-shell relative z-10 flex flex-col items-center gap-8 text-center">
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
          {hero.subheadline ? (
            <p className="mx-auto max-w-3xl mt-2.5 text-[1.2rem] text-white">
              {hero.subheadline}
            </p>
          ) : null}
        </motion.div>

        <motion.ul
          className="flex flex-wrap items-center justify-center gap-3"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {hero.badges.map((badge) => (
            <li key={badge.label}>
              <Badge variant="neutral">{badge.label}</Badge>
            </li>
          ))}
        </motion.ul>

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
          {hero.ctas.map((cta) =>
            cta.variant === "primary" ? (
              <Button
                key={cta.label}
                render={<Link href={cta.href} />}
                nativeButton={false}
                className="min-w-50"
                size="lg"
                variant="primary"
              >
                {cta.label}
              </Button>
            ) : (
              <Button
                key={cta.label}
                onClick={() => handleCopyOutlineCta(cta.label)}
                aria-label={
                  copied ? "Copied to clipboard" : `Copy: ${cta.label}`
                }
                className={`min-w-50 motion-safe:active:scale-[0.97] ${
                  copied
                    ? "border-accent-secondary shadow-[0_0_0_3px_rgba(240,138,36,0.18)]"
                    : ""
                }`}
                size="lg"
                variant="outline"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center"
                    >
                      <Check
                        size={16}
                        weight="bold"
                        className="text-accent-secondary"
                      />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center"
                    >
                      <Copy size={16} weight="regular" />
                    </motion.span>
                  )}
                </AnimatePresence>
                <span>{cta.label}</span>
              </Button>
            ),
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
