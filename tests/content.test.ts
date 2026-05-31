import { describe, expect, it } from "vitest";
import {
  FEATURES,
  FOOTER,
  HERO,
  HONEST_CONS,
  HOW_IT_WORKS,
  PROBLEM_ITEMS,
  PULL_QUOTE,
  QUICK_START,
  ROADMAP_MILESTONES,
  SITE_METADATA,
} from "@/lib/content";

describe("lib/content.ts", () => {
  it("exposes the new tagline in HERO.headline", () => {
    expect(HERO.headline).toBe("Your terminal. In your pocket. Live.");
  });

  it("HERO.subheadline exists as a string (empty allowed)", () => {
    expect(typeof HERO.subheadline).toBe("string");
  });

  it("HERO has exactly 3 platform badges", () => {
    expect(HERO.badges).toHaveLength(3);
    expect(HERO.badges.map((b) => b.label)).toEqual([
      "iOS · TestFlight beta",
      "Android · coming days",
      "macOS · Linux · Windows streamer",
    ]);
  });

  it("HERO has primary TestFlight CTA + outline brew CTA", () => {
    expect(HERO.ctas).toHaveLength(2);
    expect(HERO.ctas[0]).toMatchObject({ label: "Join TestFlight", variant: "primary" });
    expect(HERO.ctas[1]).toMatchObject({
      label: "brew install threadbase-streamer",
      variant: "outline",
    });
  });

  it("PROBLEM_ITEMS has exactly 3 entries with Phosphor icon names", () => {
    expect(PROBLEM_ITEMS).toHaveLength(3);
    expect(PROBLEM_ITEMS.map((p) => p.icon)).toEqual(["Coffee", "Bell", "MapPin"]);
  });

  it("HOW_IT_WORKS has 3 steps and a trust note", () => {
    expect(HOW_IT_WORKS.steps).toHaveLength(3);
    expect(HOW_IT_WORKS.trustNote).toContain("End-to-end encrypted");
  });

  it("FEATURES has exactly 6 entries (no status badges, no platform array)", () => {
    expect(FEATURES).toHaveLength(6);
    FEATURES.forEach((f) => {
      expect(f).not.toHaveProperty("platforms");
      expect(f).not.toHaveProperty("status");
    });
  });

  it("PULL_QUOTE has body + attribution", () => {
    expect(PULL_QUOTE.body).toContain("redirected a 20-minute test run");
    expect(PULL_QUOTE.attribution).toContain("Ronen Mars");
  });

  it("QUICK_START is a single block, not an array of platform tabs", () => {
    expect(Array.isArray(QUICK_START.steps)).toBe(true);
    expect(QUICK_START.steps.length).toBeGreaterThan(0);
    // QUICK_START should NOT be PlatformBlock[]
    expect(QUICK_START).not.toHaveProperty("platformId");
  });

  it("ROADMAP_MILESTONES uses status strings, not emoji glyphs", () => {
    ROADMAP_MILESTONES.forEach((m) => {
      expect(["shipped", "this-week", "next", "later", "future"]).toContain(m.status);
    });
  });

  it("HONEST_CONS has the 4 mobile-streamer-specific cons", () => {
    expect(HONEST_CONS).toHaveLength(4);
    expect(HONEST_CONS[0].title).toContain("iOS-first");
  });

  it("FOOTER links include solutions, mobile repo, streamer repo", () => {
    const hrefs = FOOTER.links.map((l) => l.href);
    expect(hrefs).toContain("/solutions");
    expect(hrefs.some((h) => h.includes("threadbase-mobile"))).toBe(true);
    expect(hrefs.some((h) => h.includes("threadbase-streamer"))).toBe(true);
  });

  it("SITE_METADATA does not mention 'session browser' or 'history browser'", () => {
    expect(SITE_METADATA.title.toLowerCase()).not.toContain("session browser");
    expect(SITE_METADATA.description.toLowerCase()).not.toContain("session browser");
    expect(SITE_METADATA.description.toLowerCase()).not.toContain("history browser");
  });
});
