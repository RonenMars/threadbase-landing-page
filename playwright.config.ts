// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: false, // visual tests are flakier in parallel
  forbidOnly: !!process.env.CI,
  retries: 0,
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
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
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
