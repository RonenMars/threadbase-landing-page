import { describe, expect, it } from "vitest";
import {
  FEATURE_CONFIG,
  FOOTER_LINK_CONFIG,
  HERO_CTA_CONFIG,
  NAV_LINK_CONFIG,
  QUICK_START_LINK_CONFIG,
} from "@/lib/content";
import arTranslations from "@/locales/ar.json";
import enTranslations from "@/locales/en.json";
import heTranslations from "@/locales/he.json";
import ruTranslations from "@/locales/ru.json";

const translations = {
  en: enTranslations,
  ru: ruTranslations,
  he: heTranslations,
  ar: arTranslations,
};

function scalarPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      scalarPaths(item, prefix ? `${prefix}.${index}` : String(index)),
    );
  }
  if (typeof value === "object" && value !== null) {
    return Object.entries(value).flatMap(([key, item]) =>
      scalarPaths(item, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

describe("i18n content catalogs", () => {
  it("ships exactly the planned locales", () => {
    expect(Object.keys(translations)).toEqual(["en", "ru", "he", "ar"]);
  });

  it("keeps the English hero headline in locales/en.json", () => {
    expect(enTranslations.home.hero.headline).toBe(
      "Leave the desk. Keep the agent working.",
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

  it("keeps workflow icon structure out of translated copy", () => {
    expect(FEATURE_CONFIG.map((feature) => feature.icon)).toEqual([
      "BellRinging",
      "CheckSquare",
      "Microphone",
      "ArrowsClockwise",
      "MagnifyingGlass",
      "Desktop",
    ]);
  });

  it("keeps locale key parity for every scalar value", () => {
    const sourcePaths = scalarPaths(enTranslations).sort();
    for (const [locale, catalog] of Object.entries(translations)) {
      expect(scalarPaths(catalog).sort(), locale).toEqual(sourcePaths);
    }
  });

  it("keeps homepage array lengths aligned with the structural config", () => {
    for (const catalog of Object.values(translations)) {
      expect(catalog.home.features.items).toHaveLength(FEATURE_CONFIG.length);
      expect(catalog.home.honestCons.items).toHaveLength(5);
      expect(catalog.home.security.highlights).toHaveLength(4);
      expect(catalog.home.security.cantSee).toHaveLength(5);
    }
  });

  it("preserves terminal commands verbatim in every locale", () => {
    for (const catalog of Object.values(translations)) {
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

  it("keeps the refreshed homepage claims precise", () => {
    const frontPageCopy = JSON.stringify(enTranslations.home).toLowerCase();

    expect(frontPageCopy).toContain("codex");
    expect(frontPageCopy).toContain("permission prompts and questions arrive as cards");
    expect(frontPageCopy).toContain("full-text search across every session");
    expect(frontPageCopy).toContain("adopt a session you started in your terminal");
    expect(frontPageCopy).not.toContain("resume support is still");
    expect(frontPageCopy).not.toContain("native prompt cards");
    // Was a `not.toContain` guard: the homepage listed Live Activities among
    // the shipped notification features while the streamer could only send
    // them with the operator's own APNs credentials. HonestCons now names that
    // exact constraint, so the mention stands only in its caveated form.
    expect(frontPageCopy).toContain(
      "ios live activities are opt-in on the streamer and need your own apns credentials",
    );
    // Was a `not.toContain` guard: the site over-claimed E2EE before the
    // streamer shipped it. E2EE is on by default since streamer 1.76
    // (Noise IK, X25519 + ChaCha20-Poly1305), so the claim now stands — but
    // only with the named primitives, so it stays falsifiable.
    expect(frontPageCopy).toContain("end-to-end encrypted by default");
    expect(frontPageCopy).toContain("noise ik");
    expect(frontPageCopy).not.toContain("never talks to a threadbase server");
    expect(enTranslations.home.security.description).toContain(
      "does not relay your coding-agent session through a Threadbase-hosted session backend",
    );
  });

  it("footer and nav links cover the core surfaces", () => {
    const hrefs = FOOTER_LINK_CONFIG.map((link) => link.href);
    expect(NAV_LINK_CONFIG).toHaveLength(6);
    expect(hrefs.some((href) => href.includes("github.com/RonenMars/threadbase"))).toBe(true);
    expect(hrefs).toContain("/betas");
    expect(hrefs.some((href) => href.includes("/issues"))).toBe(true);
    expect(hrefs).toContain("/support");
    expect(hrefs).toContain("/privacy-policy");
    expect(QUICK_START_LINK_CONFIG.map((link) => link.href)).toContain(
      "/android-beta",
    );
  });

  // The privacy and support pages .map() over these keys via t.raw(). A key missing
  // from one locale renders fine in the others and hard-500s that route in prod.
  it.each([
    ["pages.privacy", "automaticReporting"],
    ["pages.privacy", "crashReportingDetails"],
    ["pages.privacy", "feedbackDetails"],
    ["pages.privacy", "permissions"],
    ["pages.privacy", "permissionsHeaders"],
    ["pages.privacy", "staysOnDevice"],
    ["pages.privacy", "trafficCategories"],
    ["pages.privacy", "yourControl"],
    ["pages.support", "requestDetails"],
    ["pages.support", "topics"],
  ])("%s.%s is a non-empty array in every locale", (namespace, key) => {
    const [group, page] = namespace.split(".");
    for (const [locale, catalog] of Object.entries(translations)) {
      const value = (
        catalog as unknown as Record<string, Record<string, Record<string, unknown>>>
      )[group][page][key];
      expect(Array.isArray(value), `${locale}: ${namespace}.${key}`).toBe(true);
      expect((value as unknown[]).length, `${locale}: ${namespace}.${key}`).toBeGreaterThan(0);
    }
  });
});

/**
 * The uninstall claim, guarded.
 *
 * Both of these strings used to say uninstalling deletes everything stored
 * locally, full stop. That is false on iOS: the app stores server credentials
 * via expo-secure-store with no `keychainAccessible` option and no first-run
 * clear, so Keychain entries survive an uninstall and are restored on reinstall
 * (tb-mobile `stores/servers.ts` says so in a code comment).
 *
 * The page tests assert headings only, which is how an inaccurate disclosure sat
 * on a published policy that App Store Connect points at. These assert the
 * claim itself, in every locale, so re-simplifying the sentence fails the build
 * rather than shipping.
 */
describe("privacy policy — uninstall claim", () => {
  // Written per locale rather than as one regex: the point is that the caveat
  // was actually translated, not that some Latin-script token survived.
  const SECURE_STORE_MARKER: Record<string, string> = {
    en: "Keychain",
    ru: "Keychain",
    he: "Keychain",
    ar: "Keychain",
  };

  for (const [locale, catalog] of Object.entries(translations)) {
    const privacy = (
      catalog as unknown as {
        pages: { privacy: { uninstallBody: string; yourControl: string[] } };
      }
    ).pages.privacy;

    it(`${locale}: the uninstall paragraph qualifies the claim`, () => {
      expect(privacy.uninstallBody).toContain(SECURE_STORE_MARKER[locale]);
    });

    it(`${locale}: the "Your control" bullet qualifies it too`, () => {
      const bullet = privacy.yourControl.find((b) => b.includes(SECURE_STORE_MARKER[locale]));
      expect(bullet, "no yourControl bullet mentions the secure store").toBeDefined();
    });
  }
});

/**
 * The push-token claim, guarded.
 *
 * The policy used to say "Removing a server revokes its push token." Removing a
 * server only clears that server's credentials from the device; the streamer
 * keeps the token until the device is revoked there. The false version sat on a
 * published policy for months, so the corrected sentence is asserted rather
 * than left to review.
 *
 * The CLI command stays verbatim in every locale, so one assertion covers all four.
 */
describe("privacy policy — push-token claim", () => {
  it.each(Object.entries(translations))(
    "%s: the push-token bullet points at the streamer-side revoke",
    (_locale, catalog) => {
      const bullets = (
        catalog as unknown as {
          pages: { privacy: { yourControl: string[] } };
        }
      ).pages.privacy.yourControl;

      expect(
        bullets.some((bullet) => bullet.includes("tb-streamer devices revoke")),
        "no yourControl bullet names the streamer-side revoke command",
      ).toBe(true);
    },
  );
});
