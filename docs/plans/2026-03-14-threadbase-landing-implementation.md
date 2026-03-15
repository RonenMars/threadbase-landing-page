# Threadbase Landing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static Next.js landing page in this workspace for Claude Code History Browser, following the approved Signal Console design and the content structure from `nextjs-landing-page-prompt.md`.

**Architecture:** Bootstrap a Next.js 15 App Router project in the current directory, define all copy and typed data in `lib/content.ts`, compose the page in `app/page.tsx`, and keep section components presentational. Use Framer Motion for reveal choreography and `tailwindcss-motion` for high-quality micro-interactions while preserving static export compatibility.

**Tech Stack:** Next.js 15, React 19, TypeScript strict mode, Tailwind CSS v4, Framer Motion, `tailwindcss-motion`, shadcn/ui, Geist Sans, Geist Mono.

---

## Notes

- The current workspace is not a git repository, so commit steps are intentionally omitted.
- `PLAN.md` in the project root will mirror the essential execution plan to satisfy the prompt requirement.
- Current official docs must be checked before implementation because Next.js, Tailwind CSS, and Framer Motion APIs are version-sensitive.

### Task 1: Verify Current APIs And Bootstrap Constraints

**Files:**
- Read: `nextjs-landing-page-prompt.md`
- Create later: `package.json`
- Create later: `next.config.ts`

**Step 1: Review current official docs**

Check official docs for:
- Next.js 15 App Router and static export
- Tailwind CSS v4 setup and configuration
- Framer Motion in-view patterns
- `tailwindcss-motion` installation and class patterns

**Step 2: Record any implementation-impacting differences**

Expected: Confirm exact package names, config file expectations, and static export setup before scaffolding.

### Task 2: Scaffold The App In Place

**Files:**
- Create: `package.json`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`

**Step 1: Bootstrap the project**

Run a non-interactive `create-next-app` flow in the current directory with:
- TypeScript
- App Router
- ESLint
- Tailwind CSS
- Import alias `@/*`

**Step 2: Install animation and UI dependencies**

Install:
- `framer-motion`
- `tailwindcss-motion`
- shadcn/ui dependencies required for `Button`, `Card`, `Badge`, `Tabs`

**Step 3: Verify generated scripts and config**

Expected: App boots with strict TypeScript support and no unsupported server-only setup.

### Task 3: Write Failing Tests For Page Composition And Content Wiring

**Files:**
- Create: `tests/page.test.tsx`
- Create: `tests/content.test.ts`

**Step 1: Write the failing tests**

Cover:
- `app/page.tsx` renders all required sections in order
- Section components receive content via props instead of importing copy directly
- `lib/content.ts` exports the required typed structures

**Step 2: Run tests to verify failure**

Expected: Tests fail because the page, content module, or sections do not exist yet.

### Task 4: Create The Typed Content Model First

**Files:**
- Create: `lib/content.ts`
- Test: `tests/content.test.ts`

**Step 1: Write explicit interfaces and exported constants**

Include:
- metadata description
- hero content
- problem items
- features
- platform chooser cards
- screenshot slots
- honest cons
- quick start blocks
- footer content

**Step 2: Run tests and verify the content contract passes**

Expected: Content tests pass while page composition tests still fail.

### Task 5: Add Shared UI Foundations

**Files:**
- Modify: `app/globals.css`
- Create: `components/ui/*`
- Create: `components/SectionIntro.tsx`
- Create: `components/SurfaceFrame.tsx`
- Create: `components/MotionInView.tsx`

**Step 1: Add the visual system**

Implement:
- CSS variables for dark shell, navy surfaces, cyan highlights, and orange secondary accents
- base typography and selection styles
- reusable panel, glow, grid, and code-surface utilities

**Step 2: Add shared helpers**

Create:
- reusable section intro
- reusable framed placeholder/surface component
- reusable in-view motion wrapper for consistent reveal behavior

**Step 3: Verify foundations**

Expected: Shared primitives compile and keep later section code small.

### Task 6: Implement Hero And Problem Section

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/ProblemSection.tsx`
- Modify: `app/page.tsx`
- Test: `tests/page.test.tsx`

**Step 1: Write or extend failing assertions if needed**

Cover:
- hero heading and CTA presence
- problem section renders three items from props

**Step 2: Implement minimal production code**

Use:
- semantic sections
- Framer Motion reveal sequence
- `tailwindcss-motion` hover/focus polish where relevant

**Step 3: Run tests**

Expected: Hero and problem assertions pass.

### Task 7: Implement Features Grid And Simplified Platform Section

**Files:**
- Create: `components/FeaturesGrid.tsx`
- Create: `components/PlatformPicker.tsx`
- Modify: `app/page.tsx`
- Test: `tests/page.test.tsx`

**Step 1: Extend failing tests**

Cover:
- six feature cards render from props
- platform section renders three install-choice cards
- CTA labels come from content data

**Step 2: Implement minimal production code**

Use:
- interactive card hover states
- clean install-choice layout inspired by the provided reference image
- accessible button and card structure

**Step 3: Run tests**

Expected: Grid and platform chooser tests pass.

### Task 8: Implement Screenshots And Honest Cons

**Files:**
- Create: `components/Screenshots.tsx`
- Create: `components/HonestCons.tsx`
- Modify: `app/page.tsx`
- Test: `tests/page.test.tsx`

**Step 1: Extend failing tests**

Cover:
- screenshot captions and placeholder labels render
- honest cons list items render from content

**Step 2: Implement minimal production code**

Use:
- alternating layout
- framed placeholders
- quieter styling for the cons section

**Step 3: Run tests**

Expected: Screenshot and cons tests pass.

### Task 9: Implement Quick Start And Footer

**Files:**
- Create: `components/QuickStart.tsx`
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`
- Test: `tests/page.test.tsx`

**Step 1: Extend failing tests**

Cover:
- quick start code blocks render all platform commands from props
- footer links and disclaimer render from content

**Step 2: Implement minimal production code**

Use:
- terminal-style `<pre><code>` blocks
- semantic footer structure

**Step 3: Run tests**

Expected: Full page composition test passes.

### Task 10: Configure Metadata, Export, Fonts, And Static Safety

**Files:**
- Modify: `app/layout.tsx`
- Modify: `next.config.ts`
- Modify: `app/globals.css`

**Step 1: Add metadata and fonts**

Implement:
- `html` dark class
- Geist Sans and Geist Mono via `next/font`
- title and description from content metadata

**Step 2: Finalize static export config**

Set:
- `output: "export"`
- `images.unoptimized = true`

**Step 3: Verify build expectations**

Expected: No dynamic server dependencies exist.

### Task 11: Add High-Signal Polish Without Breaking Constraints

**Files:**
- Modify: `components/*.tsx`
- Modify: `app/globals.css`

**Step 1: Refine interaction quality**

Add:
- subtle ambient glows
- hover border emphasis
- focus-visible polish
- restrained `tailwindcss-motion` classes for professional micro-interactions

**Step 2: Confirm no copy leaks into JSX**

Expected: Components stay data-driven and visually coherent.

### Task 12: Run Final Verification

**Files:**
- Verify: `app/**/*.tsx`
- Verify: `components/**/*.tsx`
- Verify: `lib/content.ts`
- Verify: `next.config.ts`
- Verify: `PLAN.md`

**Step 1: Run automated checks**

Run:
- `npm run lint`
- `npm run build`
- test command for the selected test runner
- grep for `any` in app, components, lib, and tests

**Step 2: Run the dev server**

Verify:
- page renders
- platform chooser buttons are visible and ordered
- scroll-triggered sections animate correctly
- 375px layout remains intact

**Step 3: Perform manual spot checks**

Confirm:
- screenshot placeholders are labeled
- no hardcoded user-facing English strings appear in JSX beyond necessary structure wrappers
- keyboard focus states are visible
- page remains professional rather than flashy
