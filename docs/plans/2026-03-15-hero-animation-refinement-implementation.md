# Hero Animation Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the hero animation slower, more continuous, and easier to follow by aligning the sidebar with one persistent workflow.

**Architecture:** Keep the existing hero shell and four content stages, but drive them from a shared workflow step list and slower stage timings. Preserve content-driven data in `lib/content.ts`, update the hero rendering to show a persistent progress UI on desktop and mobile, and verify the stage timing with fake-timer tests.

**Tech Stack:** Next.js 15, React 19, framer-motion, Vitest, Testing Library

---

### Task 1: Add regression test for timing and workflow continuity

**Files:**
- Modify: `tests/hero.test.tsx`

**Step 1:** Add a fake-timer test that asserts the first stage remains visible before the longer first timeout expires.

**Step 2:** Assert the active workflow label progresses in order:
- `Decode JSONL`
- `Inspect structure`
- `Search sessions`
- `Resume thread`

**Step 3:** Run `npm test -- tests/hero.test.tsx` and verify it fails for the current implementation.

### Task 2: Move hero data to a persistent workflow model

**Files:**
- Modify: `lib/content.ts`

**Step 1:** Replace the per-stage unrelated sidebar labels with one shared ordered workflow.

**Step 2:** Increase the stage durations to produce a calmer sequence.

### Task 3: Update hero rendering to feel continuous

**Files:**
- Modify: `components/Hero.tsx`

**Step 1:** Render one persistent workflow step list instead of remounting unrelated sidebar items.

**Step 2:** Add a compact mobile-visible version of the workflow strip.

**Step 3:** Soften stage transitions to rely more on opacity and less on slide-like movement.

### Task 4: Verify from the final patched state

**Files:**
- Verify only

**Step 1:** Run `npm test`

**Step 2:** Run `npm run lint`

**Step 3:** Run `npm run build`
