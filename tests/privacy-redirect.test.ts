import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/locales";

import nextConfig from "../next.config";

/**
 * `/privacy` is baked into shipped mobile builds and into the App Store Connect
 * and Play Console listings, none of which can be corrected retroactively. If
 * these redirects go away, those references 404 again and App Review fails on
 * the privacy-policy link.
 */
describe("privacy URL redirects", () => {
  async function getRedirects() {
    if (typeof nextConfig.redirects !== "function") {
      throw new Error("next.config defines no redirects()");
    }
    return nextConfig.redirects();
  }

  it("redirects the bare /privacy path to /privacy-policy", async () => {
    const redirects = await getRedirects();
    const bare = redirects.find((r) => r.source === "/privacy");

    expect(bare).toBeDefined();
    expect(bare?.destination).toBe("/privacy-policy");
    expect(bare?.permanent).toBe(true);
  });

  it("redirects every locale-prefixed /privacy path", async () => {
    const redirects = await getRedirects();
    const prefixed = redirects.find((r) => r.source.includes(":locale"));

    expect(prefixed).toBeDefined();
    expect(prefixed?.destination).toBe("/:locale/privacy-policy");
    expect(prefixed?.permanent).toBe(true);

    for (const locale of locales) {
      expect(prefixed?.source).toContain(locale);
    }
  });

  it("does not swallow unrelated first path segments", async () => {
    const redirects = await getRedirects();
    const prefixed = redirects.find((r) => r.source.includes(":locale"));
    const pattern = prefixed?.source.match(/\(([^)]+)\)/)?.[1];

    expect(pattern).toBeDefined();
    expect(pattern?.split("|").sort()).toEqual([...locales].sort());
  });
});
