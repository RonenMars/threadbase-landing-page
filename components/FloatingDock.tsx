"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { GithubLogo } from "@phosphor-icons/react";

const THREADBASE_REPO = "https://github.com/RonenMars/threadbase";

export function FloatingDock(): React.JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the dock once the hero section has scrolled out of view.
    const hero = document.querySelector('[role="banner"]');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
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
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-secondary/95 text-secondary shadow-lg backdrop-blur transition-colors hover:border-accent-primary hover:text-primary"
          >
            <GithubLogo size={22} weight="regular" />
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
