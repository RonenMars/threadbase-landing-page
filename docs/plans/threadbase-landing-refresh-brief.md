# threadbase.sh refresh — feature hierarchy, copy, design, execution

Inputs: the 2026-09-05 feature scan (`threadbase-feature-scan.md`), `docs/FEATURES.md` (mobile, `docs/features` branch), the README-vs-site filter you pasted, and the current site sections (Hero, FeaturesGrid ×4, HowItWorks, QuickStart, SecuritySection, HonestCons, FinalCta, Newsletter, Footer). Everything claimed below is scan-verified unless marked.

Voice: the site's own — short sentences, developer-to-developer, candid (HonestCons is a brand asset, not a disclaimer). No hype adjectives.

---

## 1. Positioning — seed for `.agents/product-marketing.md`

**Product.** Threadbase is the phone companion for Claude Code and Codex sessions running on your own machines. A streamer you install on each machine, an app on your phone, end-to-end encrypted between them, no relay.

**Audience.** Developers who run long agentic coding sessions and refuse to be chained to the desk while the agent works: solo builders, indie hackers, small teams. Secondary: privacy-sensitive engineers who won't route session content through a vendor.

**Core promise (the verb shift).** Not "watch your agent" — *keep it working*. Leave the desk, answer when it asks, queue the next prompt, start a fresh session, take over one you launched at your desk.

**Proof points, ranked.** Waiting-for-input push · single-choice approvals and questions from the phone · live terminal and chat view · prompt queue · voice dictation · start a session from the phone (project picker) · adopt and take over terminal-started sessions · cross-session full-text search · multi-machine · E2EE by default with per-device credentials · self-hosted, no relay, no analytics · Claude Code + Codex · four languages with RTL · MIT.

**Not claims (yet).** Model/effort switching from the phone (ships with the current branch; add after release). Plan-mode approvals as rich cards (streamer detection is a follow-up). Per-type notification toggles and quiet hours (the preferences exist in the UI but drive nothing today — do not advertise). Diagnostics wording — after the Anonymous Diagnostics consent spec (v0.1) ships in mobile, the feature is called **Anonymous diagnostics**, is OFF by default, and the SDK is ready at startup without transmitting anything. Never say "no crash reporting"; say what the spec says. Policy text uses "pseudonymous" (random installation ID); product copy may say "anonymous" because reports are never linked to a recognizable person.

---

## 2. Feature hierarchy

| Tier | Feature | Why it's here | Status |
|---|---|---|---|
| Lead | Walk away, get pushed when the agent needs you | The existing pillar; still the entry point | shipped |
| Lead | Approve and answer from the phone | Existing pillar; keep "single-choice" honesty | shipped |
| Lead | **Keep it fed: prompt queue + voice + attachments** | Strongest README feature absent from the site; changes the verb | shipped |
| Lead | **Start from your phone, or take over the session you started at your desk** | The site currently says "Start at your desk" — the product no longer requires that | shipped |
| Second | Search everything, across sessions and machines | Existing pillar; real differentiator, doesn't need the hero | shipped |
| Second | All your machines, one app, per-device credentials | Existing but thin; pairs with security | shipped |
| Second | End-to-end encrypted by default | Biggest under-sell in the scan; goes in the grid *and* the security section | shipped (streamer ≥1.76) |
| Second | Operator controls from the phone: CLI flags, backup/restore, health checks (+ model/effort after release) | Credible "this is a real tool" row | shipped / pending |
| Support | Terminal viewer that strips TUI decorations; chat view with diffs and tool blocks | Insight inside a card, not a card | shipped |
| Support | Biometric lock, Markdown export, favourites, four languages with RTL | One line each in a "built for the phone" strip | shipped |
| Trust | Self-hosted, no relay, no analytics, crash reports opt-in, keys in Keychain/Keystore | Purchase reason for this audience, not a legal page | shipped |
| Keep | HonestCons, now five items (platform edges, terminal-only prompts, off-LAN is on you) | The candour is why the rest is believable | landing branch |
| Cut | Tech stack, build profiles, testing, design tokens | README material; zero conversion value | — |

---

## 3. Page structure and copy (English; translate after sign-off)

### Hero

Headline options:

- **A. "Leave the desk. Keep the agent working."** — recommended. Carries the verb shift and the continuity promise in seven words.
- B. "Your agent keeps working. You don't have to sit there." — warmer, slightly longer.
- C. "Run Claude Code from your desk. Drive it from your phone." — most literal; best for SEO, weakest as a promise.

Subhead: "Threadbase streams Claude Code and Codex sessions from your own machines to your phone. Approve, answer, queue the next prompt, or start a fresh session from anywhere. End-to-end encrypted. Nothing leaves your machines."

CTAs: primary "Get the app" (→ /betas), secondary "Install the streamer" (→ QuickStart anchor, with the copyable install command).

Hero visual: see Design, §4.1.

### How it works (keep three steps; tighten)

1. "Install the streamer on any machine that runs your agents." 2. "Pair your phone with a QR code — the keys are exchanged right there, end-to-end encrypted from the first byte." 3. "Leave. We'll push you when the agent needs you."

### Feature grid — six cards, replacing the current four

1. **Walk away.** "Threadbase watches the session and pushes you the moment the agent stops for input. Not a stream you have to babysit."
2. **Approve without a tiny terminal.** "Permission prompts and questions arrive as cards. Tap the answer. The agent keeps going."
3. **Keep it fed.** "Queue the next three prompts while the agent works. Dictate them. Attach a screenshot. It picks them up in order."
4. **Start from your phone. Or take over.** "Browse a machine's projects and launch a new session from the app — or adopt a session you started in your terminal and drive it from the phone."
5. **Search everything.** "Full-text search across every session on every machine, with snippets. Find the conversation where the agent explained that migration."
6. **Every machine, one app.** "Pair as many machines as you run. Each phone gets its own credentials you can revoke from the streamer at any time."

### Strip — "Built for the phone, not shrunk to it"

One line each, no cards: "A terminal view that strips the TUI decorations so the transcript reads like a transcript." · "A chat view with diffs and tool calls, not a wall of ANSI." · "Face ID lock, Markdown export, favourites." · "English, Hebrew, Arabic, Russian — with proper RTL."

### Security & privacy (replace the current single-message section)

Heading: keep "Your streamer. Your machines. No Threadbase session relay."

Body: "Sessions are end-to-end encrypted by default — Noise IK, X25519 and ChaCha20-Poly1305 — between your phone and each streamer. Every phone gets its own scoped credentials. Revoke one, and it's gone. Verify a machine's fingerprint with `tb-streamer identity` before you trust it."

"What we can't see" list: "Your prompts, transcripts, approvals, and files never touch a Threadbase server — there isn't one. No analytics. Anonymous diagnostics — crash reports and basic stability data, not linked to your identity — are off by default and only ever on because you switched them on. Feedback you write in Settings goes out when you tap send, and nothing else does. Keys live in the Keychain and Keystore."

Highlights: End-to-end encrypted by default · Per-device credentials, one-tap revoke · A streamer you control · Multiple paired machines.

### Operators (short strip under QuickStart)

"Configure Claude CLI flags per machine from the phone. Back up and restore streamer metadata. Check server and notification health without opening a terminal." — add "Switch model and effort mid-session" once the current branch ships.

### HonestCons — five items (as in the landing branch)

You run the streamer (+ off-LAN is on you) · It's a companion, not a replacement · [existing third] · Platform edges · Some prompts still need the terminal.

### Social proof — placeholder

Between the grid and security: GitHub stars + "MIT, source on GitHub" + two or three developer quotes once you have them. Until then, a single line: "Open source, MIT, built by a developer who runs it every day."

### FAQ (new; five questions, /support already exists — link it)

"Does it work with Codex?" · "Do I have to open ports?" (quick-tunnel helper; LAN works out of the box) · "What if my phone is offline when the agent asks?" (push waits; the session waits) · "Which platforms run the streamer?" (macOS, Linux, Windows with the platform edges) · "Why is Sentry in the app?" ("Two things you control: the feedback form in Settings, and Anonymous diagnostics — crash reports and basic stability data tagged with a random installation ID, off by default. Nothing is sent until you turn it on or tap send.") · "What does it cost?"

### SEO and metadata

Primary keyword: "Claude Code from your phone" (secondary: "Claude Code mobile", "Codex mobile", "remote Claude Code session").
Meta title: "Threadbase — Run Claude Code from your phone" (46 chars).
Meta description: "Stream Claude Code and Codex sessions from your own machines to your phone. Approve, answer, queue prompts, start sessions. Self-hosted, end-to-end encrypted." (157 chars).
Add OG and Twitter card metadata — the scan found none (§8.1 #9). Alt text on every screenshot naming the feature shown.

---

## 4. Design directions

**4.1 Show the product.** `public/screenshots/` is empty in the repo; the site describes a UI it never shows. The hero should be a real phone frame with a real approval card, next to a real terminal — same session, same content, two surfaces. A 10-second silent loop (agent stops → push arrives → tap approve → terminal continues) does more than any headline. The demo video you're planning is the source material; cut the hero loop from it.

**4.2 The approval card is the hero object.** It's the product's atomic moment. Make it the visual anchor everywhere: hero, feature 2, the security section ("this is what's encrypted"), even the 404.

**4.3 Continuity motif.** Desk on the left, phone on the right, one thread between them. Use it for the hero, "How it works", and "Start from your phone / take over" (reverse the arrow there).

**4.4 Terminal-derived palette, not AI-purple.** Dark base, one accent, monospace for anything that came from a terminal, sans for everything the phone shows. Match the app's actual theme so screenshots and page feel like one product.

**4.5 Honesty extends to visuals.** No mock dashboards, no fabricated metrics. If a screenshot is a mock, it isn't used.

**4.6 The site itself must be excellent on a phone.** Developers will read this on the device the product targets. Check the hero loop, the copyable install command, and RTL layout for he/ar on a real phone before shipping.

**4.7 Optional interaction.** A small in-page phone that "receives" a waiting-for-input push as the visitor scrolls past the grid — the promise, demonstrated. Only if it's cheap; never at the cost of 4.1.

---

## 5. Execution

**Already landing (current run, landing branch):** E2EE copy in the security section, two new grid cards, operator line, five HonestCons, privacy-date gate, interim push-token wording. This brief supersedes the card copy where they overlap — reconcile at merge.

**Phase B (this brief), one Claude Code session in the landing repo:**

1. Install only three marketing skills: `npx skills add coreyhaines31/marketingskills -a claude-code --skill product-marketing copywriting cro`. Seed `.agents/product-marketing.md` from §1 above. Skip the rest of the pack.
2. Run `page-cro` against the live page for a friction baseline; keep its findings that agree with §2–§3, discard the generic ones.
3. Implement §3 in `locales/en.json` first (new keys for the six cards, the strip, security body + "what we can't see", operators, FAQ, metadata), components only where a section is new (strip, FAQ, social-proof line, OG metadata). Then he/ar/ru; parity test green; visual snapshots updated.
4. Screenshots: capture from the app on a real device, both light/dark if the app supports it, drop into `public/screenshots/`, wire into hero and cards with alt text.
5. Gate after step 3's Phase 0 (diff plan), commit per section, no push.

**After release of the current mobile/streamer branches:** add "switch model and effort mid-session" to the operator strip; move the push-token privacy line to its final wording.

---

## 6. Anonymous diagnostics — privacy policy section (landing `pages.privacy`)

Ships **with** the mobile release that implements the consent spec, not before — the policy must describe live behavior. Draft (en), in the policy's voice:

**Anonymous diagnostics**

Threadbase can send crash reports and basic stability data to help us find bugs. This is off by default. It only turns on if you switch it on: in Settings, on the last onboarding screen if you see the option there, or by checking "Automatically send future crash reports and diagnostics" when you report a crash.

*What's included when it's on:* sanitized crash and error reports with stack traces; app version and build; operating system and version; runtime information; release and environment metadata; app session and release-health information; a coarse connection mode; non-content counts such as how many servers you've configured; and a random installation identifier.

*About that identifier:* the app generates a random ID used only for diagnostics, so reports from the same installation can be grouped. It isn't derived from your name, email, account, device hardware, advertising ID, IP address, or your Threadbase client or server identity. Strictly speaking that makes the data pseudonymous rather than anonymous; the app says "anonymous" because reports are never linked to a recognizable person.

*What's never included:* prompts, conversation or session contents, terminal output, source code, credentials, server addresses, screenshots (unless you attach one to feedback), view hierarchy, session replay, console output, HTTP request context, account IDs, email (unless you type it into feedback), device hardware or advertising identifiers, and your Threadbase streamer or client IDs.

*Turning it off:* switch it off in Settings at any time. Passive reporting stops immediately.

*Reporting one crash, or sending feedback:* you can report a specific crash or send feedback without turning on Anonymous diagnostics; that sends only that report. Technical details are attached to feedback only if you check "Include technical diagnostics" for that report, or if Anonymous diagnostics is already on. Screenshots are attached only when you pick one. Email is included only if you enter it.

*Where it goes:* reports are processed by Sentry (see sub-processors). On the web version, Sentry is configured not to use your IP address as an identifier. [Verify §17 of the spec is implemented — SDK config and Sentry project setting — before this sentence ships.]

Also update: mobile `README.md` privacy table, `docs/FEATURES.md` (one line: "Anonymous diagnostics — opt-in crash reports and stability data with a random installation ID; off by default. [shipped]"), and the privacy date via the content-hash bump.
