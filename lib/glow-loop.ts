/**
 * Shared timing for the pingpong "follow-the-glow" loop used to draw the eye
 * across a sequence of steps or list items (HowItWorks step badges in
 * components/QuickStart/index.tsx, the "i" badges in components/HonestCons.tsx).
 *
 * Keep these here so the two surfaces stay in sync when tuning the rhythm.
 */

/** Dwell time on each step before handing off the glow to the next. */
export const GLOW_LOOP_STEP_MS = 4000;

/** Duration (seconds) of the active/inactive crossfade on each badge. */
export const GLOW_LOOP_FADE_S = 1.0;

/** Easing curve for the glow crossfade. Matches the project's base ease. */
export const GLOW_LOOP_EASE = [0.22, 1, 0.36, 1] as const;
