"use client";

import { useEffect, useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "./Phone";
import { Laptop } from "./Laptop";
import { ServerRack } from "./ServerRack";
import { StaticScene } from "./StaticScene";
import { DESKTOP_BEATS, MOBILE_BEATS, PTY_LINES } from "./sceneTimeline";
import { usePtyTypewriter } from "./usePtyTypewriter";

export function DeviceMesh(): React.JSX.Element {
  const reducedMotion = useReducedMotion();
  const [replayKey, setReplayKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(max-width: 639px)");
    function update(): void {
      setIsMobile(mq.matches);
    }
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reducedMotion) {
    return (
      <div className="relative mt-16 w-full">
        <StaticScene />
      </div>
    );
  }

  return (
    <div key={replayKey} className="relative mt-16 w-full">
      {isMobile ? (
        <DeviceMeshMobile />
      ) : (
        <DeviceMeshDesktop onSettle={() => undefined} />
      )}

      {/* Replay button — shown after the animation duration */}
      <ReplayButton
        delaySec={(isMobile ? MOBILE_BEATS.replayShow.start : DESKTOP_BEATS.replayShow.start) + 0.1}
        onClick={() => setReplayKey((k) => k + 1)}
      />
    </div>
  );
}

function DeviceMeshDesktop({
  onSettle,
}: {
  onSettle: () => void;
}): React.JSX.Element {
  const [streamEnabled, setStreamEnabled] = useState(false);
  const phoneLitAtMs = DESKTOP_BEATS.connect.start * 1000;
  const streamAtMs = DESKTOP_BEATS.stream.start * 1000;

  useEffect(() => {
    const t1 = window.setTimeout(() => setStreamEnabled(true), streamAtMs);
    const t2 = window.setTimeout(onSettle, DESKTOP_BEATS.settle.end * 1000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onSettle, streamAtMs]);

  const ptyOutput = usePtyTypewriter(PTY_LINES.phoneAndLaptop1, streamEnabled);

  // Camera zoom-out via Framer Motion scale on the wrapper
  return (
    <motion.div
      className="relative mx-auto aspect-video w-full max-w-3xl"
      initial={{ scale: 1.25 }}
      animate={{ scale: 1 }}
      transition={{
        duration: DESKTOP_BEATS.pullBack.end - DESKTOP_BEATS.pullBack.start,
        delay: DESKTOP_BEATS.pullBack.start,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Threads SVG layer */}
      <svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Thread: laptop 1 → phone */}
        <ThreadBeat
          id="thread-1"
          d="M 320 280 Q 430 260 500 280"
          delaySec={DESKTOP_BEATS.connect.start}
          pulseAfterSec={DESKTOP_BEATS.stream.start}
        />
        {/* Thread: laptop 2 → phone (revealed in pullBack) */}
        <ThreadBeat
          id="thread-2"
          d="M 200 380 Q 350 320 500 280"
          delaySec={DESKTOP_BEATS.pullBack.start + 0.15}
          pulseAfterSec={DESKTOP_BEATS.settle.start}
        />
        {/* Thread: laptop 3 → phone */}
        <ThreadBeat
          id="thread-3"
          d="M 200 180 Q 350 230 500 280"
          delaySec={DESKTOP_BEATS.pullBack.start + 0.3}
          pulseAfterSec={DESKTOP_BEATS.settle.start + 0.2}
        />
        {/* Thread: server-rack → phone */}
        <ThreadBeat
          id="thread-4"
          d="M 920 100 Q 700 180 500 280"
          delaySec={DESKTOP_BEATS.pullBack.start + 0.45}
          pulseAfterSec={DESKTOP_BEATS.settle.start + 0.4}
        />
      </svg>

      {/* Primary laptop (beat A — visible from t=0) */}
      <div className="absolute left-[18%] top-[40%] h-32 w-auto">
        <Laptop scale={1}>{ptyOutput}</Laptop>
      </div>

      {/* Phone (visible from t=0, screen lights up at connect) */}
      <PhoneBeat litAfterSec={phoneLitAtMs / 1000} ptyOutput={ptyOutput} />

      {/* Secondary laptops + server (fade in during pullBack) */}
      <DeviceFadeIn
        delaySec={DESKTOP_BEATS.pullBack.start + 0.15}
        className="absolute left-[6%] top-[68%] h-24 w-auto"
      >
        <Laptop scale={0.7}>{PTY_LINES.laptop2.join("\n")}</Laptop>
      </DeviceFadeIn>
      <DeviceFadeIn
        delaySec={DESKTOP_BEATS.pullBack.start + 0.3}
        className="absolute left-[6%] top-[12%] h-24 w-auto"
      >
        <Laptop scale={0.7}>{PTY_LINES.laptop3.join("\n")}</Laptop>
      </DeviceFadeIn>
      <DeviceFadeIn
        delaySec={DESKTOP_BEATS.pullBack.start + 0.45}
        className="absolute right-[4%] top-[10%] h-20 w-auto"
      >
        <ServerRack />
      </DeviceFadeIn>
    </motion.div>
  );
}

function DeviceMeshMobile(): React.JSX.Element {
  const [streamEnabled, setStreamEnabled] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(
      () => setStreamEnabled(true),
      MOBILE_BEATS.stream.start * 1000,
    );
    return () => window.clearTimeout(t);
  }, []);

  const ptyOutput = usePtyTypewriter(PTY_LINES.phoneAndLaptop1, streamEnabled);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <ThreadBeat
          id="m-thread-1"
          d="M 130 350 Q 250 280 350 200"
          delaySec={MOBILE_BEATS.connect.start}
          pulseAfterSec={MOBILE_BEATS.stream.start}
        />
      </svg>
      <div className="absolute left-[8%] top-[55%] h-24 w-auto">
        <Laptop scale={1}>{ptyOutput}</Laptop>
      </div>
      <PhoneBeat
        litAfterSec={MOBILE_BEATS.connect.start}
        ptyOutput={ptyOutput}
        className="absolute right-[8%] top-[20%] h-44 w-auto"
      />
    </div>
  );
}

function ThreadBeat({
  id,
  d,
  delaySec,
  pulseAfterSec,
}: {
  id: string;
  d: string;
  delaySec: number;
  pulseAfterSec: number;
}): React.JSX.Element {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setPulse(true), pulseAfterSec * 1000);
    return () => window.clearTimeout(t);
  }, [pulseAfterSec]);

  return (
    <ThreadInner id={id} d={d} drawDelay={delaySec} pulse={pulse} />
  );
}

// Inline alias to avoid name collision with the Thread.tsx default export.
// Renders the same shape (gradient line + optional flowing pulse) but inlined
// here so it can be a child of an outer <svg> without a name clash.
function ThreadInner({
  id,
  d,
  drawDelay,
  pulse,
}: {
  id: string;
  d: string;
  drawDelay: number;
  pulse: boolean;
}): React.JSX.Element {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#63b3ff" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#f08a24" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#f08a24" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: drawDelay }}
      />
      {pulse ? (
        <motion.path
          d={d}
          fill="none"
          stroke="#f08a24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 60"
          animate={{ strokeDashoffset: [0, -64] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          opacity={0.6}
        />
      ) : null}
    </>
  );
}

function PhoneBeat({
  litAfterSec,
  ptyOutput,
  className,
}: {
  litAfterSec: number;
  ptyOutput: string;
  className?: string;
}): React.JSX.Element {
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setLit(true), litAfterSec * 1000);
    return () => window.clearTimeout(t);
  }, [litAfterSec]);

  return (
    <div className={className ?? "absolute left-[55%] top-[28%] h-44 w-auto"}>
      <Phone screenLit={lit}>{lit ? ptyOutput : null}</Phone>
    </div>
  );
}

function DeviceFadeIn({
  delaySec,
  className,
  children,
}: {
  delaySec: number;
  className: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delaySec, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ReplayButton({
  delaySec,
  onClick,
}: {
  delaySec: number;
  onClick: () => void;
}): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), delaySec * 1000);
    return () => window.clearTimeout(t);
  }, [delaySec]);

  if (!visible) return <></>;

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-border bg-bg-secondary/60 px-3 py-1 text-xs text-secondary transition-colors hover:border-accent-primary hover:text-primary"
    >
      <ArrowCounterClockwise size={14} weight="regular" />
      Replay
    </button>
  );
}
