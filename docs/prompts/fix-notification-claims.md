# Prompt — correct the notification claims in the privacy policy and the feature list

Hand this to a fresh agent session opened in `~/dev/ai-tools/tb-landing`.

---

## What is wrong

The site makes two claims about push notifications that the product does not match. Both are live, in all four locales.

**Claim 1 — a transport that does not exist.** `locales/en.json` key `privacy.pushBody` says Threadbase "obtains a push token from Expo's push service", shares it with paired streamers, and delivers "through Expo's notification relay."

Verified against `tb-streamer` `main` on 2026-08-11: there is no Expo push client, no `exp.host` or `expo.dev` call, no FCM, and **no notification sender of any kind**. `POST /api/push/register` stores tokens and nothing consumes them except the Live Activity sender.

**Claim 2 — an exclusion that is not true.** The same paragraph, and `privacy.notCollectBody`, say payloads do not include prompts, terminal output, credentials, or conversation content.

The Live Activity payload carries all of them. `LiveActivityContentState` (`tb-streamer` `src/services/push/liveActivityContentState.ts:24`) is sent verbatim as the APNs `content-state` and includes `lastOutput` — raw terminal output, ANSI-stripped at `src/pty-manager.ts:835` and truncated, but genuine — plus a `title` its own comment describes as "derived from the first user message", plus `projectName`.

Because `lastOutput` is unfiltered, a session that prints an env var or an API key puts that string in the payload.

**Third, related:** Live Activities post direct to `api.push.apple.com`, not through Expo. That transport is undisclosed entirely.

## Why it matters

Apple's reviewers and GDPR both read a privacy policy literally. A policy that describes a relay the product does not use, and denies carrying data it does carry, is the kind of thing that is cheap to fix now and expensive to explain later.

## Scope

- `locales/{en,he,ru,ar}.json` — the privacy keys (`privacy.pushBody`, `privacy.notCollectBody`, the permissions table row for Notifications, the summary list around `privacy.dataList`) and any feature-list keys asserting notifications work today.
- `app/[locale]/privacy-policy/page.tsx` only if a section needs adding or removing; the copy itself lives in the locale files.
- The features section — `locales/en.json` has `"title": "Push notifications"` around line 152 and `"title": "Live Activities + Dynamic Island (iOS)"` around line 222. Check what each promises.

## The judgement call — read this before writing copy

**Do not simply delete the Expo paragraph.** `RonenMars/threadbase-streamer#528` tracks building exactly the Expo sender the policy already assumes. If you rewrite the text to describe direct-APNs-only, it has to be rewritten again when that ships, and a second mismatch becomes likely.

Ask the maintainer which of these is true before writing, and say in your PR which you were told:

1. **Expo sender is coming** — describe both transports: Live Activities via Apple's APNs from the maintainer's streamer, ordinary notifications via Expo once available. Say plainly what each payload carries.
2. **Live Activities only, indefinitely** — remove the Expo relay description, disclose direct APNs, and state that Live Activity content includes a truncated excerpt of session output.

Either way the "does not include terminal output" sentence cannot survive unqualified while `lastOutput` ships.

## The feature list needs the same honesty

`Push notifications` is listed as a feature. Today a self-hosted streamer — the primary deployment — sends nothing at all, and Live Activities work only against a streamer holding the maintainer's APNs key, because Apple issues those per developer team and the topic is bound to the app's bundle ID.

So the feature list currently promises something most users cannot get. Decide with the maintainer whether to mark it as coming, scope it to Live Activities on the maintainer's streamer, or remove it until #528 lands. **Do not quietly leave it as-is** — a store reviewer testing an advertised feature that does nothing is a rejection risk independent of the policy text.

## Constraints

- **All four locales.** `en`, `he`, `ru`, `ar`. `he` and `ar` are RTL; keep the existing tone rather than machine-translating a new register. If you cannot write a locale confidently, say so in the PR rather than guessing — wrong legal copy in a language nobody on the team reads is worse than an untranslated flag.
- Do not touch `next.config.ts` redirects or `i18n/locales.ts`.
- Run `npx vitest run` and `npx eslint` before opening the PR. There is one **pre-existing** `tsc` error in `tests/content.test.ts` on `main` — that is the baseline, not yours.
- Conventional commit title, one sentence per line in the body, no AI attribution.

## Reference

- `RonenMars/threadbase-mobile#636` — the full divergence, both directions
- `RonenMars/threadbase-streamer#528` — the missing Expo sender
- `threadbase-mobile` `docs/privacy-policy/proposed-privacy-policy.md` — the source text this site mirrors; it needs the same correction, so flag it in the PR rather than editing across repos
