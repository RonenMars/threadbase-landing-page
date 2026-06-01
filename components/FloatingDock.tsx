"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { GithubLogo } from "@phosphor-icons/react";

const THREADBASE_REPO = "https://github.com/RonenMars/threadbase";

const SCROLL_THRESHOLD_PX = 80;

export function FloatingDock(): React.JSX.Element {
  const [visible, setVisible] = useState(false);

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
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-secondary/95 text-secondary shadow-lg backdrop-blur transition-colors hover:border-accent-primary hover:text-primary"
          >
            <GithubLogo size={22} weight="regular" />
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
