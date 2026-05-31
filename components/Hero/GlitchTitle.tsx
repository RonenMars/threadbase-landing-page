"use client";

import { useEffect, useRef, useState } from "react";

interface GlitchTitleProps {
  text: string;
  className?: string;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/**
 * Split a headline like "Your terminal. In your pocket. Live." into
 * ["Your terminal.", "In your pocket.", "Live."]. Sentences are matched
 * greedily up to and including a trailing period; trailing whitespace is
 * trimmed.
 */
function splitSentences(text: string): string[] {
  const matches = text.match(/[^.]+\./g);
  if (matches) {
    return matches.map((s) => s.trim()).filter(Boolean);
  }
  return [text];
}

export function GlitchTitle({ text, className }: GlitchTitleProps) {
  const elRef = useRef<HTMLHeadingElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let rafId: number;
    let elHeight = el.getBoundingClientRect().height || 200;

    const onResize = () => { elHeight = el.getBoundingClientRect().height; };
    window.addEventListener("resize", onResize);

    const setClip = (t: number, b: number) => {
      el.style.setProperty("--gt", `${Math.round(t)}px`);
      el.style.setProperty("--gb", `${Math.round(b)}px`);
    };

    // TODO(post-M7): bump sweep speed for new short headline
    const SPEED_MIN = 0.32;
    const SPEED_MAX = 0.52;
    const BAND_MIN  = 6;
    const BAND_MAX  = 12;

    const BURST_SPEED_MIN = 1.4;
    const BURST_SPEED_MAX = 2.4;
    const BURST_DURATION  = 1800; // ms
    let burstUntil = 0;

    let top    = 0;
    let bandH  = BAND_MAX;
    let speed  = 0.12;
    let dir: 1 | -1 = 1;
    let hiddenFrames   = 0;
    // true  = entered from top   → must exit at bottom
    // false = entered from bottom → must exit at top
    let mustExitBottom = true;
    let started = false;
    let sweepCount = 0;

    // Per-sweep optional mid-flip state
    let doFlip    = false;
    let hasFlipped = false;
    let flipAt    = 0; // top value at which the flip triggers

    const setupFlip = () => {
      sweepCount++;
      // First two sweeps are always clean; after that 30 % chance of a single flip
      doFlip     = sweepCount > 2 && Math.random() < 0.30;
      hasFlipped = false;
      if (doFlip) {
        // Random position — 10 % to 85 % of the element height
        flipAt = rand(elHeight * 0.10, elHeight * 0.85);
      }
    };

    const isBurst = () => performance.now() < burstUntil;

    const handleExit = (nextMustExitBottom: boolean) => {
      if (isBurst()) {
        speed = rand(BURST_SPEED_MIN, BURST_SPEED_MAX);
        bandH = rand(BAND_MIN, BAND_MAX);
        hiddenFrames = 0;
      } else {
        speed = rand(SPEED_MIN, SPEED_MAX);
        bandH = rand(BAND_MIN, BAND_MAX);
        if (Math.random() < 0.35) hiddenFrames = Math.round(rand(20, 75));
      }

      mustExitBottom = nextMustExitBottom;
      if (nextMustExitBottom) {
        dir = 1;
        top = -bandH;
      } else {
        dir = -1;
        top = elHeight + 5;
      }
      setupFlip();
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!started) return;

      if (hiddenFrames > 0) {
        hiddenFrames--;
        setClip(0, 0);
        return;
      }

      // Single mid-sweep flip at a random position (only after first 2 sweeps, 30 % chance)
      if (doFlip && !hasFlipped) {
        const triggerDown = mustExitBottom  && dir ===  1 && top          >= flipAt;
        const triggerUp   = !mustExitBottom && dir === -1 && top + bandH  <= flipAt;
        if (triggerDown || triggerUp) {
          dir = dir === 1 ? -1 : 1;
          hasFlipped = true;
        }
      }

      top += speed * dir;
      setClip(top, top + bandH);

      if (mustExitBottom) {
        // Only valid exit is the bottom; bounce off the top wall if flipped back
        if (dir === -1 && top + bandH < 0) {
          dir = 1;
          top = -bandH;
        } else if (top > elHeight + 5) {
          handleExit(false);
        }
      } else {
        // Only valid exit is the top; bounce off the bottom wall if flipped back
        if (dir === 1 && top > elHeight + 5) {
          dir = -1;
          top = elHeight + 5;
        } else if (top + bandH < 0) {
          handleExit(true);
        }
      }
    };

    const timeoutId = window.setTimeout(() => {
      burstUntil     = performance.now() + BURST_DURATION;
      speed          = rand(BURST_SPEED_MIN, BURST_SPEED_MAX);
      top            = -bandH;
      dir            = 1;
      mustExitBottom = true;
      setupFlip();   // sweepCount becomes 1 — no flip on first pass
      started        = true;
    }, 400);

    rafId = requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      setClip(0, 0);
    };
  }, []);

  const sentences = splitSentences(text);
  const lastIndex = sentences.length - 1;

  return (
    <h1
      ref={elRef}
      id="hero-headline"
      className={className}
      data-text={text}
      style={{ "--gt": "0px", "--gb": "0px" } as React.CSSProperties}
    >
      {sentences.map((sentence, i) => {
        const isLast = i === lastIndex;
        const spanClass = isLast ? "text-accent-secondary" : undefined;
        return (
          <span key={`${sentence}-${i}`}>
            <span className={spanClass}>{sentence}</span>
            {i < lastIndex && (isMobile ? <br /> : <span> </span>)}
          </span>
        );
      })}
    </h1>
  );
}
