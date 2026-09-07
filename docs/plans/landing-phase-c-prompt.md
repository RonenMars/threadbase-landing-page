# threadbase.sh refresh — Phase C (landing repo)

Brief: `docs/plans/threadbase-landing-refresh-brief.md`. Phase C is the three items Phase B (`docs/plans/landing-phase-b-prompt.md`, shipped in PR #98) explicitly deferred because each is gated on a release outside this repo. Each item has its own precondition — check all three independently before touching anything. An item whose precondition isn't met yet is **skipped, not stubbed**: don't write speculative copy for a spec that might still change.

## Ground rules

- Worktree from `origin/main`, new branch `feat/landing-phase-c`. `npm ci`. Root checkout untouched.
- Read `CLAUDE.md` / `AGENTS.md` first. Surgical diffs, conventional commits, no AI attribution, no push without asking.
- Copy is only ever what's verified shipped. Nothing gets claimed because the brief drafted it eighteen months ago — verify against current reality first. Traceability path: `../tb-mobile-features/docs/FEATURES.md` (read-only; ask for it if the path differs) and, where FEATURES.md is ambiguous, the mobile repo's own spec/changelog.
- Every copy change lands in en first, then he/ar/ru with the same meaning and register; the locale parity test stays green.
- One commit per item, in the order below. Skip an item entirely (no commit, no draft, no TODO comment) if its precondition isn't met — say so in the final report instead.

## Item 1 — Anonymous diagnostics privacy-policy section (brief §6)

**Precondition:** the mobile app has shipped the Anonymous Diagnostics consent spec (v0.1) — the feature is user-facing as "Anonymous diagnostics," off by default, with the SDK ready at startup but not transmitting until the user opts in. Check `FEATURES.md` for a diagnostics/consent line marked `[shipped]`, and if the brief's own gate note applies — "\[Verify §17 of the spec is implemented — SDK config and Sentry project setting — before this sentence ships\]" for the "Sentry doesn't use your IP on web" sentence — confirm that specifically before including it; drop the sentence if you can't confirm it.

**If shipped**, implement in `pages.privacy` (landing `app/[locale]/privacy-policy`, `locales/*.json`):
1. Add the "Anonymous diagnostics" section using the brief's draft (§6) as the copy basis — adapt only what's stale (dates, exact toggle location, exact processor) against what's actually shipped; don't paste it verbatim without checking each clause against the shipped behavior.
2. This changes `pages.privacy` content, so it moves the privacy-date content hash — regenerate `content/privacy-meta.json` in the same commit (see `ef53189` for the pattern) and bump `lastUpdated`.
3. Update `docs/FEATURES.md` in the mobile repo is **out of scope here** (different repo) — note in the report that it still needs: `"Anonymous diagnostics — opt-in crash reports and stability data with a random installation ID; off by default. [shipped]"`.
4. Existing crash-reporting copy elsewhere on the site (security section's "what we can't see" list, FAQ's Sentry answer) currently says "crash reports are off by default and only ever sent because you switched them on" — decide whether it should be updated to say "Anonymous diagnostics" by name for consistency, or left as the more generic phrasing; both are accurate, but pick one and don't leave the site using both names for the same thing.
5. Locale parity test, privacy-uninstall-claim tests, privacy-push-token tests must all stay green — re-read `tests/content.test.ts` before editing, some of its guards are accuracy pins from prior incidents, not decoration.

**If not shipped:** skip, report the FEATURES.md line you checked and what it currently says.

## Item 2 — "Switch model and effort mid-session" operator line

**Precondition:** the mobile/streamer release that ships model/effort switching has shipped. Check `FEATURES.md` for a model/effort-switching line marked `[shipped]` (the brief's §1 "Not claims (yet)" list names this as "ships with the current branch; add after release" — confirm that branch actually merged and released, not just merged to the mobile repo's main).

**If shipped**, implement in `home.quickStart.operatorNote` (`locales/*.json`, rendered by `components/QuickStart/index.tsx`):
1. Append the clause to the existing operator note: "...and switch model and effort mid-session." (or integrate more naturally — read the current sentence before appending awkwardly).
2. Translate to he/ar/ru in the same commit.
3. No component change needed — `operatorNote` is a single translated string already.
4. Update `.agents/product-marketing.md` — remove this line from the "Not claims (yet)" list, since the seed doc should reflect current-not-future reality.

**If not shipped:** skip, report what FEATURES.md says.

## Item 3 — Final push-token revocation wording

**Precondition:** the mobile app has shipped an **in-app** device-revoke flow — i.e., a user can revoke a paired device's push token from inside the Threadbase app itself, not only via the streamer-side CLI (`tb-streamer devices revoke`). Check `FEATURES.md` for this specifically; the interim wording (commit `b43b531`) exists precisely because this flow didn't exist yet at the time.

**If shipped**, implement in `pages.privacy.yourControl` (`locales/*.json`, all four locales) and anywhere else on the site that repeats the same claim (grep for "revoke" and "push token" across `locales/en.json` before assuming this is the only spot):
1. Replace the interim sentence — "Removing a server deletes its credentials from your device. To stop a streamer from sending notifications, revoke this device on that streamer (`tb-streamer devices revoke`); revoking deletes the push token there." — with wording that describes the in-app flow as the primary path. Keep the streamer-side CLI as a fallback mention only if it's still relevant post-ship; drop it if the in-app flow fully supersedes it.
2. Regenerate `content/privacy-meta.json` (this is a `pages.privacy` change, same as item 1 — if both items ship in this run, bump the hash once, in whichever commit lands second, not twice).
3. Update/replace the `tests/content.test.ts` guard added in `b43b531` (search for "yourControl" and the CLI command string) — it currently asserts the CLI command appears in every locale; that assertion is specifically about the interim state and should change to assert the new claim instead, not just get deleted.

**If not shipped:** skip, report what FEATURES.md says. This is the item most likely to still be pending — the brief flagged it as "1d" out, but re-verify rather than trusting that estimate's age.

## Execution

1. Check all three preconditions first, before editing anything. Report the check results (which FEATURES.md lines, what they say) before proceeding — this is worth a brief pause-and-confirm with the user if more than one item turns out to be gated, since implementing one of three is a different-shaped PR than three of three.
2. Implement whichever items are unblocked, one commit each, in the order above.
3. Run `vitest run`, `eslint .`, `tsc --noEmit`, and `npm run build` after every commit.
4. Visual regression: the baseline was already red going into Phase B (5 pre-existing failures) and Phase B didn't touch it — check whether it's been fixed since; if still red, keep deferring snapshot updates and say so again rather than re-diagnosing from scratch.
5. Report: which items shipped, which were skipped and why, commits, test results, and — if item 1 or 3 shipped — the exact `docs/FEATURES.md` line (mobile repo) that needs adding, since that edit happens in a different repo than this one.
