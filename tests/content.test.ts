import { describe, expect, it } from "vitest";
import {
  FEATURES,
  FOOTER,
  HERO,
  HONEST_CONS,
  PLATFORMS,
  PROBLEM_ITEMS,
  QUICK_START,
  SCREENSHOTS,
  SITE_METADATA,
} from "@/lib/content";

describe("content", () => {
  it("exports the full landing page content model", () => {
    expect(SITE_METADATA.title).toBe("Threadbase");
    expect(HERO.headline).toBe(
      "Your AI session history is a goldmine. Start mining it.",
    );
    expect(PROBLEM_ITEMS).toHaveLength(3);
    expect(FEATURES).toHaveLength(8);
    expect(PLATFORMS).toHaveLength(4);
    expect(SCREENSHOTS).toHaveLength(3);
    expect(HONEST_CONS).toHaveLength(4);
    expect(QUICK_START).toHaveLength(4);
    expect(FOOTER.githubUrl).toContain("github.com");
  });

  it("keeps quick-start blocks aligned to known platforms", () => {
    expect(QUICK_START.map((item) => item.platformId)).toEqual(
      PLATFORMS.map((platform) => platform.id),
    );
  });
});
