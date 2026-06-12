---
name: verify
description: Verify that recent changes are correct by running lint, unit tests, and optionally visual regression tests. Use after implementing a feature or fix to confirm nothing is broken before marking work done.
---

Run the following checks in order and report the result of each:

1. **Lint** — `eslint .`
   - If it fails with fixable errors, run `eslint . --fix` and re-run to confirm clean.
   - If it fails with unfixable errors, report them and stop.

2. **Unit tests** — `vitest run`
   - Report pass/fail and any failing test names.

3. **Visual regression** (only if the change touched UI components, layouts, or styles) — ask the user: "Should I run visual regression tests too? (`npm run test:visual`)"
   - If yes, run `npm run test:visual`.
   - If any screenshots differ, report which pages/components changed and ask whether to update snapshots or investigate.

After all checks pass, summarize: what was verified, and confirm the change is ready.
