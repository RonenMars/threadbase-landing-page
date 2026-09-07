# Derive the privacy-policy dates from a content hash

## Context

`app/[locale]/privacy-policy/page.tsx` held a single hardcoded constant:

```ts
const EFFECTIVE_DATE = "2026-07-18";
```

rendered on **both** footer lines — "Effective date:" and "Last updated:". So the page claimed the policy had never been revised since first publication, while `pages.privacy` in `locales/*.json` had in fact been edited several times since. Nothing in the repo could notice: the parity test in `tests/content.test.ts` compares key *shape* across locales, not values, and the page tests assert headings only.

The failure mode is specific and bad: App Store Connect points at this page, so a stale "Last updated" on a policy that has silently changed is a compliance problem, not a cosmetic one.

## Decision

Move both dates into `content/privacy-meta.json` and make the file a **contract that a test enforces**, rather than another constant someone has to remember to edit.

```json
{
  "effectiveDate": "2026-07-18",
  "lastUpdated": "2026-09-05",
  "contentHash": "<sha256, hex>"
}
```

- `effectiveDate` — first publication. Never written by the script; only a human changes it, and only if the policy is republished as a new document.
- `lastUpdated` — the day the copy last changed.
- `contentHash` — a fingerprint of the privacy copy itself.

`tests/privacy-meta.test.ts` recomputes the hash from `locales/*.json` and asserts it equals the committed one. Editing privacy copy without bumping turns `npm test` — and therefore CI — red, with the fix in the failure message.

## The mechanism

`scripts/privacy-content-hash.mjs` is the single definition of "the hash", imported by both the bump script and the test so the two cannot drift:

sha256 over `JSON.stringify(catalog.pages.privacy)` for each locale in the fixed order `["en", "ru", "he", "ar"]`, joined with `\n`, hex digest.

Notes on the shape of that definition:

- **Fixed locale order, asserted.** The order is hardcoded because the hash is order-sensitive. A separate assertion compares it against `i18n/locales.ts`, so adding a fifth locale fails loudly instead of being quietly excluded from the fingerprint.
- **Read from disk, not imported.** The identical module then works under plain Node (the npm script) and under vitest.
- **Paths joined with `node:path`.** `new URL("../locales/…", import.meta.url)` looks tidier but breaks under vitest's jsdom environment: the global `URL` is jsdom's, and `node:url`'s `fileURLToPath` rejects the instance it returns with "The URL must be of scheme file".
- **Scope is `pages.privacy` only.** Editing marketing copy elsewhere in the catalogs does not demand a policy-date bump.

## Why not derive the date from git

`git log -1 --format=%cs -- locales/en.json` is the obvious alternative and was rejected:

- It is wrong at the granularity that matters. The locale files carry the whole site's copy; a homepage headline tweak would move the privacy policy's "Last updated" date. A content hash scoped to `pages.privacy` moves only when the policy moves.
- It needs git history at build time. Vercel builds from a shallow clone by default, and the value would silently become "today" or empty rather than failing.
- It cannot be reviewed. A date in a committed file shows up in the diff and gets read; a value computed during the build does not.

## Bumping

```bash
npm run bump-privacy-date
```

1. Recompute the hash.
2. If unchanged, print `privacy copy unchanged (hash …); nothing to do` and exit **without writing** — a no-op run never produces a spurious `lastUpdated` bump.
3. Otherwise write the new `contentHash` and set `lastUpdated` to today; leave `effectiveDate` alone.

Run it in the same commit as the copy change and stage `content/privacy-meta.json` alongside it.

## Known and accepted

- **Key order counts.** `JSON.stringify` preserves insertion order, so reordering privacy keys without changing a character still changes the hash and demands a bump. A false positive on a rare, deliberate edit — and re-confirming the date when the policy is restructured is defensible.
- **`lastUpdated` is UTC.** The script uses `new Date().toISOString()`, so a run between 00:00 and 03:00 IDT stamps the previous calendar day. Deterministic, and for a policy date harmless. Flagged rather than special-cased.

## CI

No workflow change. `.github/workflows/ci.yml`'s `test` job already runs `npm test` → `vitest run`, and `vitest.config.ts` excludes only `node_modules`, `.next`, `.claude`, `.worktrees` and `tests/visual/**`, so `tests/privacy-meta.test.ts` is collected automatically.
