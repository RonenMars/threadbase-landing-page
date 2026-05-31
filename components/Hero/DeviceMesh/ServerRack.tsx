"use client";

import { motion } from "framer-motion";

export function ServerRack(): React.JSX.Element {
  return (
    <svg viewBox="0 0 60 100" className="h-full w-auto" aria-hidden="true">
      {/* rack outline */}
      <rect
        x="6"
        y="6"
        width="48"
        height="88"
        rx="3"
        fill="none"
        stroke="#9fb0c9"
        strokeWidth="1.5"
      />
      {/* 3 LEDs */}
      <circle cx="20" cy="78" r="3" fill="#f08a24" />
      <motion.circle
        cx="30"
        cy="78"
        r="3"
        fill="#63b3ff"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="40"
        cy="78"
        r="3"
        fill="#63b3ff"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 0.4 }}
      />
    </svg>
  );
}
