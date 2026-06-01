"use client";

import { motion } from "framer-motion";

interface ThreadProps {
  /** SVG path d="..." string defining the line shape. */
  d: string;
  /** Unique id used for the gradient. */
  id: string;
  /** When true, the thread carries a flowing orange pulse from laptop side → phone side. */
  pulse?: boolean;
  /** Delay before the thread draws in. */
  drawDelay?: number;
}

export function Thread({ d, id, pulse = false, drawDelay = 0 }: ThreadProps): React.JSX.Element {
  return (
    <g>
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
    </g>
  );
}
