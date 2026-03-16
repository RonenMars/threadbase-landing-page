# Threadbase Landing Page — Plan

> Original build plan appended below the update plan.

---

## Update Plan: Milestone 1 Completions + CLI + Roadmap Teaser

> Status: Planning — 2026-03-16
> Milestone 1 is complete across all four platforms. The landing page needs to reflect new capabilities, a fourth platform (CLI), and the multi-assistant roadmap.

### Background

The landing page was built to market three platforms with six generic feature cards. Since then:

- **Milestone 1 shipped** across all four platforms — significant new capabilities.
- A **fourth platform** (CLI `cch`) is a working tool with its own feature set.
- A **multi-assistant provider roadmap** is designed and documented.
- Product identity is shifting toward **Threadbase** as the primary name.

All copy lives in `lib/content.ts`. Most updates are pure data changes.

---

### Update 1 — Product Identity

**File:** `lib/content.ts`

- `SITE_METADATA.title` → `"Threadbase — AI Session Browser"`
- `SITE_METADATA.description` → `"Threadbase turns raw AI coding session files into a searchable local knowledge base across desktop, IDE, and terminal workflows."`
- `HERO.headline` → `"Your AI coding history is a goldmine. Start mining it."`
- `HERO.subheadline` → reference "AI coding sessions" broadly, not just Claude Code
- `HERO.badges` → add `{ label: "CLI (cch)" }` and `{ label: "Multi-assistant roadmap" }`
- `FOOTER.productName` → `"Threadbase"`
- `FOOTER.tagline` → `"Built by developers who use AI coding tools seriously."`

---

### Update 2 — Add CLI as Fourth Platform

**Files:** `lib/content.ts`, minor adjustments in `components/QuickStart.tsx` if needed

1. Extend `PlatformItem["id"]` union to include `"cli"`.

2. Add to `PLATFORMS`:
   ```typescript
   {
     id: "cli",
     icon: "⌨",
     name: "CLI (cch)",
     meta: "macOS · Linux · Windows",
     description: "A scriptable Go CLI for listing, searching, and exporting sessions in pipelines. Outputs JSON for jq composition.",
     ctaLabel: "Install CLI",
     ctaHref: "#quick-start",
     badge: "Terminal-First",
   }
   ```

3. `PLATFORM_SECTION.heading` → `"Four platforms. One history."`

4. Add CLI CTA to `HERO.ctas`:
   ```typescript
   { label: "Install CLI (cch)", href: "#platform-picker", variant: "outline" }
   ```

5. Add CLI `QuickStartBlock` to `QUICK_START`:
   ```typescript
   {
     platformId: "cli",
     platformName: "CLI (cch)",
     accentColor: "green",
     steps: [
       "# 1. Enter the CLI directory",
       "cd threadbase-cli",
       "",
       "# 2. Build the binary",
       "go build -o cch ./cmd/cch",
       "",
       "# 3. List recent sessions",
       "cch list --sort recent",
       "",
       "# 4. Search and pipe to jq",
       "cch search \"auth\" --json | jq '.[].title'",
     ],
   }
   ```

---

### Update 3 — Refresh Features Grid (6 → 8 features)

**File:** `lib/content.ts` — `FEATURES` array

Replace the existing 6 generic entries with 8 that reflect shipped capabilities:

```typescript
[
  {
    icon: "⌕",
    title: "Full-text search",
    description: "Search every session, project name, and message content with results as you type — across thousands of conversations.",
  },
  {
    icon: "🗂",
    title: "Project-grouped browser",
    description: "Browse sessions by project with six sort options, date range filters, and profile-level scoping.",
  },
  {
    icon: "⋇",
    title: "Rich tool result cards",
    description: "Diffs, terminal output, file operations, and task agent cards — each rendered in its native format instead of raw JSON.",
  },
  {
    icon: "◫",
    title: "Multi-profile support",
    description: "Index multiple Claude config directories side by side with per-profile usage stats and recency tracking.",
  },
  {
    icon: "⇪",
    title: "Export and copy",
    description: "Export any session to Markdown, plain text, or JSON. Copy individual messages cleanly to clipboard.",
  },
  {
    icon: "▣",
    title: "Resume sessions",
    description: "The desktop app relaunches sessions in an embedded terminal. IntelliJ routes to the IDE's built-in terminal.",
  },
  {
    icon: "⎇",
    title: "Git-aware browsing",
    description: "Sessions show git branch names. The desktop app includes a full worktrees panel with creation UI.",
  },
  {
    icon: "⌨",
    title: "Scriptable CLI",
    description: "cch list and cch search with --json compose cleanly in pipelines. Includes profile management and date filters.",
  },
]
```

Update `FEATURES_SECTION.description` to mention git and CLI features.

---

### Update 4 — Multi-Assistant Roadmap Teaser Section

**Files:** `lib/content.ts`, `components/RoadmapTeaser.tsx` (new), `app/page.tsx`

#### `lib/content.ts` — new types and export

```typescript
export interface RoadmapItem {
  name: string;
  storage: string;
  tier: "Tier 1" | "Tier 2" | "Tier 3";
}

export interface RoadmapSectionContent {
  eyebrow: string;
  heading: string;
  description: string;
  items: RoadmapItem[];
}

export const ROADMAP: RoadmapSectionContent = {
  eyebrow: "Coming next",
  heading: "Beyond Claude Code.",
  description:
    "Threadbase is building a provider layer to index sessions from other AI coding tools alongside Claude Code. One browser for all your AI pair-programming history.",
  items: [
    { name: "OpenAI Codex CLI", storage: "~/.codex/sessions/", tier: "Tier 1" },
    { name: "Continue.dev", storage: "~/.continue/sessions/", tier: "Tier 1" },
    { name: "OpenCode", storage: "~/.local/share/opencode/", tier: "Tier 2" },
    { name: "Amazon Q Developer CLI", storage: "~/.local/share/amazon-q/", tier: "Tier 2" },
    { name: "Aider", storage: "./.aider.chat.history.md", tier: "Tier 3" },
    { name: "Cline (VS Code)", storage: "VS Code globalStorage", tier: "Tier 3" },
  ],
};
```

#### `components/RoadmapTeaser.tsx` (new)

- Framer Motion reveal (same pattern as other sections)
- Eyebrow + heading + description
- Provider cards grid: name, storage hint, tier badge (Tier 1 = cyan, Tier 2 = yellow, Tier 3 = slate)
- No CTAs — informational only

#### `app/page.tsx`

Insert `<RoadmapTeaser roadmap={ROADMAP} />` after `<QuickStart />`, before `<Footer />`.

---

### Update 5 — Honest Cons Refresh

**File:** `lib/content.ts` — `HONEST_CONS`

1. Replace `"IntelliJ plugin is still in progress"` with:
   ```typescript
   {
     title: "IDE plugins track IDE release cycles",
     description: "The IntelliJ plugin targets specific IntelliJ Platform builds. Very new beta IDEs may need a compatibility update before they're supported.",
   }
   ```

2. Replace `"Claude Code users only"` with a forward-looking version:
   ```typescript
   {
     title: "Currently Claude Code only (multi-assistant coming)",
     description:
       "All four platforms currently read Claude Code sessions. Support for Codex CLI, Continue.dev, OpenCode, and others is planned for Milestone 2.",
   }
   ```

---

### Update 6 — Hero Copy (Optional Polish)

**File:** `lib/content.ts` — `HERO.shellStages`

Update `workflowSteps` to be less Claude-specific:
```typescript
workflowSteps: ["Decode sessions", "Inspect structure", "Search history", "Resume or export"]
```

Update `deep-view` stage `browserTerminal`:
```
cch resume session_014   # or: claude --resume session_014
```

---

### Implementation Order

1. `lib/content.ts` — all data updates (Updates 1–5; 6 optional)
2. `components/RoadmapTeaser.tsx` — new component
3. `app/page.tsx` — insert `<RoadmapTeaser />`
4. `npx tsc --noEmit` — type check
5. `npm run dev` — visual review
6. `npm run build` — static export check

---

### Non-Goals

- Real screenshots (deferred until all platforms reach stable state)
- Blog or changelog section
- Dark/light mode toggle
- Analytics integration

---

---

## Original Build Plan (reference)

**Goal:** Build a static Next.js landing page in this workspace for Claude Code History Browser, following the approved Signal Console design and the content structure from `nextjs-landing-page-prompt.md`.

**Architecture:** Bootstrap a Next.js 15 App Router project in the current directory, define all copy and typed data in `lib/content.ts`, compose the page in `app/page.tsx`, and keep section components presentational. Use Framer Motion for reveal choreography and `tailwindcss-motion` for high-quality micro-interactions while preserving static export compatibility.

**Tech Stack:** Next.js 15, React 19, TypeScript strict mode, Tailwind CSS v4, Framer Motion, `tailwindcss-motion`, shadcn/ui, Geist Sans, Geist Mono.

### Execution Order (original)

1. Verify current official docs for Next.js 15, Tailwind CSS v4, Framer Motion, and `tailwindcss-motion`.
2. Scaffold the Next.js app in the current directory and install dependencies.
3. Write failing tests for page composition and content wiring.
4. Create the typed `lib/content.ts` data model.
5. Add global visual system styles and shared UI/motion helpers.
6. Implement sections incrementally: Hero, ProblemSection, FeaturesGrid, PlatformPicker, Screenshots, HonestCons, QuickStart, Footer.
7. Configure metadata, fonts, and `next.config.ts` static export settings.
8. Add restrained interaction polish with `tailwindcss-motion`.
9. Run final verification: lint, build, tests, `any` grep, dev server, responsive/manual checks.

### Non-Negotiables (original)

- All user-facing copy lives in `lib/content.ts`
- No `any` types
- Semantic sections and headings
- Static export compatible
- Framer Motion for reveal choreography
- `tailwindcss-motion` for additional interaction polish
- Visual direction: dark, steel-blue/cyan-led, technical, and professional
