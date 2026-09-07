# threadbase.sh refresh — Phase B (landing repo)

Brief: `docs/plans/threadbase-landing-refresh-brief.md` (copy the brief there first; it is authoritative for hierarchy, copy, and design). This run implements brief §3 and §4 **except** the items gated on releases: the privacy-policy section (§6), the "switch model and effort" operator line, and the final push-token wording. Those are Phase C.

Precondition: `chore/scan-followups-2026-09` is merged into `main`. If `git log main --oneline | head` doesn't show its four landing commits, stop and say so.

## Ground rules
- Worktree from `origin/main`, branch `feat/landing-refresh`. `npm ci`. Root checkout untouched.
- Read `CLAUDE.md` / `AGENTS.md` first. Surgical diffs. Conventional commits, no AI attribution. No push.
- Copy is only ever what the brief says or what the scan verified. Nothing gets claimed because it sounds good. When a sentence is not in the brief, it must be traceable to `docs/FEATURES.md` in the mobile repo (read-only path: `../tb-mobile/docs/FEATURES.md`, or ask for it).
- Every copy change lands in en first, then he/ar/ru with the same meaning and register; the locale parity test stays green; the privacy-date content-hash test stays green (don't touch `pages.privacy` in this run).

## Phase 0 — plan, then STOP
1. Install exactly three skills and nothing else: `npx skills add coreyhaines31/marketingskills -a claude-code --skill product-marketing copywriting cro`. Seed `.agents/product-marketing.md` from brief §1 verbatim.
2. Run the `page-cro` skill against the live https://threadbase.sh for a friction baseline. Keep only findings that agree with brief §2–§3; list the discarded ones in one line each.
3. Map brief §3 onto the current components and locale keys: Hero (headline A, subhead, two CTAs), HowItWorks (three tightened steps), FeaturesGrid four → six cards, the new "Built for the phone" strip, SecuritySection (body + "what we can't see" list + four highlights), Operators strip without the model/effort line, HonestCons unchanged from the merged branch, social-proof line, FAQ (six questions, linking /support), meta title/description, OG + Twitter card metadata (the scan found none).
4. For each: new or changed keys, component changes (only where a section is new: strip, FAQ, social-proof line, OG metadata), and which visual snapshot tests will change.
5. Screenshots: propose the exact file list for `public/screenshots/` (hero phone frame with an approval card, one per grid card that benefits), sizes, and alt text. You cannot capture them — mark them as a human task and build the layout with sized placeholders that fail visibly if an image is missing.
6. Print the en diff for Hero + the six cards + the security section in full, the component plan, and the test impact. STOP for approval.

## Phase 1 — implement, one commit per section
Hero → HowItWorks → FeaturesGrid → phone strip → Security → Operators → social proof → FAQ → metadata/OG. After each: parity test, unit tests, and the visual suite (prove the baseline green before updating snapshots; if the baseline is red, defer snapshots and say so). Translate at the end of each section, not at the end of the run.

## Phase 2 — report
Commits, test results, screenshot list still owed by a human, discarded page-cro findings, and the Phase C checklist: policy §6 (after the diagnostics release), model/effort operator line (after the mobile/streamer release), final push-token wording (1d), `docs/FEATURES.md` cross-check for anything the site says that the file doesn't.
