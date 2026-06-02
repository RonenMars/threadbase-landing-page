import { expect, test } from "@playwright/test";

// Suppress CSS animations + transitions so timing-dependent state (Framer
// Motion entry, hover transitions, the floating-dock fade-in) doesn't
// jitter between Playwright's back-to-back stability screenshots. RAF-
// driven animations (notably GlitchTitle's chromatic-aberration sweep)
// are not covered here — those are handled via `mask` on the screenshot
// calls below.
test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });
});

// GlitchTitle drives a chromatic-aberration sweep via requestAnimationFrame,
// writing inline styles on the <h1> that beat any stylesheet override. The
// only reliable way to make screenshots deterministic is to MASK the
// headline element (Playwright paints a solid block over it before diffing).
// Coverage tradeoff: visual regression no longer catches drift in the
// headline rendering (font, color, layout) — but the headline text content
// and structure are covered by the existing Vitest tests in tests/hero.test.tsx.
const HERO_HEADLINE_MASK = ".glitch-title";

test("home page above the fold", async ({ page }) => {
  await page.goto("/");
  // Wait for fonts so Geist's metrics are stable before the screenshot.
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("home-above-fold.png", {
    fullPage: false,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
    mask: [page.locator(HERO_HEADLINE_MASK)],
  });
});

test("home page full scroll", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("home-full.png", {
    fullPage: true,
    mask: [page.locator(HERO_HEADLINE_MASK)],
  });
});

test("solutions stub page", async ({ page }) => {
  await page.goto("/solutions");
  await page.evaluate(() => document.fonts.ready);
  // /solutions has no GlitchTitle; no mask needed.
  await expect(page).toHaveScreenshot("solutions.png", { fullPage: true });
});

test("hero copy button shows the brew command", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const copyBtn = page.getByRole("button", {
    name: /copy: brew install threadbase-streamer/i,
  });
  await expect(copyBtn).toBeVisible();
});

test("floating dock appears after scrolling past hero", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const dock = page.getByRole("link", { name: /threadbase on github/i });
  // Initially hidden (dock activates above the 80px scroll threshold).
  await expect(dock).toBeHidden();
  await page.evaluate(() => window.scrollTo({ top: 400 }));
  await expect(dock).toBeVisible();
});
