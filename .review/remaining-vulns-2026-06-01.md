# Remaining vulnerabilities — 2026-06-01

> Vulnerabilities that could not be fixed automatically without a major-version
> bump or upstream coordination. Triaged on branch
> `tests/visual-regression-and-vulns` after running individual Dependabot dep
> bumps + two passes of `npm audit fix`.

## Pre-vs-post-fix counts

| | Total | High | Moderate | Low |
|---|---|---|---|---|
| **Before** (M4.1 baseline) | 13 | 6 | 7 | 0 |
| **After** (post-fix)       | 2  | 0 | 2 | 0 |
| **Reduction**              | **-11 (85%)** | -6 | -5 | 0 |

GitHub Dependabot originally reported 41 vulns across the repo, but `npm
audit` (the local CLI's count) baseline was 13 — Dependabot uses a broader
advisory database and counts low-confidence/unused-code-path advisories that
`npm audit` filters out. The 11 fixed via this branch's work are the ones
both tools agree on as actionable.

## Remaining items

### postcss <8.5.10 — moderate (×2)

- **Path:** `node_modules/next/node_modules/postcss` (bundled inside Next.js)
- **Advisory:** [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93)
  — PostCSS XSS via unescaped `</style>` in CSS stringify output
- **Fix requires:** Either (a) Next.js publishing a new version with an
  updated bundled postcss, or (b) `npm audit fix --force` which would
  downgrade Next.js to **v9.3.3** — 7 major versions backwards. v9 doesn't
  support React 19, the App Router, `next/font`, or any of the modern APIs
  this codebase uses. Not viable.
- **Recommendation:** Accept the risk for now. The XSS attack vector requires
  attacker-controlled CSS being processed by postcss at build time, which is
  not part of this app's workflow (we don't accept user-generated CSS). Track
  Next.js releases and re-run `npm audit fix` whenever a new minor lands —
  the postcss bundled in Next.js typically updates when Next updates.
- **Severity context:** Moderate, build-time only. No runtime impact for end
  users of the published site.

## Notes on the fix process

- The 4 Dependabot PR branches (`next-16.2.6`, `qs-6.15.2`,
  `react-dom-19.2.6`, `tailwindcss-4.3.0`) were **NOT git-merged** because
  they were based on `main` (not this branch), and a 3-way merge would have
  deleted the M2-M3 Playwright visual-regression infrastructure. Instead,
  each bump was applied via `npm install <pkg>@<version>` directly. Same dep
  delta, clean history, no clobbering.
- `react` and `react-dom` were bumped together to `19.2.6` — the Dependabot
  `react-dom-19.2.6` PR only bumped `react-dom`, leaving `react` at `19.2.4`.
  Fixing that constraint inline.
- `qs` was bumped lockfile-only (transitive dep via `shadcn` →
  `@modelcontextprotocol/sdk` → `express` → `body-parser`). Adding it as a
  direct dep would have polluted `package.json`'s public surface for a
  security fix we don't actually depend on directly.
- `tailwindcss` core + CLI + postcss plugin were bumped together to keep the
  v4 ecosystem versions coordinated (initial single-package bump left
  `@tailwindcss/cli` and `@tailwindcss/postcss` at `4.2.1` with the core at
  `4.3.0` — a recipe for output hash mismatches).
- **No `npm audit fix --force` was used.** It would have downgraded Next.js
  to v9.3.3 in pursuit of the postcss fix — catastrophic.
- Did NOT run `npm audit fix --force` even on the picomatch high-severity
  ReDoS issue — a second non-force `npm audit fix` pass cleared it without
  any `--force` needed.

## Verification

Each dep bump was verified against the full 4-gate test suite:
- `npx tsc --noEmit` → exit 0
- `npm run test` (Vitest) → 13/13 test files
- `npm run test:visual` (Playwright) → 10/10 tests (with the documented cold-
  start flake recovering via retries)
- `npm run build` (Next.js) → succeeds, 3 routes prerender static

The Playwright visual regression suite is the critical safety net for
CSS-impacting bumps (notably tailwindcss 4.2.1 → 4.3.0). All visual baselines
matched within the 0.2% pixel diff tolerance — **no visual regression
introduced by any dep bump**.
