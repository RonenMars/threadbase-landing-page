---
name: update-snapshots
description: Update Playwright visual regression baselines after intentional visual changes. Use when you've made deliberate UI changes and the existing snapshots are now stale.
disable-model-invocation: true
---

Before updating snapshots, work through this checklist:

1. **Confirm the change is intentional.** Run `npm run test:visual` first and review which screenshots differ. Only proceed if every diff is expected.

2. **Check for unintended regressions.** For each diffing screenshot, ask: "Is this diff explained by the change I made, or is it a side effect?" Stop and investigate any unexpected diff.

3. **Update baselines.**
   ```bash
   npm run test:visual:update
   ```

4. **Re-run to confirm clean.**
   ```bash
   npm run test:visual
   ```
   All tests must pass with zero diffs after updating.

5. **Stage the updated snapshots** for commit alongside the code change that caused them.
