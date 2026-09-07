import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Fixed order — the hash is order-sensitive. Asserted against i18n/locales.ts
// in tests/privacy-meta.test.ts so adding a fifth locale fails loudly instead
// of being silently excluded from the hash.
export const LOCALE_ORDER = ["en", "ru", "he", "ar"];

// Joined with node:path rather than `new URL("../locales/…", import.meta.url)`:
// under vitest's jsdom environment the global URL is jsdom's, and node:url's
// fileURLToPath rejects the instance it returns ("The URL must be of scheme
// file"). fileURLToPath on the plain import.meta.url string works in both.
const LOCALES_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "locales",
);

/**
 * sha256 over `pages.privacy` of every shipped locale, in LOCALE_ORDER.
 *
 * Read from disk rather than imported so the identical module works under plain
 * Node (scripts/bump-privacy-date.mjs) and under vitest.
 */
export function computePrivacyContentHash() {
  const payload = LOCALE_ORDER.map((locale) =>
    JSON.stringify(
      JSON.parse(readFileSync(join(LOCALES_DIR, `${locale}.json`), "utf8"))
        .pages.privacy,
    ),
  ).join("\n");

  return createHash("sha256").update(payload).digest("hex");
}
