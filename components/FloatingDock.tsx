"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { GithubLogo } from "@phosphor-icons/react";

const THREADBASE_REPO = "https://github.com/RonenMars/threadbase";

const SCROLL_THRESHOLD_PX = 80;

export function FloatingDock(): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            href={THREADBASE_REPO}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Threadbase on GitHub"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-secondary/95 text-secondary shadow-lg backdrop-blur transition-[transform,border-color,color,box-shadow] duration-300 ease-out hover:border-accent-secondary hover:text-primary hover:shadow-[0_8px_24px_-8px_rgba(240,138,36,0.55)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(240,138,36,0.35),rgba(240,138,36,0)_70%)] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
            />
            <AnimatePresence mode="wait" initial={false}>
              {hovered ? (
                <motion.span
                  key="fill"
                  initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 8 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-center text-accent-secondary"
                >
                  <GithubLogo size={22} weight="fill" />
                </motion.span>
              ) : (
                <motion.span
                  key="regular"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-center"
                >
                  <GithubLogo size={22} weight="regular" />
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
