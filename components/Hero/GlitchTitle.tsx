"use client";

import { useEffect, useRef } from "react";

interface GlitchTitleProps {
  text: string;
  className?: string;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function GlitchTitle({ text, className }: GlitchTitleProps) {
  const elRef = useRef<HTMLHeadingElement>(null);

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

    const SPEED_MIN = 0.06;
    const SPEED_MAX = 0.22;
    const BAND_MIN  = 12;
    const BAND_MAX  = 40;

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

    const handleExit = (nextMustExitBottom: boolean) => {
      speed = rand(SPEED_MIN, SPEED_MAX);
      bandH = rand(BAND_MIN, BAND_MAX);
      if (Math.random() < 0.35) hiddenFrames = Math.round(rand(30, 110));

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

  return (
    <h1
      ref={elRef}
      className={className}
      data-text={text}
      style={{ "--gt": "0px", "--gb": "0px" } as React.CSSProperties}
    >
      {text}
    </h1>
  );
}
