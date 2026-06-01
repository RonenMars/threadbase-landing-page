import { expect, test } from "@playwright/test";

// Stop motion + force a deterministic clock so the device-mesh animation,
// glow loops, and floating-dock IntersectionObserver don't introduce diff.
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

test("home page above the fold", async ({ page }) => {
  await page.goto("/");
  // Wait for fonts so Geist's metrics are stable before the screenshot.
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("home-above-fold.png", {
    fullPage: false,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
});

test("home page full scroll", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot("home-full.png", { fullPage: true });
});

test("solutions stub page", async ({ page }) => {
  await page.goto("/solutions");
  await page.evaluate(() => document.fonts.ready);
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
