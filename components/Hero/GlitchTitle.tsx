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
    let hiddenFrames = 0;
    let started = false;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!started) return;

      if (hiddenFrames > 0) {
        hiddenFrames--;
        setClip(0, 0);
        return;
      }

      top += speed * dir;
      setClip(top, top + bandH);

      const exitedBottom = dir ===  1 && top        > elHeight + 5;
      const exitedTop    = dir === -1 && top + bandH < 0;

      if (exitedBottom || exitedTop) {
        // Randomise speed and band height — direction is set by the exit edge
        speed = rand(SPEED_MIN, SPEED_MAX);
        bandH = rand(BAND_MIN, BAND_MAX);

        if (Math.random() < 0.35) {
          hiddenFrames = Math.round(rand(30, 110));
        }

        // Continue from the same edge — no teleportation to the opposite side
        if (exitedBottom) { dir = -1; top = elHeight + 5; }
        else              { dir =  1; top = -bandH; }
      }
    };

    const timeoutId = window.setTimeout(() => {
      top     = -bandH;
      dir     = 1;
      started = true;
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
