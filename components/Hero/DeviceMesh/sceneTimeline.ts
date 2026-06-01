/**
 * Single source of truth for the device-mesh animation timeline.
 * Beat letters correspond to the spec (A-F). Times are in seconds from t=0.
 */

export interface BeatTimings {
  pair: { start: number; end: number };
  connect: { start: number; end: number };
  stream: { start: number; end: number };
  pullBack: { start: number; end: number };
  settle: { start: number; end: number };
  replayShow: { start: number };
}

export const DESKTOP_BEATS: BeatTimings = {
  pair: { start: 0.0, end: 0.8 },
  connect: { start: 0.8, end: 1.4 },
  stream: { start: 1.4, end: 3.0 },
  pullBack: { start: 3.0, end: 4.5 },
  settle: { start: 4.5, end: 5.2 },
  replayShow: { start: 5.2 },
};

export const MOBILE_BEATS: BeatTimings = {
  pair: { start: 0.0, end: 0.5 },
  connect: { start: 0.5, end: 1.0 },
  stream: { start: 1.0, end: 3.0 },
  pullBack: { start: 3.0, end: 3.0 }, // no-op on mobile
  settle: { start: 3.0, end: 3.0 }, // no-op on mobile
  replayShow: { start: 3.0 },
};

export const PTY_LINES = {
  phoneAndLaptop1: [
    "$ npm test",
    "> running auth-refresh.spec.ts",
    "✓ 12 passed",
    "Claude: All tests pass. Want me to commit? [y/n]",
  ],
  laptop2: [
    "$ pnpm migrate",
    "Migration 0042 applied successfully",
    "Claude: Run the tests now?",
  ],
  laptop3: [
    "$ docker compose up",
    "Container app_db ... Started",
    "Container app_web ... Started",
    "Claude: Stack is up. Ready to deploy?",
  ],
} as const;

export const PTY_CADENCE_MS = {
  base: 46, // midpoint of the 38–55ms spec range
  jitter: 15,
};
