// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: false, // visual tests are flakier in parallel
  forbidOnly: !!process.env.CI,
  // Cold-start flake: the first run after `npm run build && npm run start`
  // occasionally jitters in the hero headline strip (mobile). 1 retry catches
  // most of it; 2 retries hit ~100% pass rate based on stress testing. Real
  // regressions still fail consistently across all retries.
  retries: 2,
  workers: 1, // single worker for stable screenshots
  reporter: process.env.CI ? "github" : "list",
  expect: {
    // Allow 0.2% pixel diff before failing — Tailwind v4 + font hinting can
    // jiggle 1–2px between renders even at the same resolution.
    toHaveScreenshot: { maxDiffPixelRatio: 0.002 },
  },
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    // Use the dev server (not `next build && next start`) so:
    // - First-run wall time drops from ~30s (build + start) to ~5s (dev boot).
    // - Re-runs are near-instant: with reuseExistingServer the dev server
    //   started by `npm run dev` is reused across `npm run test:visual`
    //   invocations (per Playwright docs:
    //   https://playwright.dev/docs/test-webserver).
    // Tradeoff: dev mode renders without prod optimizations (no font
    //   preload, no image dimensions, etc.). Visual regression against dev
    //   may miss prod-specific bugs, but is sufficient for catching layout
    //   / color / content drift from dep bumps.
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
