# Product Marketing Context — Threadbase

Voice: the site's own — short sentences, developer-to-developer, candid (HonestCons is a brand asset, not a disclaimer). No hype adjectives.

## Product

Threadbase is the phone companion for Claude Code and Codex sessions running on your own machines. A streamer you install on each machine, an app on your phone, end-to-end encrypted between them, no relay.

## Audience

Developers who run long agentic coding sessions and refuse to be chained to the desk while the agent works: solo builders, indie hackers, small teams. Secondary: privacy-sensitive engineers who won't route session content through a vendor.

## Core promise (the verb shift)

Not "watch your agent" — *keep it working*. Leave the desk, answer when it asks, queue the next prompt, start a fresh session, take over one you launched at your desk.

## Proof points, ranked

Waiting-for-input push · single-choice approvals and questions from the phone · live terminal and chat view · prompt queue · voice dictation · start a session from the phone (project picker) · adopt and take over terminal-started sessions · cross-session full-text search · multi-machine · E2EE by default with per-device credentials · self-hosted, no relay, no analytics · Claude Code + Codex · four languages with RTL · MIT.

## Not claims (yet)

- Model/effort switching from the phone (ships with the current branch; add after release).
- Plan-mode approvals as rich cards (streamer detection is a follow-up).
- Per-type notification toggles and quiet hours (the preferences exist in the UI but drive nothing today — do not advertise).
- Diagnostics wording — after the Anonymous Diagnostics consent spec (v0.1) ships in mobile, the feature is called **Anonymous diagnostics**, is OFF by default, and the SDK is ready at startup without transmitting anything. Never say "no crash reporting"; say what the spec says. Policy text uses "pseudonymous" (random installation ID); product copy may say "anonymous" because reports are never linked to a recognizable person.

Source of truth: `docs/plans/threadbase-landing-refresh-brief.md` §1-§2. Feature verification: `../tb-mobile-features/docs/FEATURES.md` (read-only).
