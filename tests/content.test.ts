import { describe, expect, it } from "vitest";
import {
  FEATURE_CONFIG,
  FOOTER_LINK_CONFIG,
  HERO_CTA_CONFIG,
  NAV_LINK_CONFIG,
  PROBLEM_ITEM_CONFIG,
  QUICK_START_LINK_CONFIG,
  ROADMAP_MILESTONE_CONFIG,
} from "@/lib/content";
import arMessages from "@/messages/ar.json";
import enMessages from "@/messages/en.json";
import heMessages from "@/messages/he.json";
import ruMessages from "@/messages/ru.json";

const messages = {
  en: enMessages,
  ru: ruMessages,
  he: heMessages,
  ar: arMessages,
};

describe("i18n content catalogs", () => {
  it("ships exactly the planned locales", () => {
    expect(Object.keys(messages)).toEqual(["en", "ru", "he", "ar"]);
  });

  it("keeps the English hero headline in messages/en.json", () => {
    expect(enMessages.home.hero.headline).toBe(
      "Your terminal. Live. In your pocket.",
    );
  });

  it("keeps hero structure in lib/content.ts", () => {
    expect(HERO_CTA_CONFIG).toHaveLength(2);
    expect(HERO_CTA_CONFIG[0]).toMatchObject({
      href: "https://testflight.apple.com/join/FqdM3mFK",
      variant: "primary",
    });
    expect(HERO_CTA_CONFIG[1]).toMatchObject({
      href: "#quick-start",
      variant: "outline",
    });
  });

  it("keeps icon/status/link structure out of translated copy", () => {
    expect(PROBLEM_ITEM_CONFIG.map((p) => p.icon)).toEqual([
      "Coffee",
      "Bell",
      "MapPin",
    ]);
    expect(FEATURE_CONFIG).toHaveLength(6);
    expect(ROADMAP_MILESTONE_CONFIG.map((m) => m.status)).toEqual([
      "shipped",
      "shipped",
      "shipped",
      "shipped",
      "shipped",
      "next",
      "next",
      "later",
      "later",
      "shipped",
      "future",
    ]);
  });

  it("preserves terminal commands verbatim in every locale", () => {
    for (const catalog of Object.values(messages)) {
      expect(catalog.home.quickStart.steps).toContain(
        "npm install -g @threadbase-sh/streamer",
      );
      expect(catalog.home.quickStart.steps).toContain(
        "brew install tb-streamer",
      );
      expect(catalog.home.quickStart.steps).toContain(
        "tb-streamer set-key <YOUR_API_KEY>",
      );
      expect(catalog.home.quickStart.steps).toContain("tb-streamer serve");
    }
  });

  it("front-page English copy no longer describes Codex support as read-only", () => {
    const frontPageCopy = [
      enMessages.metadata.site.description,
      enMessages.home.hero.eyebrow,
      ...enMessages.home.features.items.map(
        (feature) => `${feature.title} ${feature.description}`,
      ),
      ...enMessages.home.honestCons.items.map(
        (item) => `${item.title} ${item.description}`,
      ),
      ...enMessages.home.roadmap.milestones.map(
        (milestone) => `${milestone.title} ${milestone.detail}`,
      ),
    ].join(" ");

    expect(frontPageCopy.toLowerCase()).toContain("codex");
    expect(frontPageCopy.toLowerCase()).not.toContain("read-only");
  });

  it("footer and nav links cover the core surfaces", () => {
    const hrefs = FOOTER_LINK_CONFIG.map((link) => link.href);
    expect(NAV_LINK_CONFIG).toHaveLength(6);
    expect(hrefs.some((href) => href.includes("github.com/RonenMars/threadbase"))).toBe(true);
    expect(hrefs).toContain("/betas");
    expect(hrefs.some((href) => href.includes("/issues"))).toBe(true);
    expect(hrefs).toContain("/support");
    expect(hrefs).toContain("/privacy");
    expect(QUICK_START_LINK_CONFIG.map((link) => link.href)).toContain(
      "/android-beta",
    );
  });
});
