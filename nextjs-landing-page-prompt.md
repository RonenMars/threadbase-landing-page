# Prompt: Build the Claude Code History Browser Marketing Landing Page

## Purpose

You are building a production-quality marketing landing page (minisite) for **Claude Code History Browser** — a cross-platform suite that lets developers browse, search, and manage their Claude Code conversation history. The landing page lives at `/Users/ronen/Desktop/dev/personal/cc-history/landing/` and will be deployed as a static Next.js site.

---

## Workflow — Follow This Order Exactly

Before writing any code, you must complete the following steps in order:

1. **Invoke `superpowers:brainstorming`** — Use it to brainstorm the design direction, section layout, visual hierarchy, color palette decisions, and animation approach. Do not proceed until this is done.

2. **Invoke `superpowers:writing-plans`** — Use it to produce a `PLAN.md` file in `/Users/ronen/Desktop/dev/personal/cc-history/landing/` documenting the full implementation plan (sections, components, data flow, order of work). Do not write production code until `PLAN.md` exists.

3. **Look up current documentation via the `context7` MCP server** — Before implementing, query docs for:
   - Next.js 15 App Router (routing, layouts, metadata API, static export)
   - Tailwind CSS v4 (configuration, utility classes, `@layer`, CSS variables)
   - Framer Motion (scroll-triggered animations, `motion` components, `useInView`, variants)

   Use `mcp__plugin_context7_context7__resolve-library-id` then `mcp__plugin_context7_context7__query-docs` for each library. Do **not** rely on training data for these APIs — they change frequently.

4. **Build the page** following the specifications below.

5. **Invoke `superpowers:verification-before-completion`** before declaring the work done. Verify: TypeScript compiles with no errors, no `any` types are present, the dev server runs, all sections render correctly, and the `content.ts` file is the single source of truth for all copy.

---

## Project Bootstrap

Run these commands from the parent directory (`/Users/ronen/Desktop/dev/personal/cc-history/`):

```bash
npx create-next-app@latest landing \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --no-git
cd landing
npm install framer-motion
npx shadcn@latest init
npx shadcn@latest add button card badge tabs
```

When `create-next-app` prompts for Tailwind CSS, accept v4. When `shadcn init` asks for style preferences, choose: style = Default, base color = Neutral, CSS variables = yes.

All subsequent work happens inside `/Users/ronen/Desktop/dev/personal/cc-history/landing/`.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15, App Router, static export |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| UI components | shadcn/ui (Button, Card, Badge, Tabs) |
| Language | TypeScript — strict mode, zero `any` types |
| Fonts | `next/font` — Geist Sans for body, Geist Mono for code |

---

## Project Structure

Create exactly this structure:

```
landing/
├── app/
│   ├── layout.tsx          # Root layout: font setup, metadata, dark-mode class on <html>
│   ├── page.tsx            # Assembles all section components in order
│   └── globals.css         # Tailwind base + custom CSS variables (colors, etc.)
├── components/
│   ├── Hero.tsx
│   ├── ProblemSection.tsx
│   ├── FeaturesGrid.tsx
│   ├── PlatformPicker.tsx
│   ├── Screenshots.tsx
│   ├── HonestCons.tsx
│   ├── QuickStart.tsx
│   └── Footer.tsx
├── lib/
│   └── content.ts          # ALL text content — no copy hardcoded in JSX
├── public/
│   └── screenshots/        # Empty placeholder directory (add a .gitkeep)
├── package.json
└── PLAN.md                 # Written by superpowers:writing-plans before coding
```

---

## Content File (`lib/content.ts`)

All copy — headlines, body text, feature descriptions, button labels, install commands, platform names, captions — must live in `lib/content.ts`. Components import from this file; they do not contain hardcoded strings. The file should be fully typed with explicit TypeScript interfaces (no `any`).

Define and export at minimum:
- `HERO` — headline, subheadline, badges
- `PROBLEM_ITEMS` — array of problem cards
- `FEATURES` — array of feature objects (title, description, icon name or emoji)
- `PLATFORMS` — array of platform objects (name, description, install steps, CTA label)
- `SCREENSHOTS` — array of screenshot slot objects (caption, description)
- `HONEST_CONS` — array of limitation items
- `QUICK_START` — per-platform install blocks (platform name, steps array)
- `FOOTER` — tagline, github url, license text

---

## Design System

### Color Palette

Define these as CSS variables in `globals.css` and reference them throughout:

```css
:root {
  --bg-primary: #0d0d0d;       /* near-black background */
  --bg-secondary: #161616;     /* slightly lighter card background */
  --bg-tertiary: #1e1e1e;      /* code blocks, elevated surfaces */
  --accent: #e3700a;           /* Claude orange — primary CTA color */
  --accent-hover: #c45d06;     /* darkened accent for hover states */
  --text-primary: #f0f0f0;     /* main body text */
  --text-secondary: #a0a0a0;   /* muted/secondary text */
  --text-muted: #606060;       /* very muted — labels, metadata */
  --border: #2a2a2a;           /* subtle card borders */
  --border-accent: #e3700a40;  /* semi-transparent accent for active borders */
}
```

The `<html>` element must have `class="dark"` set in `layout.tsx`. Tailwind dark mode should use the `class` strategy.

### Typography

- **Body**: Geist Sans, `--text-primary`
- **Code / terminal blocks**: Geist Mono, `--bg-tertiary` background, `--text-primary`
- **Section headings**: large (3xl–5xl), bold, tight tracking
- **Subheadings**: xl–2xl, medium weight, `--text-secondary`

### Spacing

Sections are vertically separated with generous padding (`py-24` or `py-32`). Use a centered max-width container (`max-w-6xl mx-auto px-6`).

### Animations

Use Framer Motion for all animations. Patterns to use:
- **Scroll-triggered fade-in + slide-up**: wrap section content in `motion.div` with `useInView` from Framer Motion. Trigger once when 20% of the element is visible.
- **Staggered children**: feature cards and platform cards stagger in with a 0.1s delay between each.
- **Hover lift**: feature cards and platform cards translate up 4px and brighten border on hover.
- **No layout shifts**: always specify `initial` so elements are invisible before JS hydrates, but set `output: "export"` compatible — no server-only animation APIs.

---

## Section Specifications

### 1. Hero (`components/Hero.tsx`)

**Layout**: Full viewport height, vertically centered. Dark background. Large text centered.

**Content**:
- **Eyebrow label**: Small badge/pill — `"Developer Tool"` styled with orange accent border
- **Headline**: `"Your Claude Code history is a goldmine. Start mining it."` — large (4xl–6xl), bold, white
- **Subheadline**: `"Claude Code History Browser turns the raw JSONL session files on your disk into a searchable, navigable knowledge base — available as a desktop app, VS Code extension, and IntelliJ plugin."` — xl, muted text
- **Platform badges**: Three horizontally-arranged shadcn `Button` components styled as download/install CTAs:
  - "Download for Desktop" (links to `#platform-picker`)
  - "Install VS Code Extension" (links to `#platform-picker`)
  - "Get IntelliJ Plugin" (links to `#platform-picker`)
  - The primary button uses `--accent` background; the other two are outline style
- **Hero visual**: A large dark-bordered `div` below the text, labeled `[Screenshot: Electron app — conversation browser + search results]`, styled as a realistic screenshot placeholder (rounded-xl border border-dashed `--border` with centered muted label text, height approximately 480px). This is where a real screenshot drops in later.

**Animation**: Headline fades in first, subheadline 0.2s later, badges 0.4s later, screenshot placeholder 0.6s later.

---

### 2. Problem Section (`components/ProblemSection.tsx`)

**Layout**: Centered section, dark background variant (`--bg-secondary`), 3-column card grid.

**Section heading**: `"Claude Code is powerful. Finding what you built last week isn't."`

**Three problem cards** (sourced from `PROBLEM_ITEMS` in `content.ts`):

1. **Sessions pile up** — Icon: filing cabinet or stack. Copy: `"Every Claude Code session lives as a JSONL file in ~/.claude/projects/. After a few weeks of active use, you have hundreds of them with no way to find anything."`
2. **Raw JSONL is unreadable** — Icon: file/code. Copy: `"Opening a .jsonl file in a text editor gives you an impenetrable wall of JSON. Tool calls, diffs, bash output — all flattened into escaped strings."`
3. **Context gets lost** — Icon: broken chain or hourglass. Copy: `"You solved this exact problem three weeks ago. You know Claude walked you through it step by step. But you can't find it, so you start over."`

Each card: rounded dark background (`--bg-tertiary`), subtle border, emoji or SVG icon top-left, bold title, body text below.

**Animation**: Cards stagger in on scroll.

---

### 3. Features Grid (`components/FeaturesGrid.tsx`)

**Layout**: 2×3 grid (desktop), single column (mobile). Cards with hover animation.

**Section heading**: `"Everything you need. Nothing you don't."`

**Feature cards** (sourced from `FEATURES` in `content.ts`):

1. **Full-text search** — `"Instant search across every conversation, session name, and project. FlexSearch (JS) or Apache Lucene (JVM) depending on your platform — results appear as you type."`
2. **Project-grouped browser** — `"All conversations listed and grouped by project directory, sorted by recency. Filter by project, date range, or sort by message count."`
3. **Rich tool result cards** — `"Specialized rendering for every tool Claude uses: unified diff cards for Edit operations, terminal output cards for Bash, and clean cards for Read, Write, Glob, and Grep."`
4. **Multi-profile support** — `"Scan multiple Claude config directories — personal and work accounts side by side. Per-profile stats: conversation count, token usage, last used."`
5. **Export anywhere** — `"Export any conversation to Markdown, plain text, or JSON. Copy individual messages to clipboard. Your history is yours."`
6. **Resume sessions (Desktop)** — `"The Electron app embeds a full xterm.js terminal. Resume any past session or start a new one without leaving the conversation browser."`

Each card: icon (emoji or simple SVG inline), bold title, body text, hover lift + orange border glow effect.

---

### 4. Platform Picker (`components/PlatformPicker.tsx`)

**Layout**: Horizontal tab switcher (shadcn `Tabs`) with three tabs, each revealing a detail card below. Also works as three side-by-side cards on large screens.

**Section heading**: `"Three platforms. One history."` with id `platform-picker` on the section.

**Electron App tab**:
- Title: `"Desktop App (Electron)"`
- Badge: `"Most Features"`  styled with accent color
- Description: `"A standalone app that runs independently of any IDE. Full xterm.js terminal to resume sessions, multi-instance chat management, git worktrees panel, profile dashboard, virtualized rendering for thousands of conversations."`
- Unique highlights list: Embedded Claude Code terminal, Multi-instance chat (up to N concurrent), Git worktrees panel, Profile dashboard with stats, Resizable sidebar + flat/grouped view
- CTA button: `"Download Desktop App"` — filled accent color
- Install note (code block style): `pnpm install && pnpm run package` inside `claude-search/`

**VS Code Extension tab**:
- Title: `"VS Code Extension"`
- Badge: `"Native IDE Feel"`
- Description: `"Lives inside VS Code with native UI patterns. Activity bar sidebar with TreeView, QuickPick search (Cmd+Shift+P → 'Claude History: Search'), and workspace-filtered view showing only your current project's conversations."`
- Unique highlights list: Native VS Code TreeView, QuickPick full-text search, Workspace conversation filter, CSP-secured webview, Panel state retention
- CTA button: `"Install from Marketplace"` — filled accent color
- Install note: `npm install && npm run build` inside `vscode-claude-code-manager/`

**IntelliJ Plugin tab**:
- Title: `"IntelliJ / WebStorm Plugin"`
- Badge: `"In Progress"`
- Description: `"Native Swing tree inside a JetBrains tool window. Apache Lucene search on the JVM. Reuses the React webview via JCEF. Resume sessions in the IDE's integrated terminal with Ctrl+Shift+H."`
- Unique highlights list: Native Swing tree with speed search, Apache Lucene 9.x search, Resume in IDE terminal, JCEF React viewer, Kotlin-native core (zero IntelliJ in domain layer)
- CTA button: `"Get from JetBrains Marketplace"` — outline style (in progress)
- Install note: `./gradlew runIde` inside `intellij-claude-code-manager/`

---

### 5. Screenshots Section (`components/Screenshots.tsx`)

**Layout**: Vertical stack of three screenshot slots, each alternating text-left/image-right and text-right/image-left (bento-style on desktop).

**Section heading**: `"See it in action"`

**Three slots** (sourced from `SCREENSHOTS` in `content.ts`):

1. **Conversation Browser**
   - Caption: `"Conversation Browser"`
   - Description: `"All your Claude Code sessions, grouped by project and sorted by recency. Filter by project name, date range, or sort by message count. Each entry shows the session name, message count, model used, and git branch."`
   - Placeholder div: dark background, dashed border, centered text `[Screenshot: Conversation browser — project-grouped sidebar with search bar]`, height 360px

2. **Search Interface**
   - Caption: `"Full-Text Search"`
   - Description: `"Type anything — a function name, an error message, a library — and get instant results across all your conversations. Results show the session name, project, a content preview, and how long ago the session was."`
   - Placeholder div: `[Screenshot: Search results — query 'useEffect' showing 12 matching sessions]`, height 360px

3. **Tool Result Card**
   - Caption: `"Tool Result Cards"`
   - Description: `"Every tool Claude uses gets a dedicated card. Edit operations render as a unified diff. Bash commands show terminal-style output with exit codes. Read, Write, Glob, and Grep each have clean structured layouts."`
   - Placeholder div: `[Screenshot: Edit diff card — showing a unified diff with added/removed lines highlighted]`, height 360px

**Animation**: Each slot fades in as it enters the viewport.

---

### 6. Honest Cons (`components/HonestCons.tsx`)

**Layout**: Centered, narrower container (max-w-2xl), subtle section with lighter heading treatment.

**Section heading**: `"Good to know"` — smaller than other section headings, secondary text color

**Intro text**: `"We'd rather you know this upfront than be disappointed after installing."`

**Limitation items** (sourced from `HONEST_CONS` in `content.ts`), displayed as a styled list with a neutral icon (info circle or similar):

1. **Claude Code users only** — `"This tool has exactly one job: browsing Claude Code history. If you don't use Claude Code actively, there's nothing here for you."`
2. **Quality depends on your sessions** — `"The search index is only as useful as the sessions you've had. Short, throwaway sessions won't yield much. Deep, multi-turn debugging sessions become invaluable."`
3. **IDE plugins track IDE versions** — `"The VS Code extension and IntelliJ plugin need to keep pace with IDE release cycles. If you're on a cutting-edge VS Code or JetBrains beta, check the compatibility matrix."`
4. **IntelliJ plugin is in progress** — `"Phases 0–4 are complete and the core functionality works, but Phase 5 (profile management UI, worktrees) is still in development."`
5. **No cloud sync** — `"History lives on your disk. There's no cloud backup, no team sharing, no sync across machines. This is intentional — your conversations stay local."`

Style this section to feel honest and credible, not apologetic. Use a slightly muted background and subdued typography to visually de-emphasize it without hiding it.

---

### 7. Quick Start (`components/QuickStart.tsx`)

**Layout**: Three-column layout on desktop (one per platform), stacked on mobile.

**Section heading**: `"Get started in under a minute"`

**Per-platform blocks** (sourced from `QUICK_START` in `content.ts`):

**Desktop (Electron)**:
```
# 1. Clone and enter
cd claude-search

# 2. Install dependencies
pnpm install

# 3. Run in dev mode
pnpm run dev

# Or build a distributable
pnpm run package
```

**VS Code Extension**:
```
# 1. Enter the extension directory
cd vscode-claude-code-manager

# 2. Install dependencies
npm install

# 3. Build the extension
npm run build

# 4. Open in VS Code and press F5
# The Claude History panel appears in the Activity Bar
```

**IntelliJ Plugin**:
```
# 1. Enter the plugin directory
cd intellij-claude-code-manager

# 2. Launch with plugin loaded
./gradlew runIde

# The Claude History tool window
# appears in the IDE sidebar
```

Style these as terminal/code blocks: monospace font (`Geist Mono`), dark background (`--bg-tertiary`), subtle green `#` comment color, white command text. Each block has a small header with the platform name and a colored dot (orange for Electron, blue for VS Code, purple for IntelliJ).

---

### 8. Footer (`components/Footer.tsx`)

**Layout**: Full-width, dark (`--bg-secondary`), centered content, two rows.

**Row 1**: `"Claude Code History Browser"` — bold, with an orange accent dot separator — `"MIT License"`

**Row 2**: Links — `"GitHub"` (links to `https://github.com/ronen/cc-history` — use a placeholder, the dev will update) | `"Report an Issue"` | `"Changelog"`

**Tagline**: `"Built by developers, for developers who use Claude Code seriously."`

**Small print**: `"Not affiliated with Anthropic. Claude Code is a product of Anthropic."`

---

## Quality Requirements

These are non-negotiable. The `superpowers:verification-before-completion` step must confirm each one.

- **TypeScript strict mode** — `strict: true` in `tsconfig.json`. Zero `any` types anywhere. All props interfaces explicitly typed. All `content.ts` exports have explicit return types.
- **No hardcoded copy in JSX** — Every string of user-facing text is imported from `lib/content.ts`. This includes button labels, aria-labels that contain English words, alt text, and placeholder labels.
- **shadcn/ui used correctly** — `Button`, `Card`, `Badge`, `Tabs` from `@/components/ui/*` wherever they fit (CTAs, platform cards, the platform picker tabs, feature badges).
- **Semantic HTML** — Use `<section>`, `<article>`, `<nav>`, `<main>`, `<footer>`, `<h1>`–`<h3>` in correct hierarchy. Each section has an appropriate `aria-label` or heading.
- **Keyboard navigable** — Tab order follows visual order. Interactive elements (tabs, buttons) are focusable and have visible focus rings.
- **No external images** — Zero `<img>` tags pointing to external URLs. Placeholder screenshot divs use CSS only. Any icons are inline SVG or Unicode emoji.
- **Responsive** — All sections must look correct at 375px (iPhone SE), 768px (tablet), 1280px (desktop). Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`).
- **Framer Motion used for all animations** — No raw CSS `@keyframes` for entrance animations. All motion uses `motion.div` with `initial`/`animate`/`whileInView` props.
- **Static export compatible** — Add `output: 'export'` to `next.config.ts`. The site must build with `next build` producing a static `out/` directory with no server-side data fetching.
- **Lighthouse target** — Code structure should support a 90+ Lighthouse performance score. Use `next/font` (not Google Fonts CDN), avoid layout shifts, keep JS bundle lean.

---

## Implementation Notes

- In `next.config.ts`, set `output: 'export'` and `images: { unoptimized: true }`.
- In `app/layout.tsx`, set `<html lang="en" className="dark">` and configure metadata: title `"Claude Code History Browser"`, description from `content.ts`.
- The `globals.css` file should define the CSS custom properties listed in the Design System section, plus the Tailwind `@import` and any global base styles.
- For the Framer Motion `useInView` hook, pass `{ once: true, amount: 0.2 }` so animations fire once when 20% visible.
- Staggered card animations: use `variants` with a `container` variant that sets `staggerChildren: 0.1` and a `child` variant with `initial: { opacity: 0, y: 20 }` and `animate: { opacity: 1, y: 0 }`.
- The `PlatformPicker` Tabs component should use shadcn `Tabs` with `TabsList`, `TabsTrigger`, and `TabsContent`. Each `TabsContent` contains the platform detail card.
- Code blocks in `QuickStart.tsx` should be `<pre><code>` elements styled with Tailwind, not a third-party syntax highlighter (keeps bundle small).
- All section components accept their data as props typed from interfaces defined in `lib/content.ts`. The `app/page.tsx` imports from `lib/content.ts` and passes props down — no component imports directly from `content.ts`.

---

## Completion Checklist

Before invoking `superpowers:verification-before-completion`, confirm:

- [ ] `PLAN.md` exists in the landing directory
- [ ] `lib/content.ts` exists and all copy is sourced from it
- [ ] All 8 components exist and are imported in `app/page.tsx`
- [ ] `npm run build` completes with zero TypeScript errors and zero ESLint errors
- [ ] `npm run dev` starts and all sections render in the browser
- [ ] No `any` types (`grep -r "any" --include="*.ts" --include="*.tsx" app/ components/ lib/` returns zero results)
- [ ] No hardcoded English strings in JSX (spot-check: open each component file and verify imports from content.ts)
- [ ] Screenshot placeholders are clearly labeled with `[Screenshot: ...]` text
- [ ] Platform picker tabs switch correctly between all three platforms
- [ ] Framer Motion animations trigger on scroll (test by scrolling slowly in dev)
- [ ] The page is responsive at 375px width (use Chrome DevTools device emulator)
- [ ] `next.config.ts` has `output: 'export'`
