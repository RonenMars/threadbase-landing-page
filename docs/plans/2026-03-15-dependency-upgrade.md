# Dependency Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade all dependencies and devDependencies in this repo to their latest published versions, then restore a passing build, lint, and test state.

**Architecture:** Use npm to resolve the latest versions directly into `package.json` and `package-lock.json`, then repair any config or code issues caused by the upgrades. Treat the local project toolchain as the source of truth and verify with the upgraded local binaries.

**Tech Stack:** Next.js, React, ESLint, Tailwind CSS, Vitest, TypeScript

---

### Task 1: Upgrade dependency versions

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1:** Upgrade all runtime dependencies to `@latest` using `npm install`.

**Step 2:** Upgrade all dev dependencies to `@latest` using `npm install -D`.

**Step 3:** Inspect the resolved versions in `package.json` and `package-lock.json`.

### Task 2: Repair upgrade fallout

**Files:**
- Modify as needed: `next.config.ts`
- Modify as needed: `eslint.config.js`
- Modify as needed: `eslint.config.mjs`
- Modify as needed: `app/**`
- Modify as needed: `components/**`
- Modify as needed: `tests/**`

**Step 1:** Run focused verification commands to identify breakage.

**Step 2:** Make the smallest compatible fixes required by the upgraded packages.

### Task 3: Verify the final upgraded state

**Files:**
- Verify only

**Step 1:** Run `npm test`

**Step 2:** Run `npm run lint`

**Step 3:** Run `npm run build`

---

## ESLint 10 Migration — 2026-06-12 (PR #23)

**What changed:**
- `eslint` bumped `^9` → `^10`
- `eslint-config-next` removed
- Direct plugins added: `typescript-eslint`, `eslint-plugin-react-hooks`, `@next/eslint-plugin-next`
- `eslint.config.mjs` deleted (was a stale duplicate of `eslint.config.js`)
- Node engines updated: `>=20.9.0` → `^20.9.0 || ^21.0.0 || >=24.0.0`
- CI test matrix extended to Node 20, 22, 24

**Why `eslint-config-next` was dropped:**
`eslint-config-next` bundles `eslint-plugin-react@7.37.5` internally. That version calls `context.getFilename()` which ESLint 10 removed, causing a hard crash at lint startup. The fix is not possible by disabling rules — the plugin throws during initialization before any rule runs.

Rather than patching around it with `"react/...: off"` overrides, `eslint-config-next` was replaced with the three plugins it re-exported that are ESLint 10 compatible. `eslint-plugin-react` is intentionally excluded.
