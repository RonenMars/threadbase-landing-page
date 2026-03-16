# Threadbase Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing landing page from an informational product listing into a premium, interactive developer-tool experience with platform personalization, Threadbase branding, and a roadmap teaser.

**Architecture:** `page.tsx` becomes a `"use client"` orchestrator holding `selectedPlatform` state and passing it as props to all personalized sections. No context needed — all sections are direct children. Multi-component files are refactored into one-component-per-file sub-directories. All copy lives in `lib/content.ts`.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind v4, Framer Motion 12, Vitest + @testing-library/react

**Spec:** `docs/superpowers/specs/2026-03-16-threadbase-landing-design.md`

**Rule:** Every `.tsx` file must contain exactly one exported component. When a file has multiple component functions, extract them into a sub-directory of the same name.

**Test command:** `pnpm test`

---

## Chunk 1: Content Foundation

### Task 1: Type changes in lib/content.ts

**Files:**
- Modify: `lib/content.ts`

- [ ] **Step 1: Add `"cli"` to `PlatformItem["id"]` union and `platforms` field to `FeatureItem`**

  In `lib/content.ts`:

  ```ts
  // Change:
  export interface PlatformItem {
    id: "desktop" | "vscode" | "intellij";
    // ...
  }
  // To:
  export interface PlatformItem {
    id: "desktop" | "vscode" | "intellij" | "cli";
    // ...
  }

  // Change FeatureItem to add optional platforms field:
  export interface FeatureItem {
    icon: string;
    title: string;
    description: string;
    platforms?: Array<PlatformItem["id"]>;
  }
  ```

- [ ] **Step 2: Narrow `QuickStartBlock.accentColor` to a union type AND patch `accentMap` in `QuickStart.tsx`**

  Both changes must happen together — narrowing the type without updating the map causes an immediate TypeScript error since `accentMap` is typed as `Record<QuickStartBlock["accentColor"], string>` and will be missing the `"green"` key.

  In `lib/content.ts`:
  ```ts
  export interface QuickStartBlock {
    platformId: PlatformItem["id"];
    platformName: string;
    accentColor: "orange" | "blue" | "violet" | "green";
    steps: string[];
  }
  ```

  In `components/QuickStart.tsx` (the existing flat file, not yet replaced):
  ```ts
  // Change:
  const accentMap: Record<QuickStartBlock["accentColor"], string> = {
    orange: "bg-accent-secondary",
    blue: "bg-accent",
    violet: "bg-violet-400",
  };
  // To:
  const accentMap: Record<QuickStartBlock["accentColor"], string> = {
    orange: "bg-accent-secondary",
    blue:   "bg-accent",
    violet: "bg-violet-400",
    green:  "bg-green-400",
  };
  ```

- [ ] **Step 3: Add roadmap types**

  Add after the existing interfaces:

  ```ts
  export interface RoadmapProvider {
    name: string;
    type: string;
    icon: string;
  }

  export interface RoadmapMilestone {
    timeLabel: string;
    status: "shipped" | "soon" | "planned" | "future";
    title: string;
    providers: RoadmapProvider[];
    detail: string;
  }
  ```

- [ ] **Step 4: Add `SelectedPlatform` type export**

  ```ts
  export type SelectedPlatform = PlatformItem["id"] | null;
  ```

- [ ] **Step 5: Run tests to confirm types compile**

  Run: `pnpm test`
  Expected: All existing tests pass (no data has changed yet, only types — `content.test.ts` still passes because the data arrays haven't changed)

- [ ] **Step 6: Commit**

  ```bash
  git add lib/content.ts
  git commit -m "feat(content): add cli platform id, feature platform affinity type, roadmap types, SelectedPlatform"
  ```

---

### Task 2: Data changes in lib/content.ts

**Files:**
- Modify: `lib/content.ts`

- [ ] **Step 1: Update brand strings — SITE_METADATA, HERO**

  ```ts
  export const SITE_METADATA: SiteMetadata = {
    title: "Threadbase",
    description:
      "Threadbase turns raw AI session files on your disk into a searchable, navigable knowledge base across desktop, IDE, and terminal.",
  };
  ```

  In `HERO`:
  ```ts
  eyebrow: "AI Session Browser",
  headline: "Your AI session history is a goldmine. Start mining it.",
  subheadline:
    "Threadbase turns raw AI session files on your disk into a searchable, navigable knowledge base — across desktop, IDE, and terminal.",
  badges: [
    { label: "Desktop App" },
    { label: "VS Code" },
    { label: "IntelliJ" },
    { label: "CLI (cch)" },
  ],
  ctas: [
    {
      label: "Choose your platform ↓",
      href: "#platform-picker",
      variant: "primary",
    },
    {
      label: "View on GitHub",
      href: "https://github.com/ronen/cc-history",
      variant: "outline",
    },
  ],
  ```

- [ ] **Step 2: Update PLATFORMS — add CLI, remove IntelliJ badge, update section heading**

  Add CLI entry to `PLATFORMS` array:
  ```ts
  {
    id: "cli",
    icon: "⌨",
    name: "CLI (cch)",
    meta: "Terminal · All platforms",
    description:
      "The fastest way to search your session history without leaving the terminal.",
    ctaLabel: "Install cch",
    ctaHref: "#quick-start",
  },
  ```

  On the IntelliJ entry, remove `badge: "In Progress"`.

  Update `PLATFORM_SECTION`:
  ```ts
  export const PLATFORM_SECTION: SectionContent = {
    eyebrow: "Choose your environment",
    heading: "Four platforms. One history.",
    description:
      "Choose the surface that fits how you work. The archive stays local, searchable, and immediately usable.",
  };
  ```

- [ ] **Step 3: Update FEATURES — add platforms affinity + 2 new features**

  Add `platforms` field to all 6 existing features:

  | Feature title | `platforms` value |
  |---|---|
  | Full-text search | `["desktop","vscode","intellij","cli"]` |
  | Project-grouped browser | `["desktop","vscode","intellij"]` |
  | Rich tool result cards | `["desktop","vscode","intellij"]` |
  | Multi-profile support | `["desktop"]` |
  | Export anywhere | `["desktop","vscode"]` |
  | Resume sessions | `["desktop","cli"]` |

  Append 2 new entries:
  ```ts
  {
    icon: "⌨",
    title: "Terminal-native CLI",
    description:
      "cch brings full-text search and session browsing to the terminal with a fast, keyboard-driven interface.",
    platforms: ["cli"],
  },
  {
    icon: "↺",
    title: "Cross-assistant ready",
    description:
      "Built to expand beyond Claude Code — same local-first approach, same searchable history, more AI tools soon.",
    platforms: ["desktop", "vscode", "intellij", "cli"],
  },
  ```

- [ ] **Step 4: Update HONEST_CONS — remove IntelliJ item, update Claude Code item**

  Remove the item with `title: "IntelliJ plugin is still in progress"`.

  Update the first item:
  ```ts
  {
    title: "Currently Claude Code sessions only",
    description:
      "This product is valuable if you use Claude Code seriously and want to mine your own local history.",
  },
  ```

- [ ] **Step 5: Add CLI QuickStart block + update accentMap types**

  Update `accentMap` key in QuickStart.tsx (step covered in Task 9). Here, add the CLI block to `QUICK_START`:

  ```ts
  {
    platformId: "cli",
    platformName: "CLI (cch)",
    accentColor: "green",
    steps: [
      "# 1. Install cch globally",
      "npm install -g cch",
      "",
      "# 2. Search your session history",
      "cch search \"auth refresh handler\"",
      "",
      "# 3. Browse all sessions",
      "cch browse",
      "",
      "# 4. Open a specific session",
      "cch open session_014",
    ],
  },
  ```

- [ ] **Step 6: Add ROADMAP_MILESTONES + ROADMAP_SECTION + SCREENSHOTS_PLATFORM_LABELS**

  ```ts
  export const ROADMAP_SECTION: SectionContent = {
    eyebrow: "What's coming",
    heading: "Beyond Claude Code.",
    description:
      "Threadbase is expanding to support every major AI coding assistant. Your history. Your tools. Not locked to one.",
  };

  export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
    {
      timeLabel: "Now",
      status: "shipped",
      title: "Claude Code",
      providers: [
        { name: "Desktop App", type: "Electron · All platforms", icon: "🖥" },
        { name: "VS Code",     type: "Marketplace",              icon: "🔷" },
        { name: "IntelliJ",   type: "JetBrains",                icon: "☕" },
        { name: "CLI (cch)",  type: "Terminal",                  icon: "⌨" },
      ],
      detail:
        "Full Milestone 1 shipped across all four surfaces. Searchable history, tool result cards, project-grouped browser, and session resume.",
    },
    {
      timeLabel: "Month 1–2",
      status: "soon",
      title: "Coming soon",
      providers: [
        { name: "Codex CLI",    type: "OpenAI",      icon: "⬛" },
        { name: "Continue.dev", type: "Open source", icon: "🔗" },
      ],
      detail:
        "Expanding the session parser to support OpenAI Codex CLI and Continue.dev session formats. Same local-first approach — no cloud required.",
    },
    {
      timeLabel: "Month 3–4",
      status: "planned",
      title: "Planned",
      providers: [
        { name: "OpenCode", type: "Open source", icon: "🟢" },
        { name: "Amazon Q", type: "AWS",         icon: "🟡" },
      ],
      detail:
        "Roadmap items confirmed based on user demand. Timeline subject to change.",
    },
    {
      timeLabel: "Month 5–6",
      status: "future",
      title: "Future",
      providers: [
        { name: "Aider",  type: "Open source",  icon: "⚡" },
        { name: "+ more", type: "Vote on GitHub", icon: "🗳" },
      ],
      detail:
        "Additional assistants based on community votes. Open an issue on GitHub to request your preferred tool.",
    },
  ];

  export const SCREENSHOTS_PLATFORM_LABELS: Partial<Record<PlatformItem["id"], string>> = {
    desktop:  "Desktop App walkthrough",
    vscode:   "VS Code extension walkthrough",
    intellij: "IntelliJ plugin walkthrough",
    cli:      "CLI (cch) walkthrough",
  };
  ```

- [ ] **Step 7: Update FOOTER**

  ```ts
  export const FOOTER: FooterContent = {
    productName: "Threadbase",
    licenseText: "MIT License",
    tagline:
      "Built for developers who use AI coding assistants seriously.",
    disclaimer:
      "Not affiliated with Anthropic. Claude Code is a product of Anthropic.",
    githubUrl: "https://github.com/ronen/cc-history",
    links: [
      { label: "GitHub",        href: "https://github.com/ronen/cc-history" },
      { label: "Report an Issue", href: "https://github.com/ronen/cc-history/issues" },
      { label: "Changelog",     href: "https://github.com/ronen/cc-history/releases" },
    ],
  };
  ```

- [ ] **Step 8: Run tests — expect multiple test files to fail on changed data**

  Run: `pnpm test`
  Expected failures (all fixed in Task 12):
  - `content.test.ts`: asserts old title, old headline, `FEATURES` length 6, `PLATFORMS` length 3, `HONEST_CONS` length 5, `QUICK_START` length 3, and the quick-start/platforms alignment check
  - `page.test.tsx`: asserts old headline and "Three platforms. One history." heading

  These are all expected — the tests reflect old data. Do not try to fix them here.

- [ ] **Step 9: Commit**

  ```bash
  git add lib/content.ts
  git commit -m "feat(content): Threadbase rebrand, CLI platform, roadmap data, features affinity mapping"
  ```

---

## Chunk 2: Hero Split + page.tsx Infrastructure

### Task 3: Split Hero.tsx into one-component-per-file sub-directory

`Hero.tsx` currently contains 8 component functions: `TypewriterLines`, `WorkflowSteps`, `RawStage`, `DecodedStage`, `CommandPaletteStage`, `DeepViewStage`, `StageBody`, and `Hero`. Extract each to its own file.

**Files:**
- Create: `components/Hero/heroVariants.ts` (Framer Motion variants — not a component)
- Create: `components/Hero/TypewriterLines.tsx`
- Create: `components/Hero/WorkflowSteps.tsx`
- Create: `components/Hero/stages/RawStage.tsx`
- Create: `components/Hero/stages/DecodedStage.tsx`
- Create: `components/Hero/stages/CommandPaletteStage.tsx`
- Create: `components/Hero/stages/DeepViewStage.tsx`
- Create: `components/Hero/StageBody.tsx`
- Create: `components/Hero/index.tsx` (main `Hero` export)
- Delete: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Hero/heroVariants.ts`**

  Move the Framer Motion variant objects and `itemTransition` function from `Hero.tsx` here:

  ```ts
  import type { Variants } from "framer-motion";

  export const panelVariants: Variants = {
    initial: { y: 14 },
    animate: {
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  export const decodedPanelVariants: Variants = {
    initial: { y: 14 },
    animate: {
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      transition: { staggerChildren: 0.25, when: "afterChildren" },
    },
  };

  export function itemTransition(index: number) {
    return { duration: 0.75, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] as const };
  }
  ```

- [ ] **Step 2: Create `components/Hero/TypewriterLines.tsx`**

  Move `useTypewriter` hook and `TypewriterLines` component from `Hero.tsx`. Only one exported component in this file — `useTypewriter` is a hook (not a component) so it can live alongside.

  ```tsx
  "use client";
  import { useEffect, useState } from "react";

  export function useTypewriter(text: string, charDelayMs = 20, startDelayMs = 0): string {
    // ... exact same implementation from Hero.tsx
  }

  export function TypewriterLines({ lines, charDelayMs = 12, lineGapMs = 120 }: {
    lines: string[];
    charDelayMs?: number;
    lineGapMs?: number;
  }): React.JSX.Element {
    // ... exact same implementation from Hero.tsx
  }
  ```

- [ ] **Step 3: Create `components/Hero/WorkflowSteps.tsx`**

  Move `WorkflowSteps` component from `Hero.tsx`. No changes to implementation — only copy the function and add `"use client"` + correct imports.

- [ ] **Step 4: Create `components/Hero/stages/RawStage.tsx`**

  Move `RawStage` from `Hero.tsx`. Import `TypewriterLines` from `../TypewriterLines`.

- [ ] **Step 5: Create `components/Hero/stages/DecodedStage.tsx`**

  Move `DecodedStage` from `Hero.tsx`. Import `itemTransition` from `../heroVariants`.

- [ ] **Step 6: Create `components/Hero/stages/CommandPaletteStage.tsx`**

  Move `CommandPaletteStage` from `Hero.tsx`. Import `useTypewriter` from `../TypewriterLines` and `itemTransition` from `../heroVariants`.

- [ ] **Step 7: Create `components/Hero/stages/DeepViewStage.tsx`**

  Move `DeepViewStage` from `Hero.tsx`. No local dependencies beyond framer-motion and content types.

- [ ] **Step 8: Create `components/Hero/StageBody.tsx`**

  Move `StageBody` from `Hero.tsx`. Imports all 4 stage components:

  ```tsx
  "use client";
  import type { HeroShellStage } from "@/lib/content";
  import { CommandPaletteStage } from "./stages/CommandPaletteStage";
  import { DecodedStage } from "./stages/DecodedStage";
  import { DeepViewStage } from "./stages/DeepViewStage";
  import { RawStage } from "./stages/RawStage";

  export function StageBody({ stage }: { stage: HeroShellStage }): React.JSX.Element {
    switch (stage.id) {
      case "raw-jsonl": return <RawStage stage={stage} />;
      case "decoded":   return <DecodedStage stage={stage} />;
      case "command-palette": return <CommandPaletteStage stage={stage} />;
      case "deep-view": return <DeepViewStage stage={stage} />;
      default: return <div />;
    }
  }
  ```

- [ ] **Step 9: Create `components/Hero/index.tsx`**

  Move the main `Hero` component from `Hero.tsx` here. Imports are:
  - `StageBody` from `./StageBody`
  - `WorkflowSteps` from `./WorkflowSteps`
  - `panelVariants`, `decodedPanelVariants` from `./heroVariants`

  The exported function signature is unchanged: `export function Hero({ hero }: HeroProps): React.JSX.Element`

- [ ] **Step 10: Delete `components/Hero.tsx`**

  ```bash
  rm components/Hero.tsx
  ```

- [ ] **Step 11: Run tests — Hero import should resolve via directory index**

  Run: `pnpm test`
  Expected: `hero.test.tsx` passes (imports `@/components/Hero` which now resolves to `@/components/Hero/index.tsx`). `page.test.tsx` still fails on content strings (from Task 2 — expected).

- [ ] **Step 12: Commit**

  ```bash
  git add components/Hero/ && git rm components/Hero.tsx
  git commit -m "refactor(Hero): split into one-component-per-file sub-directory"
  ```

---

### Task 4: page.tsx — add client state, reorder sections, pass props

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add `"use client"` and state to `page.tsx`**

  ```tsx
  "use client";

  import { useRef, useState } from "react";
  import type { SelectedPlatform } from "@/lib/content";
  // ... existing imports ...

  export default function Home(): React.JSX.Element {
    const [selectedPlatform, setSelectedPlatform] = useState<SelectedPlatform>(null);
    const quickStartRef = useRef<HTMLDivElement>(null);

    function handlePlatformSelect(id: SelectedPlatform): void {
      setSelectedPlatform(id);
      if (id !== null) {
        setTimeout(() => {
          quickStartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }

    return (
      <div className="app-shell min-h-screen">
        <main>
          <Hero hero={HERO} />
          <ProblemSection items={PROBLEM_ITEMS} section={PROBLEM_SECTION} />
          <PlatformPicker
            platforms={PLATFORMS}
            section={PLATFORM_SECTION}
            selected={selectedPlatform}
            onSelect={handlePlatformSelect}
          />
          <FeaturesGrid
            features={FEATURES}
            section={FEATURES_SECTION}
            selectedPlatform={selectedPlatform}
          />
          <Screenshots
            section={SCREENSHOTS_SECTION}
            shots={SCREENSHOTS}
            selectedPlatform={selectedPlatform}
            platformLabels={SCREENSHOTS_PLATFORM_LABELS}
          />
          <HonestCons items={HONEST_CONS} section={HONEST_CONS_SECTION} />
          <RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />
          <div ref={quickStartRef}>
            <QuickStart
              blocks={QUICK_START}
              section={QUICK_START_SECTION}
              selectedPlatform={selectedPlatform}
            />
          </div>
        </main>
        <Footer footer={FOOTER} />
      </div>
    );
  }
  ```

  Also update the import block to include new exports:
  ```ts
  import {
    FEATURES, FEATURES_SECTION,
    FOOTER,
    HERO,
    HONEST_CONS, HONEST_CONS_SECTION,
    PLATFORMS, PLATFORM_SECTION,
    PROBLEM_ITEMS, PROBLEM_SECTION,
    QUICK_START, QUICK_START_SECTION,
    ROADMAP_MILESTONES, ROADMAP_SECTION,
    SCREENSHOTS, SCREENSHOTS_PLATFORM_LABELS, SCREENSHOTS_SECTION,
  } from "@/lib/content";
  import { RoadmapTeaser } from "@/components/RoadmapTeaser";
  ```

  **Important — comment out both the import AND the JSX for `RoadmapTeaser` until Task 11:**
  ```tsx
  // import { RoadmapTeaser } from "@/components/RoadmapTeaser";  // ← comment out
  ```
  ```tsx
  {/* <RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} /> */}  {/* ← comment out */}
  ```

  **Also note:** After this task, `page.tsx` passes new props (`selected`, `onSelect`, `selectedPlatform`, `platformLabels`) to components whose interfaces haven't been updated yet. TypeScript will report errors on those props. This is expected — the component interfaces are updated in Chunks 3 and 4. When committing in Step 2, either use `// @ts-expect-error` inline comments on each new prop, or accept that `pnpm build` will fail until later chunks are complete. `pnpm test` (vitest) may still run successfully if your `vitest.config` doesn't do a full typecheck pass.

- [ ] **Step 2: Commit (with RoadmapTeaser import commented out)**

  ```bash
  git add app/page.tsx
  git commit -m "feat(page): add client state for platform selection, reorder sections to picker-first"
  ```

---

## Chunk 3: PlatformPicker Redesign

### Task 5: PlatformPicker sub-components

**Files:**
- Create: `components/PlatformPicker/IdeSubButton.tsx`
- Create: `components/PlatformPicker/PlatformCard.tsx`
- Create: `components/PlatformPicker/IdeGroup.tsx`

- [ ] **Step 1: Create `components/PlatformPicker/IdeSubButton.tsx`**

  A small button used inside the IDE group for VS Code and IntelliJ:

  ```tsx
  "use client";
  import type { PlatformItem, SelectedPlatform } from "@/lib/content";

  interface IdeSubButtonProps {
    platform: PlatformItem;
    selected: SelectedPlatform;
    onSelect: (id: SelectedPlatform) => void;
  }

  export function IdeSubButton({ platform, selected, onSelect }: IdeSubButtonProps): React.JSX.Element {
    const isActive = selected === platform.id;
    return (
      <button
        onClick={() => onSelect(isActive ? null : platform.id)}
        className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-3 text-center text-xs font-medium transition-all ${
          isActive
            ? "border-accent/50 bg-accent/6 text-primary shadow-[0_0_0_1px_rgba(99,179,255,0.12)]"
            : "border-border-strong bg-black/20 text-muted hover:border-accent/30 hover:text-secondary"
        }`}
      >
        <span className="text-lg">{platform.icon}</span>
        <span>{platform.name}</span>
      </button>
    );
  }
  ```

- [ ] **Step 2: Create `components/PlatformPicker/PlatformCard.tsx`**

  Standalone selectable card for Desktop and CLI:

  ```tsx
  "use client";
  import type { PlatformItem, SelectedPlatform } from "@/lib/content";

  interface PlatformCardProps {
    platform: PlatformItem;
    selected: SelectedPlatform;
    onSelect: (id: SelectedPlatform) => void;
    dimmed: boolean;
  }

  export function PlatformCard({ platform, selected, onSelect, dimmed }: PlatformCardProps): React.JSX.Element {
    const isActive = selected === platform.id;
    return (
      <button
        onClick={() => onSelect(isActive ? null : platform.id)}
        className={`tech-card flex h-full w-full flex-col gap-5 rounded-4xl border p-6 text-left transition-all ${
          isActive
            ? "border-accent/50 bg-accent/6 shadow-[0_0_0_1px_rgba(99,179,255,0.12)]"
            : "border-border-strong bg-white/3 hover:border-accent/30"
        } ${dimmed ? "opacity-45" : "opacity-100"}`}
      >
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-strong bg-white/4 text-3xl">
            {platform.icon}
          </span>
          <div className="space-y-1">
            <p className="font-semibold tracking-tight text-primary">{platform.name}</p>
            <p className="text-sm text-muted">{platform.meta}</p>
          </div>
        </div>
        <p className="leading-7 text-secondary">{platform.description}</p>
      </button>
    );
  }
  ```

- [ ] **Step 3: Create `components/PlatformPicker/IdeGroup.tsx`**

  Non-clickable container grouping VS Code + IntelliJ sub-buttons at the bottom:

  ```tsx
  "use client";
  import type { PlatformItem, SelectedPlatform } from "@/lib/content";
  import { IdeSubButton } from "./IdeSubButton";

  interface IdeGroupProps {
    vsCode: PlatformItem;
    intellij: PlatformItem;
    selected: SelectedPlatform;
    onSelect: (id: SelectedPlatform) => void;
    dimmed: boolean;
  }

  export function IdeGroup({ vsCode, intellij, selected, onSelect, dimmed }: IdeGroupProps): React.JSX.Element {
    const eitherActive = selected === "vscode" || selected === "intellij";
    return (
      <div
        className={`flex h-full flex-col rounded-4xl border p-6 transition-all ${
          eitherActive
            ? "border-accent/50 bg-accent/6"
            : "border-border-strong bg-white/3"
        } ${dimmed ? "opacity-45" : "opacity-100"}`}
      >
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-muted">
          IDE Extensions
        </p>
        <p className="mt-auto mb-4 text-center text-sm leading-6 text-secondary">
          Native history browser for your IDE
        </p>
        <div className="grid grid-cols-2 gap-3">
          <IdeSubButton platform={vsCode} selected={selected} onSelect={onSelect} />
          <IdeSubButton platform={intellij} selected={selected} onSelect={onSelect} />
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add components/PlatformPicker/
  git commit -m "feat(PlatformPicker): add IdeSubButton, PlatformCard, IdeGroup sub-components"
  ```

---

### Task 6: PlatformPicker index.tsx — new 3-card layout

**Files:**
- Create: `components/PlatformPicker/index.tsx`
- Delete: `components/PlatformPicker.tsx`

- [ ] **Step 1: Write a failing test for the new picker layout**

  In `tests/platform-picker.test.tsx`:

  ```tsx
  import { render, screen } from "@testing-library/react";
  import userEvent from "@testing-library/user-event";
  import { describe, expect, it } from "vitest";
  import { PlatformPicker } from "@/components/PlatformPicker";
  import { PLATFORM_SECTION, PLATFORMS } from "@/lib/content";

  const noop = () => {};

  describe("PlatformPicker", () => {
    it("renders the IDE group label and both sub-buttons", () => {
      render(
        <PlatformPicker
          platforms={PLATFORMS}
          section={PLATFORM_SECTION}
          selected={null}
          onSelect={noop}
        />
      );
      expect(screen.getByText("IDE Extensions")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /VS Code/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /IntelliJ/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Desktop App/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /CLI \(cch\)/i })).toBeInTheDocument();
    });

    it("shows prompt text when no platform is selected", () => {
      render(
        <PlatformPicker
          platforms={PLATFORMS}
          section={PLATFORM_SECTION}
          selected={null}
          onSelect={noop}
        />
      );
      expect(screen.getByText(/pick your environment/i)).toBeInTheDocument();
    });

    it("calls onSelect with the platform id when a card is clicked", async () => {
      const user = userEvent.setup();
      const calls: (string | null)[] = [];
      render(
        <PlatformPicker
          platforms={PLATFORMS}
          section={PLATFORM_SECTION}
          selected={null}
          onSelect={(id) => calls.push(id)}
        />
      );
      await user.click(screen.getByRole("button", { name: /Desktop App/i }));
      expect(calls).toEqual(["desktop"]);
    });
  });
  ```

- [ ] **Step 2: Run test to verify it fails**

  Run: `pnpm test tests/platform-picker.test.tsx`
  Expected: FAIL — `PlatformPicker` still has the old interface

- [ ] **Step 3: Create `components/PlatformPicker/index.tsx`**

  ```tsx
  "use client";

  import { motion, useInView } from "framer-motion";
  import { useRef } from "react";
  import { fadeUp } from "@/components/motion";
  import { Badge } from "@/components/ui/badge";
  import type { PlatformItem, SelectedPlatform, SectionContent } from "@/lib/content";
  import { IdeGroup } from "./IdeGroup";
  import { PlatformCard } from "./PlatformCard";

  interface PlatformPickerProps {
    section: SectionContent;
    platforms: PlatformItem[];
    selected: SelectedPlatform;
    onSelect: (id: SelectedPlatform) => void;
  }

  export function PlatformPicker({ section, platforms, selected, onSelect }: PlatformPickerProps): React.JSX.Element {
    const ref = useRef<HTMLElement | null>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    const desktop  = platforms.find((p) => p.id === "desktop")!;
    const vsCode   = platforms.find((p) => p.id === "vscode")!;
    const intellij = platforms.find((p) => p.id === "intellij")!;
    const cli      = platforms.find((p) => p.id === "cli")!;

    const anySelected = selected !== null;

    function isDimmed(ids: Array<PlatformItem["id"]>): boolean {
      return anySelected && !ids.includes(selected!);
    }

    return (
      <motion.section
        animate={inView ? "visible" : "hidden"}
        className="px-6 py-24 sm:px-8 lg:px-10"
        id="platform-picker"
        initial="hidden"
        ref={ref}
        variants={fadeUp}
      >
        <div className="container-shell">
          <div className="mb-12 max-w-4xl space-y-4">
            {section.eyebrow ? (
              <Badge className="section-kicker" variant="primary">
                {section.eyebrow}
              </Badge>
            ) : null}
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl lg:text-5xl">
              {section.heading}
            </h2>
            {section.description ? (
              <p className="text-lg leading-8 text-secondary">{section.description}</p>
            ) : null}
          </div>

          {!anySelected && (
            <p className="mb-6 text-center text-sm text-muted">
              Pick your environment to see a tailored experience.
            </p>
          )}

          <div className="grid gap-5 xl:grid-cols-3">
            <PlatformCard
              platform={desktop}
              selected={selected}
              onSelect={onSelect}
              dimmed={isDimmed(["desktop"])}
            />
            <IdeGroup
              vsCode={vsCode}
              intellij={intellij}
              selected={selected}
              onSelect={onSelect}
              dimmed={isDimmed(["vscode", "intellij"])}
            />
            <PlatformCard
              platform={cli}
              selected={selected}
              onSelect={onSelect}
              dimmed={isDimmed(["cli"])}
            />
          </div>
        </div>
      </motion.section>
    );
  }
  ```

- [ ] **Step 4: Delete `components/PlatformPicker.tsx`**

  ```bash
  rm components/PlatformPicker.tsx
  ```

- [ ] **Step 5: Run tests**

  Run: `pnpm test tests/platform-picker.test.tsx`
  Expected: PASS

- [ ] **Step 6: Commit**

  ```bash
  git add components/PlatformPicker/ && git rm components/PlatformPicker.tsx
  git commit -m "feat(PlatformPicker): redesign with 3-card layout, IDE group, and platform selection"
  ```

---

## Chunk 4: Platform-Aware Sections + QuickStart Tabs

### Task 7: FeaturesGrid — platform-aware highlighting

**Files:**
- Modify: `components/FeaturesGrid.tsx`

- [ ] **Step 1: Write a failing test**

  In `tests/features-grid.test.tsx`:

  ```tsx
  import { render, screen } from "@testing-library/react";
  import { describe, expect, it } from "vitest";
  import { FeaturesGrid } from "@/components/FeaturesGrid";
  import { FEATURES, FEATURES_SECTION } from "@/lib/content";

  describe("FeaturesGrid", () => {
    it("renders all 8 features", () => {
      render(<FeaturesGrid features={FEATURES} section={FEATURES_SECTION} selectedPlatform={null} />);
      expect(screen.getByText("Terminal-native CLI")).toBeInTheDocument();
      expect(screen.getByText("Cross-assistant ready")).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 2: Run test to verify it fails**

  Run: `pnpm test tests/features-grid.test.tsx`
  Expected: FAIL — missing `selectedPlatform` prop + new features not in data yet

- [ ] **Step 3: Update `FeaturesGrid.tsx`**

  Add `selectedPlatform: SelectedPlatform` to the props interface. Update the feature card rendering to apply highlight/dim class based on platform affinity:

  The existing `motion.div` already animates `opacity` via the `staggerItem` variant — do NOT add a Tailwind opacity class to it, as Framer Motion and Tailwind will conflict on the same `opacity` property. Instead, wrap the `motion.div` in an outer `<div>` that handles the dim transition:

  ```tsx
  import type { FeatureItem, SelectedPlatform, SectionContent } from "@/lib/content";

  interface FeaturesGridProps {
    section: SectionContent;
    features: FeatureItem[];
    selectedPlatform: SelectedPlatform;
  }

  // Inside the features.map(), replace:
  //   <motion.div key={feature.title} variants={staggerItem}>
  //     <Card className="tech-card h-full">
  // With:
  {features.map((feature) => {
    const isHighlighted =
      selectedPlatform !== null &&
      (feature.platforms?.includes(selectedPlatform) ?? false);
    const isDimmed =
      selectedPlatform !== null &&
      !(feature.platforms?.includes(selectedPlatform) ?? false);

    return (
      <div
        key={feature.title}
        className={`transition-opacity duration-200 ${isDimmed ? "opacity-40" : "opacity-100"}`}
      >
        <motion.div variants={staggerItem}>
          <Card className={`tech-card h-full transition-colors ${
            isHighlighted ? "border-accent/30 bg-accent/6" : ""
          }`}>
            {/* ... existing card content unchanged ... */}
          </Card>
        </motion.div>
      </div>
    );
  })}
  ```

  The outer `<div>` owns the Tailwind `opacity` transition; the inner `motion.div` owns the Framer Motion `staggerItem` animation. They operate on different elements, no conflict.

- [ ] **Step 4: Run tests**

  Run: `pnpm test tests/features-grid.test.tsx`
  Expected: PASS

- [ ] **Step 5: Commit**

  ```bash
  git add components/FeaturesGrid.tsx tests/features-grid.test.tsx
  git commit -m "feat(FeaturesGrid): add platform-aware highlight/dim + 8 features"
  ```

---

### Task 8: Screenshots — platform label

**Files:**
- Modify: `components/Screenshots.tsx`

- [ ] **Step 1: Update `Screenshots.tsx` to accept and render platform label**

  ```tsx
  import type { ScreenshotSlot, SelectedPlatform, SectionContent, PlatformItem } from "@/lib/content";

  interface ScreenshotsProps {
    section: SectionContent;
    shots: ScreenshotSlot[];
    selectedPlatform: SelectedPlatform;
    platformLabels: Partial<Record<PlatformItem["id"], string>>;
  }

  export function Screenshots({ section, shots, selectedPlatform, platformLabels }: ScreenshotsProps): React.JSX.Element {
    // Inside the section, after the heading block, before the screenshot grid:
    const platformLabel = selectedPlatform ? platformLabels[selectedPlatform] : null;

    // Add after the heading block:
    {platformLabel && (
      <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-accent-strong">
        {platformLabel}
      </p>
    )}
  ```

  No other changes to the component.

- [ ] **Step 2: Commit**

  ```bash
  git add components/Screenshots.tsx
  git commit -m "feat(Screenshots): show platform-specific label when a platform is selected"
  ```

---

### Task 9: QuickStart — convert to tabs + CLI + selectedPlatform sync

**Files:**
- Create: `components/QuickStart/QuickStartTabBar.tsx`
- Create: `components/QuickStart/QuickStartCodePanel.tsx`
- Create: `components/QuickStart/index.tsx`
- Delete: `components/QuickStart.tsx`

- [ ] **Step 1: Create `components/QuickStart/QuickStartTabBar.tsx`**

  ```tsx
  "use client";
  import type { QuickStartBlock } from "@/lib/content";

  interface QuickStartTabBarProps {
    blocks: QuickStartBlock[];
    activeId: string;
    onTabChange: (id: string) => void;
  }

  export function QuickStartTabBar({ blocks, activeId, onTabChange }: QuickStartTabBarProps): React.JSX.Element {
    return (
      <div className="mb-6 flex gap-1 rounded-2xl border border-border bg-black/20 p-1">
        {blocks.map((block) => (
          <button
            key={block.platformId}
            onClick={() => onTabChange(block.platformId)}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              activeId === block.platformId
                ? "bg-accent/10 text-primary shadow-[0_0_0_1px_rgba(99,179,255,0.2)]"
                : "text-muted hover:text-secondary"
            }`}
          >
            {block.platformName}
          </button>
        ))}
      </div>
    );
  }
  ```

- [ ] **Step 2: Create `components/QuickStart/QuickStartCodePanel.tsx`**

  Move the code rendering logic from the old `QuickStart.tsx` grid card into a focused component:

  ```tsx
  "use client";
  import { Card } from "@/components/ui/card";
  import type { QuickStartBlock } from "@/lib/content";

  const accentMap: Record<"orange" | "blue" | "violet" | "green", string> = {
    orange: "bg-accent-secondary",
    blue:   "bg-accent",
    violet: "bg-violet-400",
    green:  "bg-green-400",
  };

  interface QuickStartCodePanelProps {
    block: QuickStartBlock;
  }

  export function QuickStartCodePanel({ block }: QuickStartCodePanelProps): React.JSX.Element {
    return (
      <Card className="tech-card p-6">
        <div className="mb-5 flex items-center gap-3">
          <span
            className={`h-3 w-3 rounded-full shadow-[0_0_24px_currentColor] ${accentMap[block.accentColor]}`}
          />
          <p className="font-medium tracking-tight text-primary">{block.platformName}</p>
        </div>
        <pre className="terminal-block overflow-x-auto rounded-3xl border border-white/6 p-5 leading-7 text-primary">
          <code className="font-mono">
            {block.steps.map((line, index) => {
              if (line.length === 0) {
                return <span className="block h-4" key={`${block.platformId}-${index}`} />;
              }
              const lineClassName = line.startsWith("#") ? "text-emerald-300/80" : "text-primary";
              return (
                <span
                  className={`block whitespace-pre-wrap ${lineClassName}`}
                  key={`${block.platformId}-${index}`}
                >
                  {line}
                </span>
              );
            })}
          </code>
        </pre>
      </Card>
    );
  }
  ```

- [ ] **Step 3: Write a failing test**

  In `tests/quick-start.test.tsx`:

  ```tsx
  import { render, screen } from "@testing-library/react";
  import userEvent from "@testing-library/user-event";
  import { describe, expect, it } from "vitest";
  import { QuickStart } from "@/components/QuickStart";
  import { QUICK_START, QUICK_START_SECTION } from "@/lib/content";

  describe("QuickStart", () => {
    it("shows desktop tab content by default", () => {
      render(
        <QuickStart blocks={QUICK_START} section={QUICK_START_SECTION} selectedPlatform={null} />
      );
      expect(screen.getByText("pnpm run dev")).toBeInTheDocument();
    });

    it("switches tab when selectedPlatform changes", () => {
      const { rerender } = render(
        <QuickStart blocks={QUICK_START} section={QUICK_START_SECTION} selectedPlatform={null} />
      );
      rerender(
        <QuickStart blocks={QUICK_START} section={QUICK_START_SECTION} selectedPlatform="cli" />
      );
      expect(screen.getByText("cch browse")).toBeInTheDocument();
    });

    it("renders all 4 tab labels", () => {
      render(
        <QuickStart blocks={QUICK_START} section={QUICK_START_SECTION} selectedPlatform={null} />
      );
      expect(screen.getByRole("button", { name: "Desktop App" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "VS Code Extension" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "IntelliJ Plugin" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "CLI (cch)" })).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 4: Run test to verify it fails**

  Run: `pnpm test tests/quick-start.test.tsx`
  Expected: FAIL

- [ ] **Step 5: Create `components/QuickStart/index.tsx`**

  ```tsx
  "use client";

  import { motion, useInView } from "framer-motion";
  import { useEffect, useRef, useState } from "react";
  import { fadeUp } from "@/components/motion";
  import { Badge } from "@/components/ui/badge";
  import type { QuickStartBlock, SelectedPlatform, SectionContent } from "@/lib/content";
  import { QuickStartCodePanel } from "./QuickStartCodePanel";
  import { QuickStartTabBar } from "./QuickStartTabBar";

  interface QuickStartProps {
    section: SectionContent;
    blocks: QuickStartBlock[];
    selectedPlatform: SelectedPlatform;
  }

  export function QuickStart({ section, blocks, selectedPlatform }: QuickStartProps): React.JSX.Element {
    const ref = useRef<HTMLElement | null>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const [activeId, setActiveId] = useState<string>(blocks[0]?.platformId ?? "desktop");

    useEffect(() => {
      if (selectedPlatform !== null) {
        const match = blocks.find((b) => b.platformId === selectedPlatform);
        if (match) setActiveId(match.platformId);
      }
    }, [selectedPlatform, blocks]);

    const activeBlock = blocks.find((b) => b.platformId === activeId) ?? blocks[0];

    return (
      <motion.section
        animate={inView ? "visible" : "hidden"}
        className="px-6 py-24 sm:px-8 lg:px-10"
        id="quick-start"
        initial="hidden"
        ref={ref}
        variants={fadeUp}
      >
        <div className="container-shell">
          <div className="mb-12 max-w-4xl space-y-4">
            {section.eyebrow ? (
              <Badge className="section-kicker" variant="neutral">
                {section.eyebrow}
              </Badge>
            ) : null}
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl lg:text-6xl">
              {section.heading}
            </h2>
          </div>
          <QuickStartTabBar blocks={blocks} activeId={activeId} onTabChange={setActiveId} />
          {activeBlock && <QuickStartCodePanel block={activeBlock} />}
        </div>
      </motion.section>
    );
  }
  ```

- [ ] **Step 6: Delete `components/QuickStart.tsx`**

  ```bash
  rm components/QuickStart.tsx
  ```

- [ ] **Step 7: Run tests**

  Run: `pnpm test tests/quick-start.test.tsx`
  Expected: PASS

- [ ] **Step 8: Commit**

  ```bash
  git add components/QuickStart/ tests/quick-start.test.tsx && git rm components/QuickStart.tsx
  git commit -m "feat(QuickStart): convert grid to tabbed UI, add CLI tab, sync with selectedPlatform"
  ```

---

## Chunk 5: RoadmapTeaser + Final Wiring

### Task 10: RoadmapTeaser sub-components

**Files:**
- Create: `components/RoadmapTeaser/WaitlistForm.tsx`
- Create: `components/RoadmapTeaser/RoadmapMilestoneNode.tsx`
- Create: `components/RoadmapTeaser/RoadmapMilestoneCard.tsx`

- [ ] **Step 1: Create `components/RoadmapTeaser/WaitlistForm.tsx`**

  ```tsx
  "use client";
  import { useState } from "react";

  export function WaitlistForm(): React.JSX.Element {
    const [submitted, setSubmitted] = useState(false);

    return (
      <div className="mt-16 rounded-4xl border border-[rgba(240,138,36,0.18)] bg-[linear-gradient(135deg,rgba(240,138,36,0.06),rgba(99,179,255,0.03))] p-8 text-center">
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-primary">
          Get notified when it ships.
        </h3>
        <p className="mt-2 text-sm text-secondary">
          One email when multi-assistant support lands. No spam.
        </p>
        {submitted ? (
          <p className="mt-6 font-medium text-accent-strong">You're on the list ✓</p>
        ) : (
          <div className="mt-6 flex justify-center gap-3">
            <input
              type="email"
              placeholder="you@company.com"
              className="w-64 rounded-xl border border-border bg-black/30 px-4 py-2 text-sm text-primary placeholder:text-muted focus:border-accent/50 focus:outline-none"
            />
            <button
              onClick={() => setSubmitted(true)}
              className="rounded-xl bg-accent-secondary px-5 py-2 text-sm font-semibold text-[#070b11] transition-colors hover:bg-[#ffab52]"
            >
              Notify me
            </button>
          </div>
        )}
        <p className="mt-3 text-xs text-muted">No spam. One email when it's ready.</p>
      </div>
    );
  }
  ```

- [ ] **Step 2: Create `components/RoadmapTeaser/RoadmapMilestoneNode.tsx`**

  The circular node on the central spine:

  ```tsx
  "use client";
  import type { RoadmapMilestone } from "@/lib/content";

  interface RoadmapMilestoneNodeProps {
    milestone: RoadmapMilestone;
    isOpen: boolean;
    onClick: () => void;
  }

  const nodeStyles: Record<RoadmapMilestone["status"], string> = {
    shipped: "border-[rgba(116,151,199,0.3)] bg-[rgba(116,151,199,0.08)] text-[#607089]",
    soon:    "border-[rgba(240,138,36,0.7)] bg-[rgba(240,138,36,0.15)] text-[#f08a24] shadow-[0_0_0_6px_rgba(240,138,36,0.08),0_0_18px_rgba(240,138,36,0.25)]",
    planned: "border-[rgba(116,151,199,0.14)] bg-[rgba(11,19,31,0.9)] text-[#3a4e64]",
    future:  "border-[rgba(116,151,199,0.10)] bg-[rgba(11,19,31,0.9)] text-[#2a3a4a]",
  };

  const nodeSymbol: Record<RoadmapMilestone["status"], string> = {
    shipped: "✓",
    soon:    "→",
    planned: "···",
    future:  "···",
  };

  export function RoadmapMilestoneNode({ milestone, isOpen, onClick }: RoadmapMilestoneNodeProps): React.JSX.Element {
    return (
      <button
        onClick={onClick}
        className={`relative z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 text-sm font-bold transition-transform hover:scale-110 ${nodeStyles[milestone.status]}`}
        aria-expanded={isOpen}
      >
        {nodeSymbol[milestone.status]}
        {milestone.status === "soon" && (
          <span className="absolute inset-0 rounded-full animate-ping border-2 border-[rgba(240,138,36,0.4)]" />
        )}
      </button>
    );
  }
  ```

- [ ] **Step 3: Create `components/RoadmapTeaser/RoadmapMilestoneCard.tsx`**

  The content card that shows on left or right of the spine:

  ```tsx
  "use client";
  import { AnimatePresence, motion } from "framer-motion";
  import type { RoadmapMilestone } from "@/lib/content";

  interface RoadmapMilestoneCardProps {
    milestone: RoadmapMilestone;
    isOpen: boolean;
    onClick: () => void;
  }

  const cardBorder: Record<RoadmapMilestone["status"], string> = {
    shipped: "border-[rgba(116,151,199,0.16)]",
    soon:    "border-[rgba(240,138,36,0.3)] bg-[rgba(240,138,36,0.04)]",
    planned: "border-[rgba(116,151,199,0.08)]",
    future:  "border-[rgba(116,151,199,0.06)]",
  };

  export function RoadmapMilestoneCard({ milestone, isOpen, onClick }: RoadmapMilestoneCardProps): React.JSX.Element {
    const titleColor = milestone.status === "shipped"
      ? "text-[#607089]"
      : milestone.status === "soon"
        ? "text-[#f08a24]"
        : "text-[#3a4e64]";

    return (
      <button
        onClick={onClick}
        className={`w-full cursor-pointer rounded-3xl border bg-[rgba(11,19,31,0.8)] p-4 text-left transition-all hover:-translate-y-0.5 ${cardBorder[milestone.status]}`}
      >
        <p className={`mb-3 text-sm font-bold ${titleColor}`}>{milestone.title}</p>
        <div className="flex flex-wrap gap-2">
          {milestone.providers.map((p) => (
            <span
              key={p.name}
              className="flex items-center gap-2 rounded-xl border border-[rgba(116,151,199,0.12)] bg-[rgba(11,19,31,0.8)] px-3 py-2 text-xs"
            >
              <span>{p.icon}</span>
              <span>
                <span className={`block font-semibold ${titleColor}`}>{p.name}</span>
                <span className="text-[#3a4e64]">{p.type}</span>
              </span>
            </span>
          ))}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden text-sm leading-6 text-secondary"
            >
              {milestone.detail}
            </motion.p>
          )}
        </AnimatePresence>
      </button>
    );
  }
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add components/RoadmapTeaser/
  git commit -m "feat(RoadmapTeaser): add WaitlistForm, RoadmapMilestoneNode, RoadmapMilestoneCard sub-components"
  ```

---

### Task 11: RoadmapTeaser index.tsx + wire into page.tsx

**Files:**
- Create: `components/RoadmapTeaser/index.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write a failing test**

  In `tests/roadmap-teaser.test.tsx`:

  ```tsx
  import { render, screen } from "@testing-library/react";
  import userEvent from "@testing-library/user-event";
  import { describe, expect, it } from "vitest";
  import { RoadmapTeaser } from "@/components/RoadmapTeaser";
  import { ROADMAP_MILESTONES, ROADMAP_SECTION } from "@/lib/content";

  describe("RoadmapTeaser", () => {
    it("renders all milestone titles", () => {
      render(<RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />);
      expect(screen.getByText("Claude Code")).toBeInTheDocument();
      expect(screen.getByText("Coming soon")).toBeInTheDocument();
      expect(screen.getByText("Planned")).toBeInTheDocument();
      expect(screen.getByText("Future")).toBeInTheDocument();
    });

    it("renders the section heading", () => {
      render(<RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />);
      expect(screen.getByRole("heading", { name: "Beyond Claude Code." })).toBeInTheDocument();
    });

    it("renders the waitlist form", () => {
      render(<RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />);
      expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Notify me" })).toBeInTheDocument();
    });

    it("shows success message after waitlist submit", async () => {
      const user = userEvent.setup();
      render(<RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />);
      await user.click(screen.getByRole("button", { name: "Notify me" }));
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 2: Run test to verify it fails**

  Run: `pnpm test tests/roadmap-teaser.test.tsx`
  Expected: FAIL — component doesn't exist yet

- [ ] **Step 3: Create `components/RoadmapTeaser/index.tsx`**

  The spine is a CSS gradient pseudo-element; milestones alternate left/right.

  ```tsx
  "use client";

  import { motion, useInView } from "framer-motion";
  import { useRef, useState } from "react";
  import { fadeUp } from "@/components/motion";
  import { Badge } from "@/components/ui/badge";
  import type { RoadmapMilestone, SectionContent } from "@/lib/content";
  import { RoadmapMilestoneCard } from "./RoadmapMilestoneCard";
  import { RoadmapMilestoneNode } from "./RoadmapMilestoneNode";
  import { WaitlistForm } from "./WaitlistForm";

  interface RoadmapTeaserProps {
    milestones: RoadmapMilestone[];
    section: SectionContent;
  }

  export function RoadmapTeaser({ milestones, section }: RoadmapTeaserProps): React.JSX.Element {
    const ref = useRef<HTMLElement | null>(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    function toggleOpen(index: number): void {
      setOpenIndex(openIndex === index ? null : index);
    }

    return (
      <motion.section
        animate={inView ? "visible" : "hidden"}
        className="px-6 py-24 sm:px-8 lg:px-10"
        initial="hidden"
        ref={ref}
        variants={fadeUp}
      >
        <div className="container-shell max-w-3xl">
          <div className="mb-16 space-y-4 text-center">
            {section.eyebrow && (
              <Badge className="section-kicker" variant="secondary">
                {section.eyebrow}
              </Badge>
            )}
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.05em] text-primary sm:text-4xl lg:text-5xl">
              {section.heading}
            </h2>
            {section.description && (
              <p className="mx-auto max-w-lg text-base leading-7 text-secondary">
                {section.description}
              </p>
            )}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Gradient spine */}
            <div
              className="absolute left-1/2 top-5 -translate-x-1/2 w-0.5 bottom-5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(116,151,199,0.22) 0%, rgba(116,151,199,0.22) 22%, rgba(240,138,36,0.5) 38%, #f08a24 50%, rgba(240,138,36,0.5) 62%, rgba(116,151,199,0.08) 100%)",
              }}
            />

            <div className="space-y-16">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                const isOpen = openIndex === index;
                return (
                  <div key={milestone.timeLabel} className="relative grid grid-cols-[1fr_56px_1fr] items-center gap-4">
                    {/* Left slot */}
                    <div className={isLeft ? "text-right" : ""}>
                      {isLeft ? (
                        <RoadmapMilestoneCard
                          milestone={milestone}
                          isOpen={isOpen}
                          onClick={() => toggleOpen(index)}
                        />
                      ) : (
                        <p className="text-right text-xs font-bold uppercase tracking-[0.18em] text-muted">
                          {milestone.timeLabel}
                        </p>
                      )}
                    </div>

                    {/* Center node */}
                    <div className="flex justify-center">
                      <RoadmapMilestoneNode
                        milestone={milestone}
                        isOpen={isOpen}
                        onClick={() => toggleOpen(index)}
                      />
                    </div>

                    {/* Right slot */}
                    <div>
                      {!isLeft ? (
                        <RoadmapMilestoneCard
                          milestone={milestone}
                          isOpen={isOpen}
                          onClick={() => toggleOpen(index)}
                        />
                      ) : (
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                          {milestone.timeLabel}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <WaitlistForm />
        </div>
      </motion.section>
    );
  }
  ```

- [ ] **Step 4: Uncomment `RoadmapTeaser` in `app/page.tsx`**

  Uncomment BOTH the import line and the JSX usage added in Task 4 Step 1:
  ```tsx
  import { RoadmapTeaser } from "@/components/RoadmapTeaser";  // ← uncomment
  ```
  ```tsx
  <RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />  // ← uncomment (remove JSX comment wrapper)
  ```

- [ ] **Step 5: Run tests**

  Run: `pnpm test tests/roadmap-teaser.test.tsx`
  Expected: PASS

- [ ] **Step 6: Commit**

  ```bash
  git add components/RoadmapTeaser/ app/page.tsx tests/roadmap-teaser.test.tsx
  git commit -m "feat(RoadmapTeaser): vertical timeline with alternating milestones, accordion, waitlist form"
  ```

---

### Task 12: Update tests + verify full build

**Files:**
- Modify: `tests/content.test.ts`
- Modify: `tests/page.test.tsx`

- [ ] **Step 1: Update `content.test.ts` for new data**

  Replace the entire test body to reflect the new data values:

  ```ts
  describe("content", () => {
    it("exports the full landing page content model", () => {
      expect(SITE_METADATA.title).toBe("Threadbase");
      expect(HERO.headline).toBe(
        "Your AI session history is a goldmine. Start mining it.",
      );
      expect(PROBLEM_ITEMS).toHaveLength(3);
      expect(FEATURES).toHaveLength(8);
      expect(PLATFORMS).toHaveLength(4);
      expect(SCREENSHOTS).toHaveLength(3);
      expect(HONEST_CONS).toHaveLength(4);
      expect(QUICK_START).toHaveLength(4);
      expect(FOOTER.githubUrl).toContain("github.com");
    });

    it("keeps quick-start blocks aligned to known platforms", () => {
      expect(QUICK_START.map((item) => item.platformId)).toEqual(
        PLATFORMS.map((platform) => platform.id),
      );
    });
  });
  ```

- [ ] **Step 2: Update `page.test.tsx` for new content strings and tab-based QuickStart**

  Update the `"renders the full landing page narrative"` test:

  ```tsx
  // Change old heading assertions:
  // OLD: "Your Claude Code history is a goldmine. Start mining it."
  // NEW:
  expect(screen.getByRole("heading", {
    name: "Your AI session history is a goldmine. Start mining it.",
  })).toBeInTheDocument();

  // OLD: "Three platforms. One history."
  // NEW:
  expect(screen.getByRole("heading", {
    name: "Four platforms. One history.",
  })).toBeInTheDocument();

  // ADD: roadmap section
  expect(screen.getByRole("heading", { name: "Beyond Claude Code." })).toBeInTheDocument();
  ```

  Update the `"renders install choices and quick-start commands from content"` test:

  The QuickStart is now tabbed — only the active tab's code is visible. Update to check for tab labels (always visible in the tab bar) rather than the code lines:

  ```tsx
  it("renders install choices and quick-start commands from content", () => {
    render(<Home />);

    // Platform picker cards are present
    for (const platform of PLATFORMS) {
      if (platform.id === "vscode" || platform.id === "intellij") {
        // These are sub-buttons in the IDE group
        expect(screen.getByRole("button", { name: new RegExp(platform.name, "i") })).toBeInTheDocument();
      } else {
        expect(screen.getByRole("button", { name: new RegExp(platform.name, "i") })).toBeInTheDocument();
      }
    }

    // QuickStart tab bar renders all tab labels
    for (const block of QUICK_START) {
      expect(screen.getByRole("button", { name: block.platformName })).toBeInTheDocument();
    }

    // Active tab (desktop by default) content is visible
    const desktopBlock = QUICK_START.find((b) => b.platformId === "desktop")!;
    for (const line of desktopBlock.steps) {
      if (line.length === 0) continue;
      expect(screen.getAllByText(line).length).toBeGreaterThan(0);
    }
  });
  ```

- [ ] **Step 3: Run all tests**

  Run: `pnpm test`
  Expected: ALL PASS

- [ ] **Step 4: Run build to verify no TypeScript errors**

  Run: `pnpm build`
  Expected: Build succeeds with no type errors

- [ ] **Step 5: Commit**

  ```bash
  git add tests/content.test.ts tests/page.test.tsx
  git commit -m "test: update content + page tests for Threadbase rebrand, 4 platforms, tabbed QuickStart, roadmap section"
  ```

- [ ] **Step 6: Final smoke — start dev server and visually verify**

  Run: `pnpm dev`

  Check:
  - Page loads without errors
  - Hero shows new Threadbase headline
  - Platform picker shows 3 columns (Desktop | IDE group | CLI) with VS Code + IntelliJ sub-buttons
  - Clicking Desktop selects it and dims others
  - Features grid highlights relevant features for selected platform
  - QuickStart shows tab bar with 4 tabs
  - Roadmap teaser shows timeline with 4 milestones alternating left/right
  - Clicking a milestone node expands the accordion
  - Clicking "Notify me" shows success message

- [ ] **Step 7: Final commit**

  ```bash
  git add -A
  git commit -m "chore: verify Threadbase landing page implementation complete"
  ```
