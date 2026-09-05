import { describe, expect, it } from "vitest";
import privacyMeta from "@/content/privacy-meta.json";
import { locales } from "@/i18n/locales";
import {
  computePrivacyContentHash,
  LOCALE_ORDER,
} from "@/scripts/privacy-content-hash.mjs";

describe("privacy policy metadata", () => {
  it("hashes every shipped locale", () => {
    expect([...LOCALE_ORDER].sort()).toEqual([...locales].sort());
  });

  it("matches the privacy copy currently in locales/*.json", () => {
    expect(
      computePrivacyContentHash(),
      "privacy copy changed — run `npm run bump-privacy-date` to refresh content/privacy-meta.json (contentHash + lastUpdated), then commit it with the copy change",
    ).toBe(privacyMeta.contentHash);
  });

  it("keeps both dates as ISO calendar days", () => {
    expect(privacyMeta.effectiveDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(privacyMeta.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
