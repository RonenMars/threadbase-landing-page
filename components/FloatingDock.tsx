"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, DeviceMobile, HardDrives } from "@phosphor-icons/react";

const MOBILE_REPO = "https://github.com/RonenMars/threadbase-mobile";
const STREAMER_REPO = "https://github.com/RonenMars/threadbase-streamer";
const BREW_COMMAND = "brew install threadbase-streamer";

export function FloatingDock(): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyResetRef = useRef<number | null>(null);

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

  useEffect(() => {
    return () => {
      if (copyResetRef.current !== null) {
        window.clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  function handleCopy(): void {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    void navigator.clipboard.writeText(BREW_COMMAND);
    setCopied(true);
    if (copyResetRef.current !== null) {
      window.clearTimeout(copyResetRef.current);
    }
    copyResetRef.current = window.setTimeout(() => {
      setCopied(false);
      copyResetRef.current = null;
    }, 1500);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border bg-bg-secondary/95 px-3 py-2 shadow-lg backdrop-blur"
        >
          <Link
            href={MOBILE_REPO}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Threadbase Mobile on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors hover:bg-bg-tertiary hover:text-primary"
          >
            <DeviceMobile size={18} weight="regular" />
          </Link>
          <Link
            href={STREAMER_REPO}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Threadbase Streamer on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors hover:bg-bg-tertiary hover:text-primary"
          >
            <HardDrives size={18} weight="regular" />
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-border bg-bg-tertiary/60 pl-3 pr-1 py-1">
            <code className="font-mono text-xs text-primary">{BREW_COMMAND}</code>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy brew install command"}
              className="flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-colors hover:bg-bg-secondary hover:text-primary"
            >
              {copied ? (
                <Check size={14} weight="bold" className="text-accent-secondary" />
              ) : (
                <Copy size={14} weight="regular" />
              )}
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
