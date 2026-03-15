# Hero Sequence Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static hero shell with the approved universal decode-to-command-palette sequence.

**Architecture:** Extend `HeroContent` with typed stage data in `lib/content.ts`, add a focused hero test that verifies initial and final states, and update `components/Hero.tsx` to auto-advance through the staged shell before settling on the final browser view.

**Tech Stack:** Next.js 15, React 19, TypeScript, Framer Motion, Tailwind CSS v4.

---

### Task 1: Add The Failing Hero Test

**Files:**
- Create: `tests/hero.test.tsx`
- Read: `components/Hero.tsx`
- Read: `lib/content.ts`

**Step 1: Write the failing test**

Cover:
- the hero initially renders raw JSONL-oriented content
- the hero auto-advances to a final browser/result state

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/hero.test.tsx`
Expected: FAIL because the current hero is static and has no staged shell content.

### Task 2: Add Typed Hero Sequence Content

**Files:**
- Modify: `lib/content.ts`
- Test: `tests/hero.test.tsx`

**Step 1: Add explicit stage interfaces and content**

Include:
- sidebar labels for parse-oriented and action-oriented stages
- raw JSONL copy
- decoded card copy
- command palette copy
- final browser/result copy

**Step 2: Run test**

Expected: still FAIL because the hero component does not render the new sequence yet.

### Task 3: Implement The Hero Sequence

**Files:**
- Modify: `components/Hero.tsx`
- Test: `tests/hero.test.tsx`

**Step 1: Implement timed stage transitions**

Use:
- client-side state
- timed advancement with cleanup
- stable final stage

**Step 2: Render the staged sidebar and main pane**

Use:
- the existing shell chrome
- cross-fading stage layers
- minimal extra bundle weight

**Step 3: Run test**

Expected: PASS.

### Task 4: Run Final Verification

**Files:**
- Verify: `components/Hero.tsx`
- Verify: `lib/content.ts`
- Verify: `tests/hero.test.tsx`

**Step 1: Run the targeted test**

Run: `npm test -- tests/hero.test.tsx`

**Step 2: Run broader checks**

Run:
- `npm test`
- `npm run lint`
- `npm run build`
