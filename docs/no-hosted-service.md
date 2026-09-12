# There is no hosted Threadbase service

**Status as of 2026-09-12: no hosted service exists.** Threadbase is a phone app plus a streamer you install on your own machines. Nothing routes through a Threadbase-operated server, because there isn't one.

A hosted service is considered likely at some point. When it ships, it does not merely add a feature — it falsifies claims this site makes in several places at once. This file exists so those places are known in advance rather than discovered by a user.

## What breaks the day a hosted service exists

Each of these is currently true and would stop being true. All live in `locales/*.json` unless noted, and every one has he/ar/ru counterparts that must change together.

| Key | Claim |
|---|---|
| `home.security.heading` | "Your streamer. Your machines. No Threadbase session relay." |
| `home.security.description` | "Threadbase does not relay your coding-agent session through a Threadbase-hosted session backend." |
| `home.security.cantSee[0]` | "Your prompts, transcripts, approvals, and files never touch a Threadbase server — there isn't one." |
| `home.faq.items[5].answer` | "Self-host the streamer on your own machines." |
| `pages.support.privacyBeforeLink` | "Threadbase is a thin client for self-hosted streamers." |
| `.agents/product-marketing.md` | "no relay" in the Product line; "self-hosted, no relay, no analytics" in the ranked proof points |

Outside this repo:

- `docs/FEATURES.md` (threadbase-mobile) — "No hosted relay — session traffic goes directly to your own streamers; nothing routes through a Threadbase-run server."
- `README.md` (threadbase-mobile), privacy section — "a thin client for self-hosted streamers".

## What else a hosted service drags in

Not copy, but gated on the same event:

- **The privacy policy gains a processor.** `pages.privacy` currently names Expo, Apple, Sentry, and MailerLite as the complete set of sub-processors. A hosted backend is a new one, and section 1 ("traffic") describes a topology that would no longer be the only one.
- **Sentry's IP setting is per-project.** The `threadbase` project has "Prevent Storing of IP Addresses" enabled. A hosted service reporting into a *new* Sentry project starts without it — turn it on at project creation, since it only affects events ingested afterwards.
- **The web-version diagnostics sentence becomes writable.** The Anonymous Diagnostics spec (§17) has a clause about Sentry not using a visitor's IP as a substitute identity on web. It is deliberately absent from the policy because there is no web version to describe. A hosted service likely creates one.

## The rule

Do not soften these claims pre-emptively. They are accurate today, and hedged copy ("we don't currently relay…") reads as evasion while costing the candour the site trades on. Change them when the thing ships, all together, in one pass — and treat it as a positioning decision, not a copy edit.
