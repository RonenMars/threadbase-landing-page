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
}

export interface ProblemItem {
  /** Phosphor icon name (e.g., "Coffee", "Bell", "MapPin"). Resolved by the component. */
  icon: string;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
  /** Optional italic post-script line below the description (used for the "swipe between servers" bonus on step 3). */
  postscript?: string;
}

export interface HowItWorksContent {
  eyebrow: string;
  heading: string;
  steps: HowItWorksStep[];
  trustNote: string;
}

export interface FeatureItem {
  /** Phosphor icon name. */
  icon: string;
  title: string;
  description: string;
  /** Surface tags (Phosphor icon names) shown top-right of the card. Typically 1 or 2 entries. */
  surfaceTags: string[];
}

export interface HonestCon {
  title: string;
  description: string;
}

export interface QuickStartContent {
  eyebrow: string;
  heading: string;
  /** Each entry is a line of the single code block. Empty strings render as blank lines. */
  steps: string[];
  /** Inline links shown below the code block (Linux, Windows, Android). */
  links: Array<{ label: string; href: string }>;
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

export type RoadmapStatus = "shipped" | "this-week" | "next" | "later" | "future";

export interface RoadmapMilestone {
  status: RoadmapStatus;
  title: string;
  detail: string;
}

export const SITE_METADATA: SiteMetadata = {
  title: "Threadbase — Your terminal. In your pocket. Live.",
  description:
    "Threadbase mirrors your Claude Code sessions to your phone in real time. Approve tool calls, redirect the agent, and monitor long runs from anywhere.",
};

export const HERO: HeroContent = {
  eyebrow: "Claude Code, untethered",
  headline: "Your terminal. Live. In your pocket.",
  subheadline: "",
  badges: [
    { label: "iOS · TestFlight beta" },
    { label: "Android · coming days" },
    { label: "macOS · Linux · Windows streamer" },
  ],
  ctas: [
    {
      label: "Join TestFlight",
      href: "https://testflight.apple.com/join/FqdM3mFK",
      variant: "primary",
    },
    {
      label: "brew install threadbase-streamer",
      href: "#quick-start",
      variant: "outline",
    },
  ],
};

export const PROBLEM_SECTION: SectionContent = {
  heading: "Three reasons Claude Code feels trapped in your laptop.",
};

export const PROBLEM_ITEMS: ProblemItem[] = [
  {
    icon: "Coffee",
    title: "You're not at your laptop.",
    description:
      "Lunch. Bed. The gym. Walking the dog. Claude is mid-task, blocked on your approval — and you're across the room or across the city.",
  },
  {
    icon: "Bell",
    title: "Long-running agents waste your day.",
    description:
      "A test suite finishes after 12 minutes. A migration completes. Claude asks \"should I commit?\" You don't see it until you sit back down.",
  },
  {
    icon: "MapPin",
    title: "Your terminal is glued to one machine.",
    description:
      "The session you started on your iMac doesn't follow you to the MacBook. Your dev environment is wherever you last sat down.",
  },
];

export const HOW_IT_WORKS: HowItWorksContent = {
  eyebrow: "How it works",
  heading: "Three steps. Ten seconds. Forever paired.",
  steps: [
    {
      title: "Run the streamer on your Mac, Linux box, or Windows PC",
      description:
        "One install. It runs in the background and exposes your Claude Code sessions to authorized devices on your network.",
    },
    {
      title: "Pair your phone in 10 seconds",
      description:
        "Open the Threadbase app, scan a QR code from the streamer. End-to-end encrypted, paired forever.",
    },
    {
      title: "Use Claude from anywhere",
      description: "Your phone is now a live window into your laptop.",
      postscript: "Pair more machines — swipe between them.",
    },
  ],
  trustNote:
    "End-to-end encrypted pairing via NaCl. The streamer never talks to a Threadbase server.",
};

export const FEATURES_SECTION: SectionContent = {
  eyebrow: "Built for mobile-first orchestration",
  heading: "The phone-shaped tools your laptop was missing.",
};

export const FEATURES: FeatureItem[] = [
  {
    icon: "MonitorPlay",
    title: "Live PTY streaming",
    description:
      "Watch your laptop's terminal output stream to your phone character-by-character. Cursor, ANSI colors, redraws — exactly as they appear on your screen.",
    surfaceTags: ["Laptop", "DeviceMobile"],
  },
  {
    icon: "CheckSquare",
    title: "Tool-call approvals",
    description:
      "When Claude asks to run a Bash command, edit a file, or call a tool, approve from your phone with a tap.",
    surfaceTags: ["DeviceMobile"],
  },
  {
    icon: "Stack",
    title: "Multi-server pairing",
    description:
      "Connect one phone to multiple Macs, Linux boxes, or Windows machines. Switch sessions with a swipe.",
    surfaceTags: ["Laptop", "DeviceMobile"],
  },
  {
    icon: "BellRinging",
    title: "Push notifications",
    description:
      "Get pinged when Claude finishes a long task, errors out, or asks a question. Stop refreshing.",
    surfaceTags: ["DeviceMobile"],
  },
  {
    icon: "Compass",
    title: "Mission Control",
    description:
      "One screen, every live session, across every machine. Color-coded by status. Tap to dive in.",
    surfaceTags: ["DeviceMobile"],
  },
  {
    icon: "Microphone",
    title: "Voice prompts",
    description:
      "Tap to dictate. On-device Whisper transcribes. Type-free orchestration while you walk.",
    surfaceTags: ["DeviceMobile"],
  },
];

export const HONEST_CONS_SECTION: SectionContent = {
  heading: "Things you should know before you install.",
};

export const HONEST_CONS: HonestCon[] = [
  {
    title: "iOS-first. Android is days away.",
    description:
      "The iOS app is on TestFlight today. Android lands on Google Play this week.",
  },
  {
    title: "Closed TestFlight beta",
    description:
      "iOS access is limited while we stabilize. Request access via the TestFlight link; we approve in batches.",
  },
  {
    title: "Your phone and laptop need to reach each other",
    description:
      "Same Wi-Fi network, or a VPN that bridges them. There's no relay server in the middle — that's the point.",
  },
  {
    title: "Claude Code only, for now",
    description:
      "The streamer parses Claude Code sessions. Codex CLI, Continue, OpenCode are on the longer roadmap, not v1.",
  },
];

export const ROADMAP_SECTION: SectionContent = {
  eyebrow: "What's next",
  heading: "Eight things we're building.",
};

export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    status: "shipped",
    title: "iOS app + macOS/Linux/Windows streamer",
    detail:
      "The four surfaces above. iOS via TestFlight, streamer via GitHub Releases on all three desktop OSes.",
  },
  {
    status: "shipped",
    title: "Cross-session search",
    detail:
      "Find that one message from 3 weeks ago across every paired server. Already functional.",
  },
  {
    status: "this-week",
    title: "Android app on Google Play",
    detail: "Closing the mobile cross-platform gap.",
  },
  {
    status: "this-week",
    title: "Homebrew formula for the streamer",
    detail: "`brew install threadbase-streamer` replaces the manual GitHub Release download on macOS.",
  },
  {
    status: "next",
    title: "Workspace tagging + saved views",
    detail:
      "Tag any session, project, or conversation. Save filter+sort combos as named tabs.",
  },
  {
    status: "next",
    title: "Live Activities + Dynamic Island (iOS)",
    detail:
      "Lock-screen session status and Dynamic Island for in-progress sessions.",
  },
  {
    status: "later",
    title: "Scheduled prompts (\"send tomorrow at 9am\")",
    detail:
      "Async-teammate workflow. Compose, schedule, walk away.",
  },
  {
    status: "later",
    title: "Sync mode (native prompt forms instead of typing into PTY)",
    detail:
      "Render Claude Code's interactive prompts as native phone forms instead of typing into the terminal.",
  },
  {
    status: "future",
    title: "Multi-assistant support (Codex CLI, Continue, OpenCode)",
    detail:
      "Same local-first approach, more agents. After Claude Code is rock-solid.",
  },
];

export const QUICK_START: QuickStartContent = {
  eyebrow: "Installation",
  heading: "Get up and running in under a minute.",
  steps: [
    "# 1. Install the streamer on your Mac",
    "brew install threadbase-streamer",
    "",
    "# 2. Start it",
    "threadbase-streamer start",
    "",
    "# 3. Open the Threadbase app on your phone",
    "#    Tap \"Pair\" → scan the QR shown in your terminal",
    "",
    "# 4. (Optional) Pair more machines",
    "#    Run the streamer on your Linux box, Windows PC, or a second Mac.",
    "#    Pair each from the same app. Swipe between sessions.",
  ],
  links: [
    {
      label: "Linux",
      href: "https://github.com/RonenMars/threadbase-streamer/releases/latest",
    },
    {
      label: "Windows",
      href: "https://github.com/RonenMars/threadbase-streamer/releases/latest",
    },
    {
      label: "Android — closed beta",
      href: "/android-beta",
    },
  ],
};

export const FOOTER: FooterContent = {
  productName: "Threadbase",
  licenseText: "MIT License",
  tagline: "Built for developers who don't want to be chained to their desks.",
  disclaimer:
    "Not affiliated with Anthropic. Claude Code is a product of Anthropic.",
  githubUrl: "https://github.com/RonenMars/threadbase",
  links: [
    { label: "Home", href: "/" },
    { label: "Beta Programs", href: "/betas" },
    { label: "GitHub", href: "https://github.com/RonenMars/threadbase-mobile" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Support", href: "/support" },
    {
      label: "Report a bug",
      href: "https://github.com/RonenMars/threadbase/issues",
    },
  ],
};

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  separatorBefore?: boolean;
}

export interface NavContent {
  links: NavLink[];
}

export const NAV: NavContent = {
  links: [
    { label: "Home", href: "/" },
    { label: "Beta Programs", href: "/betas" },
    {
      label: "GitHub",
      href: "https://github.com/RonenMars/threadbase-mobile",
      external: true,
      separatorBefore: true,
    },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Support", href: "/support" },
    {
      label: "Report a bug",
      href: "https://github.com/RonenMars/threadbase/issues",
      external: true,
    },
  ],
};

export interface BetaPlatform {
  id: string;
  eyebrow: string;
  name: string;
  tagline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  steps: Array<{ title: string; body: string }>;
  note?: string;
}

export interface BetasPageContent {
  eyebrow: string;
  headline: string;
  intro: string;
  platforms: BetaPlatform[];
}

export const BETAS_PAGE: BetasPageContent = {
  eyebrow: "Early Access",
  headline: "Join the Beta",
  intro:
    "Threadbase is available in early access on both iOS and Android. Pick your platform and get the mobile companion for Claude Code on your device.",
  platforms: [
    {
      id: "ios",
      eyebrow: "iOS · TestFlight",
      name: "iOS Beta",
      tagline: "Available now via TestFlight",
      description:
        "The iOS beta is open and ready to install through Apple's TestFlight program. No waiting, no approval — just tap the link on your iPhone or iPad.",
      primaryCta: {
        label: "Join TestFlight",
        href: "https://testflight.apple.com/join/FqdM3mFK",
      },
      steps: [
        {
          title: "Install TestFlight",
          body: "If you don't have it already, download TestFlight from the App Store — it's Apple's official beta distribution app.",
        },
        {
          title: "Tap the invite link",
          body: "Open the \"Join TestFlight\" link above on your iPhone or iPad. TestFlight will open and show the Threadbase beta.",
        },
        {
          title: "Install and launch",
          body: "Tap \"Install\" in TestFlight. Once installed, open Threadbase and scan the QR code shown by the streamer on your workstation.",
        },
      ],
    },
    {
      id: "android",
      eyebrow: "Android · Google Play",
      name: "Android Beta",
      tagline: "Closed beta via Google Play",
      description:
        "The Android beta runs through Google Play's closed-testing program. You'll need to join the testers group first, then opt in via Play — takes about 10 minutes end to end.",
      primaryCta: {
        label: "Join Android Beta",
        href: "/android-beta",
      },
      steps: [
        {
          title: "Join the testers group",
          body: "Open the Google Group linked on the Android beta page and join with the Google account you use on your Android device.",
        },
        {
          title: "Wait ~10 minutes",
          body: "Google's tester-eligibility cache takes a few minutes to update after you join. Grab a coffee.",
        },
        {
          title: "Opt in on Google Play",
          body: "On your Android device, follow the opt-in link on the beta page, tap \"Become a tester\", then install from the Play Store.",
        },
      ],
      note: "If you see \"App not available\" on Play, wait 15 more minutes and try again — the permission cache occasionally lags.",
    },
  ],
};

export interface BetaStep {
  title: string;
  body: string;
}

export interface AndroidBetaContent {
  eyebrow: string;
  headline: string;
  intro: string;
  groupUrl: string;
  playUrl: string;
  steps: BetaStep[];
  fallback: {
    title: string;
    body: string;
  };
  closing: string;
}

export const ANDROID_BETA: AndroidBetaContent = {
  eyebrow: "Android closed beta",
  headline: "Join the Threadbase Android beta",
  intro:
    "Google Play's personal-developer policy gates production behind 12 testers × 14 days of closed testing. Help us hit that bar — installation is two clicks and a short wait.",
  groupUrl: "https://groups.google.com/g/threadbase-android-testers",
  playUrl: "https://play.google.com/apps/testing/com.ronenmars.threadbase",
  steps: [
    {
      title: "Join the testers group",
      body:
        "Click the button below to open the public Google Group. Sign in to the Google account you want to install on, then click “Join group” (no approval needed).",
    },
    {
      title: "Wait ≈10 minutes",
      body:
        "Google's tester-eligibility cache needs a few minutes to refresh after you join the group. Grab a coffee.",
    },
    {
      title: "Open the Play Store opt-in link",
      body:
        "On your Android phone, signed in to the same Google account, tap the second button. Then “Become a tester” → “Download it on Google Play”.",
    },
    {
      title: "Install and (optionally) pair",
      body:
        "Threadbase will install like any normal Play Store app, marked “(unreviewed)” while we're in closed testing. To use it, run tb-streamer on your workstation and scan its QR code.",
    },
  ],
  fallback: {
    title: "If you see “App not available”",
    body:
      "Wait another 15 minutes and retry — Play's permission cache occasionally lags. If it persists after 30 minutes, double-check you joined the group with the same Google account you're using on the phone.",
  },
  closing:
    "Once you're installed, you don't need to do anything else — your install counts toward the 12-tester gate just by staying on your phone.",
};
