# Threadbase Landing Page — Design Spec
**Date:** 2026-03-16
**Status:** Approved for implementation

---

## 1. Overview

Transform the existing Next.js 15 landing page from an informational product listing into a premium, interactive developer-tool experience — comparable to Vercel, Linear, and Raycast in aesthetic and feel.

The core interaction model: a platform picker near the top of the page that personalizes every section below it. Visitors who don't pick a platform see general but relevant content; visitors who pick one see a fully tailored experience.

---

## 2. Brand Rename

Replace all instances of "Claude Code History Browser" with **Threadbase** throughout:

- `SITE_METADATA.title` and `description` in `lib/content.ts`
- `HERO` headline, subheadline, and eyebrow
- `FOOTER.productName` and `tagline`
- `<title>` tag in `app/layout.tsx` (or wherever it's set)
- Hero badge labels (currently "Desktop app", "VS Code extension", "IntelliJ plugin")
- Any hardcoded brand strings in components

The tagline direction: **"Your AI session history, searchable."** — concise, platform-agnostic, forward-looking.

---

## 3. Page Section Order

The current `page.tsx` order is: Hero → Problem → **Features → PlatformPicker** → Screenshots → HonestCons → QuickStart.

**This must change.** The new order moves the platform picker before features so it becomes the selection hub that drives personalization downstream:

```
1. Hero                  [UPDATED]  — Threadbase brand, 4 platform badges, CTA → picker
2. ProblemSection        [minor]    — minimal copy adjustments
3. PlatformPicker        [REDESIGN] — now comes BEFORE features (moved up from position 4)
4. FeaturesGrid          [UPDATED]  — platform-aware, expand to 8 features
5. Screenshots/Demo      [UPDATED]  — platform-specific demo panels
6. HonestCons            [UPDATED]  — remove IntelliJ "in progress" item
7. RoadmapTeaser         [NEW]      — vertical timeline with waitlist capture
8. QuickStart            [UPDATED]  — tabbed UI (was grid), add CLI tab (4 tabs total)
9. Footer                [UPDATED]  — Threadbase branding
```

**`page.tsx` must be restructured** to reflect this order. Swap `FeaturesGrid` and `PlatformPicker`, then insert `RoadmapTeaser` between `HonestCons` and `QuickStart`.

---

## 4. Hero Updates

**Content changes:**
- Headline: `"Your AI session history is a goldmine. Start mining it."` (platform-neutral)
- Subheadline: `"Threadbase turns raw AI session files on your disk into a searchable, navigable knowledge base — across desktop, IDE, and terminal."`
- Eyebrow: `"AI Session Browser"`
- Badges: `Desktop App`, `VS Code`, `IntelliJ`, `CLI (cch)` — 4 badges
- CTA buttons: single primary `"Choose your platform ↓"` (href `#platform-picker`) + outline `"View on GitHub"`

**No structural component changes** — only `lib/content.ts` updates.

---

## 5. Platform Picker — Full Redesign

### Layout: 3-card grid

```
[ Desktop App ] [ ─────── IDE ─────── ] [ CLI (cch) ]
                [  VS Code | IntelliJ  ]
```

**Desktop card** — standalone, clickable, full height.

**IDE group** — non-clickable outer container. Hard-coded layout in the component (not data-driven). Contains:
- Group label `"IDE Extensions"` (top-left, uppercase, 9px, color `#607089`)
- Centered description text in the middle area: `"Native history browser for your IDE"`
- Two 50/50 horizontal sub-buttons at the bottom: `VS Code` | `IntelliJ`

The IDE grouping is **intentionally hard-coded in the `PlatformPicker` component** and does not require a `group` concept in `lib/content.ts`. The existing `vscode` and `intellij` entries in `PLATFORMS` remain flat.

**CLI card** — standalone, clickable, full height.

### Unselected state

Above the 3-card grid, display a prompt line: `"Pick your environment to see a tailored experience."` (font-size 13px, color `#607089`, centered). All cards render at default opacity with subtle borders. No card is highlighted.

### Selected state

The active card/sub-button: border brightens to `rgba(99,179,255,0.5)`, background tint `rgba(99,179,255,0.06)`, name color → `#f4f8ff`. All other cards dim to opacity `0.45`. The prompt line above hides once a selection is made.

### Platform personalization scope

When a platform is selected:
- **FeaturesGrid** — highlights relevant features (see §6)
- **Screenshots/Demo** — shows platform-specific label + captions (see §7)
- **QuickStart** — auto-selects the matching tab and scrolls to the section

### Content data model change

Add `"cli"` to `PlatformItem["id"]` union type. This single change also covers `QuickStartBlock.platformId` since `QuickStartBlock.platformId` is typed as `PlatformItem["id"]` — no separate type edit needed.

New CLI `PlatformItem` entry in `PLATFORMS`:
```ts
{
  id: "cli",
  icon: "⌨",
  name: "CLI (cch)",
  meta: "Terminal · All platforms",
  description: "The fastest way to search your session history without leaving the terminal.",
  ctaLabel: "Install cch",
  ctaHref: "#quick-start",
}
```

Remove `badge: "In Progress"` from the IntelliJ entry. In the new card design, **all existing `badge` values are removed from rendering** — the `badge` field on `PlatformItem` is unused in the redesigned picker. The `"Most Features"` and `"Native IDE Feel"` badges on Desktop and VS Code are dropped. The `badge` field can remain in the type and data for future use but must not be rendered by `PlatformPicker`.

Update `PLATFORM_SECTION`:
```ts
{
  eyebrow: "Choose your environment",
  heading: "Four platforms. One history.",
  description: "Choose the surface that fits how you work. The archive stays local, searchable, and immediately usable.",
}
```

---

## 6. Features Grid

### New type field

Add `platforms?: Array<"desktop" | "vscode" | "intellij" | "cli">` to `FeatureItem`. When this field is present and a platform is selected, features that include that platform ID in their array render with a highlighted border (`border-[--accent]/30`) and slightly brighter background. Features without a match dim to opacity `0.5`. When no platform is selected, all features render at full opacity with no highlighting.

### Expand to 8 features

Keep all 6 existing features. Add 2 new entries:

```ts
{
  icon: "⌨",
  title: "Terminal-native CLI",
  description: "cch brings full-text search and session browsing to the terminal with a fast, keyboard-driven interface.",
  platforms: ["cli"],
},
{
  icon: "↺",
  title: "Cross-assistant ready",
  description: "Built to expand beyond Claude Code — same local-first approach, same searchable history, more AI tools soon.",
  platforms: ["desktop", "vscode", "intellij", "cli"],
},
```

### Platform affinity mapping for existing features

Add `platforms` to the 6 existing features as follows:

| Feature | platforms |
|---------|-----------|
| Full-text search | `["desktop","vscode","intellij","cli"]` |
| Project-grouped browser | `["desktop","vscode","intellij"]` |
| Rich tool result cards | `["desktop","vscode","intellij"]` |
| Multi-profile support | `["desktop"]` |
| Export anywhere | `["desktop","vscode"]` |
| Resume sessions | `["desktop","cli"]` |

---

## 7. Screenshots / Demo Section

### Platform label

Add `platformLabels?: Partial<Record<"desktop"|"vscode"|"intellij"|"cli", string>>` to `SectionContent` (or as a standalone export `SCREENSHOTS_PLATFORM_LABELS`). Use a standalone export to avoid polluting `SectionContent`:

```ts
export const SCREENSHOTS_PLATFORM_LABELS: Partial<Record<PlatformItem["id"], string>> = {
  desktop: "Desktop App walkthrough",
  vscode:  "VS Code extension walkthrough",
  intellij: "IntelliJ plugin walkthrough",
  cli: "CLI (cch) walkthrough",
};
```

When a platform is selected, render this label above the screenshot grid as a small eyebrow-style heading. When no platform is selected, render nothing.

### Screenshot captions

The existing `ScreenshotSlot.caption`, `description`, and `placeholderLabel` remain single strings (no per-platform variants needed at this stage). Only the above-grid label adapts per platform.

---

## 8. Honest Cons

Remove: `"IntelliJ plugin is still in progress"` — IntelliJ has shipped Milestone 1.

Update `"Claude Code users only"` to: `"Currently Claude Code sessions only"` — acknowledges future expansion without contradicting the roadmap teaser.

Remaining cons after edits: 4 total.

---

## 9. Roadmap Teaser — New Section

### Component

Create `components/RoadmapTeaser.tsx`. Add to `page.tsx` between `HonestCons` and `QuickStart`.

### Section heading

```ts
export const ROADMAP_SECTION: SectionContent = {
  eyebrow: "What's coming",
  heading: "Beyond Claude Code.",
  description: "Threadbase is expanding to support every major AI coding assistant. Your history. Your tools. Not locked to one.",
};
```

### Data model

```ts
export interface RoadmapMilestone {
  timeLabel: string;           // e.g. "Now", "Month 1–2"
  status: "shipped" | "soon" | "planned" | "future";
  title: string;               // e.g. "Claude Code"
  providers: RoadmapProvider[];
  detail: string;              // accordion body text
}

export interface RoadmapProvider {
  name: string;
  type: string;                // e.g. "OpenAI", "Open source"
  icon: string;                // emoji
}
```

### Milestone data

```ts
export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    timeLabel: "Now",
    status: "shipped",
    title: "Claude Code",
    providers: [
      { name: "Desktop App", type: "Electron · All platforms", icon: "🖥" },
      { name: "VS Code",     type: "Marketplace",              icon: "🔷" },
      { name: "IntelliJ",    type: "JetBrains",                icon: "☕" },
      { name: "CLI (cch)",   type: "Terminal",                  icon: "⌨" },
    ],
    detail: "Full Milestone 1 shipped across all four surfaces. Searchable history, tool result cards, project-grouped browser, and session resume.",
  },
  {
    timeLabel: "Month 1–2",
    status: "soon",
    title: "Coming soon",
    providers: [
      { name: "Codex CLI",    type: "OpenAI",       icon: "⬛" },
      { name: "Continue.dev", type: "Open source",  icon: "🔗" },
    ],
    detail: "Expanding the session parser to support OpenAI Codex CLI and Continue.dev session formats. Same local-first approach — no cloud required.",
  },
  {
    timeLabel: "Month 3–4",
    status: "planned",
    title: "Planned",
    providers: [
      { name: "OpenCode",  type: "Open source", icon: "🟢" },
      { name: "Amazon Q",  type: "AWS",         icon: "🟡" },
    ],
    detail: "Roadmap items confirmed based on user demand. Timeline subject to change.",
  },
  {
    timeLabel: "Month 5–6",
    status: "future",
    title: "Future",
    providers: [
      { name: "Aider", type: "Open source", icon: "⚡" },
      { name: "+ more", type: "Vote on GitHub", icon: "🗳" },
    ],
    detail: "Additional assistants based on community votes. Open an issue on GitHub to request your preferred tool.",
  },
];
```

### Visual design

Vertical centered timeline with gradient spine running top-to-bottom:
- Top (shipped): gray — `rgba(116,151,199,0.22)`
- Middle (soon): orange — `#f08a24` with glow
- Bottom (planned/future): dim — `rgba(116,151,199,0.08)`

Milestones alternate left/right content panels. Node circles on the central axis:
- `shipped`: gray border, `✓` checkmark
- `soon`: orange border + pulsing ring animation, `→` arrow
- `planned`/`future`: dim, `···`

Clicking any milestone node or its card panel toggles an accordion that shows `milestone.detail` text.

### Waitlist capture

Below the timeline, a bordered block (orange-tinted, `--accent-secondary`):
- Heading: `"Get notified when it ships."`
- Subtext: `"One email when multi-assistant support lands. No spam."`
- Email input + `"Notify me"` button
- Fine print: `"No spam. One email when it's ready."`

**On button click (MVP):** Disable the button and replace it with a static inline message: `"You're on the list ✓"`. No network request. Backend integration deferred.

---

## 10. Quick Start — Convert to Tabbed UI

### Component change

The existing `QuickStart` component renders all blocks as a `grid xl:grid-cols-3`. **Convert to a tabbed interface:**
- Tab bar at top with one tab per `QuickStartBlock` (Desktop | VS Code | IntelliJ | CLI)
- Only the active tab's code block is visible at a time
- `useState<PlatformItem["id"]>` for active tab, default `"desktop"`
- When platform picker selection changes, `QuickStart` responds by switching to the matching tab (via prop or context) and smooth-scrolling the section into view

### Tab appearance

Tab bar: horizontal pill-style tabs, same visual pattern as the existing `Screenshots` section caption tabs if one exists, otherwise: inactive = `color: #607089, border-bottom: 2px solid transparent`; active = `color: --accent, border-bottom: 2px solid --accent`.

### `accentColor` type and `accentMap` update

Narrow `QuickStartBlock.accentColor` in `lib/content.ts` from `string` to a union type as part of this work:
```ts
accentColor: "orange" | "blue" | "violet" | "green";
```

Update `accentMap` in the `QuickStart` component to match:
```ts
const accentMap: Record<"orange" | "blue" | "violet" | "green", string> = {
  orange: "text-orange-400",
  blue:   "text-blue-400",
  violet: "text-violet-400",
  green:  "text-green-400",   // NEW
};
```

### New CLI QuickStart block

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
}
```

---

## 11. Footer

```ts
productName: "Threadbase",
tagline: "Built for developers who use AI coding assistants seriously.",
disclaimer: "Not affiliated with Anthropic. Claude Code is a product of Anthropic.",
```

GitHub URL: keep existing value (update when repo is renamed).

---

## 12. State Management

Platform selection state lives at `page.tsx` level. Type:

```ts
type SelectedPlatform = "desktop" | "vscode" | "intellij" | "cli" | null;
const [selectedPlatform, setSelectedPlatform] = useState<SelectedPlatform>(null);
```

### Prop interface additions

**`PlatformPicker`:**
```ts
interface PlatformPickerProps {
  platforms: PlatformItem[];
  section: SectionContent;
  selected: SelectedPlatform;
  onSelect: (id: SelectedPlatform) => void;
}
```

**`FeaturesGrid`:**
```ts
interface FeaturesGridProps {
  features: FeatureItem[];
  section: SectionContent;
  selectedPlatform: SelectedPlatform;
}
```

**`Screenshots`:**
```ts
interface ScreenshotsProps {
  section: SectionContent;
  shots: ScreenshotSlot[];
  selectedPlatform: SelectedPlatform;
  platformLabels: Partial<Record<PlatformItem["id"], string>>;
}
```

`Screenshots` receives `platformLabels` as a prop (imported at `page.tsx` from `lib/content.ts` and passed down), not imported directly inside the component. This keeps the component free of content coupling.

**`QuickStart`:**
```ts
interface QuickStartProps {
  blocks: QuickStartBlock[];
  section: SectionContent;
  selectedPlatform: SelectedPlatform;
}
```

When `selectedPlatform` changes (and is non-null), `QuickStart` switches its internal active tab to the matching `platformId` via a `useEffect` dependency on `selectedPlatform`. Scroll-into-view is handled at `page.tsx` by attaching a `ref` to the `QuickStart` wrapper and calling `ref.current?.scrollIntoView({ behavior: "smooth" })` when selection changes.

No React context required — all components are direct children of `page.tsx`.

---

## 13. Design Tokens / Style Constraints

No changes to existing tokens:
- `--accent: #63b3ff` (blue — primary CTA, active states, feature highlights)
- `--accent-secondary: #f08a24` (orange — roadmap, coming-soon states)
- Background: `#070b11`

All new components follow existing card/border/glow patterns in the codebase.

---

## 14. Content Source of Truth

All copy/data through `lib/content.ts`. New exports:

| Export | Type | Used by |
|--------|------|---------|
| `ROADMAP_MILESTONES` | `RoadmapMilestone[]` | `RoadmapTeaser` |
| `ROADMAP_SECTION` | `SectionContent` | `RoadmapTeaser` |
| `SCREENSHOTS_PLATFORM_LABELS` | `Partial<Record<PlatformItem["id"], string>>` | `Screenshots` |

---

## 15. Out of Scope

- Waitlist backend (email service integration)
- Real screenshot assets (placeholders remain)
- Further iteration on roadmap timeline design (to be refined post-launch)
- Any changes to Hero animated shell stages (content only, no structural changes)
- Framer Motion animation changes beyond the existing patterns
