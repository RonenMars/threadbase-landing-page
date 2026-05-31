"use client";

import { motion } from "framer-motion";

interface ConnectingThreadProps {
  /** Number of card anchor points to connect. Threads draw between consecutive pairs. */
  count: number;
}

/**
 * A gentle S-curve bezier path connecting card number-badges left to right.
 * The path is scaled by the parent's intrinsic SVG viewBox, so absolute
 * positioning of the cards isn't required — the SVG covers the same row as
 * the cards via absolute positioning in the parent.
 */
export function ConnectingThread({ count }: ConnectingThreadProps): React.JSX.Element {
  // viewBox: 1000 wide, 100 tall. Card centers at x = 167, 500, 833.
  // S-curve: up then down between cards (control points offset y).
  const cardXs = [167, 500, 833];
  const y = 50;
  // First segment: card 1 → card 2 with control points pulled UP
  // Second segment: card 2 → card 3 with control points pulled DOWN
  const path = [
    `M ${cardXs[0]} ${y}`,
    `C ${cardXs[0] + 80} ${y - 30}, ${cardXs[1] - 80} ${y - 30}, ${cardXs[1]} ${y}`,
    `C ${cardXs[1] + 80} ${y + 30}, ${cardXs[2] - 80} ${y + 30}, ${cardXs[2]} ${y}`,
  ].join(" ");

  if (count !== 3) {
    // Component only supports 3 cards in the current spec. Fail safe.
    return <></>;
  }

  return (
    <svg
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-4 hidden h-12 w-full md:block"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="how-thread-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#63b3ff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f08a24" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        fill="none"
        stroke="url(#how-thread-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </svg>
  );
}
