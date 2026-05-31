export interface SiteMetadata {
  title: string;
  description: string;
}

export interface HeroBadge {
  label: string;
}

export interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "outline";
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  badges: HeroBadge[];
  ctas: HeroCta[];
  shellTitle: string;
  workflowTitle: string;
  workflowSteps: string[];
  shellStages: HeroShellStage[];
}

export interface HeroDecodedCard {
  title: string;
  meta: string;
  description: string;
}

export interface HeroPaletteOption {
  label: string;
  meta: string;
}

export interface HeroShellStage {
  id: "raw-jsonl" | "decoded" | "command-palette" | "deep-view";
  durationMs?: number;
  workflowActiveIndex: number;
  panelEyebrow: string;
  panelTitle: string;
  panelBody: string;
  rawLines?: string[];
  decodedCards?: HeroDecodedCard[];
  paletteQuery?: string;
  paletteOptions?: HeroPaletteOption[];
  browserProject?: string;
  browserSession?: string;
  browserMeta?: string;
  browserHighlight?: string;
  browserTerminal?: string;
}

export interface ProblemItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  platforms?: Array<PlatformItem["id"]>;
}

export interface PlatformItem {
  id: "desktop" | "vscode" | "intellij" | "cli";
  icon: string;
  name: string;
  meta: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
}

export interface ScreenshotSlot {
  caption: string;
  description: string;
  placeholderLabel: string;
}

export interface HonestCon {
  title: string;
  description: string;
}

export interface QuickStartBlock {
  platformId: PlatformItem["id"];
  platformName: string;
  accentColor: "orange" | "blue" | "violet" | "green";
  steps: string[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  productName: string;
  licenseText: string;
  tagline: string;
  disclaimer: string;
  githubUrl: string;
  links: FooterLink[];
}

export interface SectionContent {
  eyebrow?: string;
  heading: string;
  description?: string;
}

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

export type SelectedPlatform = PlatformItem["id"] | null;

export const SITE_METADATA: SiteMetadata = {
  title: "Threadbase",
  description:
    "Threadbase turns raw AI session files on your disk into a searchable, navigable knowledge base across desktop, IDE, and terminal.",
};

export const HERO: HeroContent = {
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
      label: "Choose your platform",
      href: "#platform-picker",
      variant: "primary",
    },
    {
      label: "View on GitHub",
      href: "https://github.com/ronen/cc-history",
      variant: "outline",
    },
  ],
  shellTitle: "Local Session Inspector",
  workflowTitle: "Recovery flow",
  workflowSteps: [
    "Decode JSONL",
    "Inspect structure",
    "Search sessions",
    "Resume thread",
  ],
  shellStages: [
    {
      id: "raw-jsonl",
      durationMs: 5500,
      workflowActiveIndex: 0,
      panelEyebrow: "Decoding local session history",
      panelTitle: "session_014.jsonl",
      panelBody:
        "Claude keeps the truth on disk, but not in a format you want to browse under pressure.",
      rawLines: [
        "{\"type\":\"assistant\",\"message\":\"Need to debug the auth refresh loop before release.\"}",
        "{\"type\":\"tool_use\",\"name\":\"Bash\",\"input\":{\"command\":\"pnpm test auth-refresh\"}}",
        "{\"type\":\"tool_result\",\"tool\":\"Bash\",\"output\":\"FAIL token retries exceeded\"}",
        "{\"type\":\"tool_use\",\"name\":\"Edit\",\"input\":{\"file\":\"src/auth.ts\",\"patch\":\"extract refresh helper\"}}",
        "{\"type\":\"tool_result\",\"tool\":\"Edit\",\"diff\":\"+ renewRefreshToken()\\n- inline retry logic\"}",
      ],
    },
    {
      id: "decoded",
      durationMs: 6500,
      workflowActiveIndex: 1,
      panelEyebrow: "Structured automatically",
      panelTitle: "Same history. Finally readable.",
      panelBody:
        "Tool calls, diffs, and shell output turn into purpose-built cards you can scan in seconds.",
      decodedCards: [
        {
          title: "Conversation Summary",
          meta: "42 messages · threadbase-web",
          description:
            "Auth refresh loop traced to shared retry logic in src/auth.ts.",
        },
        {
          title: "Unified Diff",
          meta: "Edit tool",
          description:
            "Extracted renewRefreshToken() and routed retries through a dedicated helper.",
        },
        {
          title: "Terminal Output",
          meta: "Bash tool",
          description: "pnpm test auth-refresh now passes with zero retry exhaustion.",
        },
      ],
    },
    {
      id: "command-palette",
      durationMs: 6500,
      workflowActiveIndex: 2,
      panelEyebrow: "Keyboard-first workflow",
      panelTitle: "Command Palette",
      panelBody:
        "Search across sessions, filter by project, and jump straight to the exact thread you need.",
      paletteQuery: "auth refresh handler",
      paletteOptions: [
        {
          label: "Open result · Recovered auth fix",
          meta: "threadbase-web · 3 weeks ago",
        },
        {
          label: "Filter by project · threadbase-web",
          meta: "14 matching conversations",
        },
        {
          label: "Resume latest related session",
          meta: "continue from terminal state",
        },
      ],
    },
    {
      id: "deep-view",
      workflowActiveIndex: 3,
      panelEyebrow: "Deep view",
      panelTitle: "Recovered auth fix",
      panelBody:
        "Open the winning conversation, inspect the diff, and resume without starting from scratch.",
      browserProject: "threadbase-web",
      browserSession: "Auth refresh loop fixed",
      browserMeta: "3 weeks ago · 42 messages · claude-3.7-sonnet",
      browserHighlight:
        "Extracted refresh token renewal into a dedicated helper and updated the retry path.",
      browserTerminal: "claude resume session_014",
    },
  ],
};

export const PROBLEM_SECTION: SectionContent = {
  heading: "Claude Code is powerful. Finding what you built last week isn't.",
};

export const PROBLEM_ITEMS: ProblemItem[] = [
  {
    icon: "🗄",
    title: "Sessions pile up",
    description:
      "Every Claude Code session lives as a JSONL file in ~/.claude/projects/. After a few weeks of active use, you have hundreds of them with no practical way to find anything.",
  },
  {
    icon: "🧾",
    title: "Raw JSONL is unreadable",
    description:
      "Opening a session file in a text editor gives you a wall of escaped JSON where tool calls, diffs, and terminal output all blur together.",
  },
  {
    icon: "⛓",
    title: "Context gets lost",
    description:
      "You solved this exact problem a few weeks ago, but without a way to search the history, the path back to that solution disappears.",
  },
];

export const FEATURES: FeatureItem[] = [
  {
    icon: "⌕",
    title: "Full-text search",
    description:
      "Search every conversation, session name, and project with results that appear as you type.",
    platforms: ["desktop", "vscode", "intellij", "cli"],
  },
  {
    icon: "🗂",
    title: "Project-grouped browser",
    description:
      "Browse conversations grouped by project directory and sorted by recency with useful filters.",
    platforms: ["desktop", "vscode", "intellij"],
  },
  {
    icon: "⋇",
    title: "Rich tool result cards",
    description:
      "Read diffs, terminal output, file reads, and search results in specialized cards instead of raw JSON.",
    platforms: ["desktop", "vscode", "intellij"],
  },
  {
    icon: "◫",
    title: "Multi-profile support",
    description:
      "Index multiple Claude config directories side by side with profile-level usage and recency stats.",
    platforms: ["desktop"],
  },
  {
    icon: "⇪",
    title: "Export anywhere",
    description:
      "Export any conversation to Markdown, plain text, or JSON and copy individual messages cleanly.",
    platforms: ["desktop", "vscode"],
  },
  {
    icon: "▣",
    title: "Resume sessions",
    description:
      "The desktop app can relaunch or continue prior work without leaving the history browser.",
    platforms: ["desktop", "cli"],
  },
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
];

export const FEATURES_SECTION: SectionContent = {
  eyebrow: "Searchable by design",
  heading: "Everything you need. Nothing you don't.",
  description:
    "Search, browse, export, and resume the conversations that already contain your best debugging work.",
};

export const PLATFORMS: PlatformItem[] = [
  {
    id: "desktop",
    icon: "🖥",
    name: "Desktop App",
    meta: "macOS · Windows · Linux",
    description:
      "The full experience with embedded terminal workflows, profile dashboards, and large-history browsing.",
    ctaLabel: "Download Desktop App",
    ctaHref: "#quick-start",
    badge: "Most Features",
  },
  {
    id: "vscode",
    icon: "🧩",
    name: "VS Code Extension",
    meta: "VS Code Marketplace",
    description:
      "A native IDE workflow with project-scoped browsing, QuickPick search, and sidebar navigation.",
    ctaLabel: "Install VS Code Extension",
    ctaHref: "#quick-start",
    badge: "Native IDE Feel",
  },
  {
    id: "intellij",
    icon: "☕",
    name: "IntelliJ Plugin",
    meta: "JetBrains Marketplace",
    description:
      "A JetBrains-native history browser built for developers who live inside IntelliJ-based IDEs.",
    ctaLabel: "Get IntelliJ Plugin",
    ctaHref: "#quick-start",
  },
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
];

export const PLATFORM_SECTION: SectionContent = {
  eyebrow: "Choose your environment",
  heading: "Four platforms. One history.",
  description:
    "Choose the surface that fits how you work. The archive stays local, searchable, and immediately usable.",
};

export const SCREENSHOTS: ScreenshotSlot[] = [
  {
    caption: "Conversation Browser",
    description:
      "Browse every Claude Code session grouped by project, sorted by recency, and framed by the context you need to resume work quickly.",
    placeholderLabel:
      "[Screenshot: Conversation browser - project-grouped sidebar with searchable history list]",
  },
  {
    caption: "Full-Text Search",
    description:
      "Search for an error, a function name, or a library and jump directly into the exact sessions where it appeared.",
    placeholderLabel:
      "[Screenshot: Search results - query 'useEffect' showing matching sessions and snippets]",
  },
  {
    caption: "Tool Result Cards",
    description:
      "Read Claude's tool activity in the format it deserves, including diffs, bash output, and structured file operations.",
    placeholderLabel:
      "[Screenshot: Tool result cards - unified diff and terminal output displayed side by side]",
  },
];

export const SCREENSHOTS_SECTION: SectionContent = {
  eyebrow: "Product walkthrough",
  heading: "See it in action",
};

export const HONEST_CONS: HonestCon[] = [
  {
    title: "Currently Claude Code sessions only",
    description:
      "This product is valuable if you use Claude Code seriously and want to mine your own local history.",
  },
  {
    title: "Quality depends on your sessions",
    description:
      "The better your existing sessions are, the more useful the archive becomes when you need to search and reuse them.",
  },
  {
    title: "IDE plugins track IDE versions",
    description:
      "Extensions need to keep up with host IDE release cycles, so compatibility matters on very new beta builds.",
  },

  {
    title: "No cloud sync",
    description:
      "History stays on disk by design. There is no hosted sync layer or remote storage abstraction.",
  },
];

export const HONEST_CONS_SECTION: SectionContent = {
  heading: "Good to know",
  description:
    "We'd rather you know this upfront than be disappointed after installing.",
};

export const QUICK_START: QuickStartBlock[] = [
  {
    platformId: "desktop",
    platformName: "Desktop App",
    accentColor: "orange",
    steps: [
      "# 1. Clone and enter",
      "cd claude-search",
      "",
      "# 2. Install dependencies",
      "pnpm install",
      "",
      "# 3. Run in dev mode",
      "pnpm run dev",
      "",
      "# Or build a distributable",
      "pnpm run package",
    ],
  },
  {
    platformId: "vscode",
    platformName: "VS Code Extension",
    accentColor: "blue",
    steps: [
      "# 1. Enter the extension directory",
      "cd vscode-claude-code-manager",
      "",
      "# 2. Install dependencies",
      "npm install",
      "",
      "# 3. Build the extension",
      "npm run build",
      "",
      "# 4. Open in VS Code and press F5",
      "# The Claude History panel appears in the Activity Bar",
    ],
  },
  {
    platformId: "intellij",
    platformName: "IntelliJ Plugin",
    accentColor: "violet",
    steps: [
      "# 1. Enter the plugin directory",
      "cd intellij-claude-code-manager",
      "",
      "# 2. Launch with plugin loaded",
      "./gradlew runIde",
      "",
      "# The Claude History tool window",
      "# appears in the IDE sidebar",
    ],
  },
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
];

export const QUICK_START_SECTION: SectionContent = {
  eyebrow: "Installation",
  heading: "Get started in under a minute",
};

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
    { label: "Privacy",       href: "/privacy" },
  ],
};

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
