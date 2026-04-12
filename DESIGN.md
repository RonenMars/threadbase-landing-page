# Threadbase Landing Page — Design Specification

## Overview

A dark-themed, developer-focused product landing page for **Threadbase**, an AI session browser. The design follows a cinematic tech aesthetic — deep blue-black backgrounds, sky-blue and warm-orange accent colors, and motion-rich interactions that evoke the feeling of a code editor or terminal UI.

**Stack:** Next.js + Tailwind CSS + Framer Motion
**Font:** Geist (Google Fonts), a clean geometric sans-serif

---

## Color System

| Token | Value | Usage |
|---|---|---|
| Background Primary | `#070b11` | Page base — near-black with blue undertone |
| Background Secondary | `#0b1320` | Section alternation, footer |
| Background Tertiary | `#111c2d` | Card interiors, inputs |
| Text Primary | `#f4f8ff` | Headlines, body |
| Text Secondary | `#9fb0c9` | Descriptions, secondary copy |
| Text Muted | `#607089` | Labels, timestamps |
| Accent Primary | `#63b3ff` | CTAs, active states, links |
| Accent Strong | `#b5e3ff` | Icons, highlights |
| Accent Secondary | `#f08a24` | Orange — badges, roadmap "soon" status |
| Border | `rgba(116,151,199,0.18)` | Card edges, dividers |

Radius scale ranges from 6px (sm) to 28px (7xl), giving everything softly rounded edges.

---

## Section-by-Section Breakdown

### 1. Hero (Full Viewport)

The most visually complex section. Occupies the full viewport height.

**Background layer:** Two large, blurred radial-gradient orbs float subtly — a blue one (top-left) and an orange one (top-right) — creating a soft ambient glow against the dark base. These have a gentle floating animation.

**Content stack (top to bottom):**

- **Eyebrow label** — small pill reading "AI Session Browser"
- **4 platform badges** — Desktop App, VS Code, IntelliJ, CLI — in a horizontal flex row, each a small rounded chip with muted styling
- **Glitch Title** — the headline uses a custom animated glitch effect: a narrow horizontal band sweeps vertically across the text, applying chromatic aberration (RGB channel splitting) and clip-path distortion as it passes. The band bounces at top/bottom edges. Dark blue-grey stripe color. Runs continuously via `requestAnimationFrame`.
- **Subheadline** — styled as a code comment: `// Browse, search, and replay...` in monospace-flavored text
- **CTA buttons** — Primary button with blue gradient fill + secondary outline button

**Shell Container (the centerpiece):**

A large rounded container (28px radius) with a subtle gradient background and thin border, mimicking a terminal/app window:

- **Title bar** — three colored dots (red/yellow/green style) that animate in sequence
- **Desktop layout:** two-column split — a left sidebar with 4 clickable workflow step labels, and a right panel showing the active stage
- **Mobile layout:** a compact 4-column step nav replaces the sidebar

**Four auto-cycling stages** (each with its own duration and entrance/exit animations):

1. **Raw JSONL** (5.5s) — Simulates terminal output with a typewriter character-by-character reveal and blinking cursor
2. **Decoded** (6.5s) — 3-column card grid showing parsed conversation data, cards fade-up with stagger
3. **Command Palette** (6.5s) — A modal overlay with a search input, typewriter-animated query text, and result items appearing sequentially
4. **Deep View** — Asymmetric 2-column layout showing conversation detail

Each stage entrance slides up (`y: 14 → 0`). Exit animations are randomized — slight rotation, scale-down, and directional slide — giving organic variety. A thin progress bar at the bottom of each sidebar step fills linearly over the stage duration.

---

### 2. Problem Section

**Background:** Slightly lighter (`bg-secondary`) to create visual separation.

**Layout:** 3-column grid (2 on tablet, 1 on mobile).

Each card is a `.tech-card` — dark background, thin border, soft hover lift (-4px translateY) with border brightening and shadow expansion on hover (220ms ease). Each contains:

- A 48×48px icon container (rounded, `white/4` background)
- Title in semibold
- Description paragraph in secondary text color, generous leading (1.75rem)

Cards fade-up on scroll with 0.1s stagger between them.

---

### 3. Platform Picker

A selection UI letting users choose their platform, which filters content below.

**Layout:** 3 equal columns on desktop.

- **Desktop** and **CLI** get their own full cards — large 56×56px icon, platform name, and subtitle
- **IDE group** (VS Code + IntelliJ) shares a container with a 2-column sub-grid of smaller buttons

**Interactive states:**

- **Selected:** accent-colored border with glow shadow, accent background tint
- **Unselected when another is active:** dims to 45% opacity
- **Hover:** border and background lighten

Clicking a platform auto-scrolls to the Quick Start section after a 300ms delay.

---

### 4. Features Grid

**Layout:** 3-column grid (responsive down to 1).

8 feature cards, each tagged with supported platforms. Cards contain:

- 48×48px icon with accent-tinted background
- Title + description

**Platform filtering interaction:** When a platform is selected above, matching cards get a highlighted border (`accent/30`) and subtle background tint. Non-matching cards dim to 40% opacity. This creates an instant visual filter without hiding content.

Staggered fade-up on scroll.

---

### 5. Screenshots Section

**Layout:** Alternating image/text pattern — odd rows have the image on the left, even rows reverse the order.

Grid proportions are asymmetric (0.8fr image + 1fr text) for visual rhythm.

Each screenshot sits in a `.screenshot-shell` container with an overlay gradient (radial at top + horizontal semi-transparent sweep), simulating a frosted glass or ambient light effect. Placeholder text is centered with generous leading.

---

### 6. Honest Cons

A single centered card (max-width ~48rem), rounded 22px, with a dark gradient background and combined inset + drop shadows for depth.

Contains 4 bullet points, each prefixed with a circular "i" icon badge. The section title suggests transparency about limitations — a trust-building design pattern.

Staggered fade-up animation.

---

### 7. Roadmap Timeline

A vertical timeline with a centered spine line — a 0.5px gradient stroke that transitions from blue → orange → blue.

**Milestone nodes** sit on the spine, each a 10×10px circle:

- **Shipped:** check mark, grey styling
- **Soon:** arrow icon, orange with a pulsing `animate-ping` ring
- **Planned:** ellipsis, light grey
- **Future:** ellipsis, darker grey

**Milestone cards** alternate left and right of the spine using a 3-column grid (`[card] [node] [card]`). Each card:

- Rounded 22px, dark semi-transparent background
- Slight lift on hover (-2px)
- Title color varies by status
- Click to expand: reveals detail text with height + opacity animation (AnimatePresence)
- Provider badges in a flex row (xs text, rounded pills)

---

### 8. Quick Start (Tabbed Code Panels)

**Tab bar:** Dark background with subtle border. Active tab gets accent-tinted background with shadow; inactive tabs show muted text.

**Code panels:** Each platform gets a card with:

- Header showing a colored dot + platform name (orange for Desktop, blue for VS Code, violet for IntelliJ, green for CLI)
- Monospace code block with terminal styling, horizontally scrollable
- Comment lines highlighted in emerald-green

---

### 9. Footer

Minimal. Top border (`white/6`), secondary background. Links in secondary text with hover-to-primary transitions. Copyright and license info in small muted text. Column layout on mobile, row on desktop.

---

## Motion Design Language

| Pattern | Specs |
|---|---|
| **Base ease** | `[0.22, 1, 0.36, 1]` — smooth overshoot curve |
| **Fade-up** | `opacity: 0→1, y: 28→0` over 0.65s |
| **Stagger** | 0.1s between children, 0.1s initial delay |
| **Hero stage enter** | `y: 14→0` over 0.5s |
| **Hero stage exit** | Randomized: `y: -22 to -40`, `x: ±8`, `rotate: ±2.5°`, `scale: 0.93-0.98` |
| **Card hover** | `-4px translateY`, border brighten, shadow expand, 220ms ease |
| **Typewriter** | Character-by-character with blinking cursor |
| **Glitch sweep** | RAF-driven band moving 0.21–0.37px/frame, chromatic aberration |
| **Floating orbs** | Continuous subtle float via Tailwind Motion plugin |
| **Progress bar** | Linear `scaleX: 0→1` over stage duration |

---

## Responsive Strategy

- **Mobile (<640px):** Single columns, compact hero with horizontal step nav, 24px padding
- **Tablet (640–1024px):** 2-column grids, hidden desktop sidebar in hero
- **Desktop (1024px+):** Full 3-column layouts, visible hero sidebar, alternating screenshot layout

---

## Design Philosophy Summary

The page is built around a **"dev tool as product"** aesthetic — it looks and feels like the software it's selling. The dark palette, terminal-style hero, monospace accents, and code-comment subheadline all reinforce the developer audience. The motion design is purposeful: the glitch title grabs attention, the auto-cycling shell demo shows the product in action without requiring interaction, and scroll-triggered animations create a sense of progression. The platform picker + feature filtering creates a personalized feel. The honest cons section and expandable roadmap build trust through transparency.
