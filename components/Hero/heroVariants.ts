import type { Variants } from "framer-motion";

// Panel container — only slides (no opacity), so children are visible from mount.
// Each inner layer controls its own opacity independently. Exit is randomised per stage.
export const panelVariants: Variants = {
  initial: { y: 14 },
  animate: {
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Decoded stage panel: exit propagates to card children via staggerChildren
export const decodedPanelVariants: Variants = {
  initial: { y: 14 },
  animate: {
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    transition: { staggerChildren: 0.25, when: "afterChildren" },
  },
};

// Layer 1 — individual items inside stage body (first, staggered per index)
export function itemTransition(index: number) {
  return { duration: 0.75, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] as const };
}
