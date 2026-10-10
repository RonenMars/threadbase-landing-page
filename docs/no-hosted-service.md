# Hosted services and the "nothing leaves your machines" claim

**Status as of 2026-10-08: there is an optional hosted service, the Threadbase Relay, and it is off by default.** By default the app talks only to streamers the user runs, and nothing routes through a Threadbase-operated server.
The relay is a side service for people who want the simplest setup, with no tunnel, port forwarding or VPN.
It only exists for a user who turns it on.

This file used to list the claims a hosted service would falsify, and said not to hedge them early.
The relay is that event, so the claims below were changed together in one pass.
It stays as the checklist for the next change in this area: anything that adds a Threadbase-operated server to a path the site describes.

## The rule

The site leads with **"Nothing leaves your machines."** and the default story is self-hosting.
Every statement about the relay has to stay true for both kinds of user, the one who never turns it on and the one who does.

- Say **"by default"** or **"unless you turn on the optional relay"** rather than an absolute the relay breaks.
- Say what the relay can and cannot see. It cannot read prompts, transcripts, approvals, files or terminal output, and holds no key that could. It can see connection metadata: the client's IP address, a route id derived from the streamer's public key, request method and path, timing and byte counts.
- Never replace a true statement with a vague one. "Your data is private" is worse than the specific sentence.
- Do not claim the relay is available to users until the app and streamer ship it. At the time of writing the streamer's `relay` feature flag is off by default and described as "in development".

## Where the claims live

All in `locales/*.json` unless noted, with he/ar/ru counterparts that must change together (the docs are English-only).

| Key | What it says now |
|---|---|
| `home.security.heading` | Leads with "Nothing leaves your machines." |
| `home.security.description` | By default the phone talks straight to the streamer; no Threadbase server in between. |
| `home.security.cantSee[0]` | Never readable by Threadbase; touches a Threadbase server only if the optional relay is on, and then only as encrypted bytes. |
| `home.security.scopeNote` | Describes the relay as an optional, off-by-default side service and what it can see. |
| `home.faq.items[5].answer` | "Self-host the streamer on your own machines." Still true as written; revisit when the relay's pricing or limits are decided. |
| `pages.support.privacyBeforeLink` | Thin client for streamers you host; connects straight to them by default; optional relay. |
| `pages.privacy` | Section 7 covers the relay; Fly.io is listed as a sub-processor; section 1, the traffic list and "What we do not collect" are scoped to "by default". |
| `content/docs/index.mdx` | Callout describes the optional relay and what it sees. |
| `.agents/product-marketing.md` | "self-hosted by default (optional relay)" in the proof points. |

Outside this repo, still to be changed when the app ships the relay (reported, not edited from here):

- `docs/FEATURES.md` (threadbase-mobile) — "No hosted relay — session traffic goes directly to your own streamers; nothing routes through a Threadbase-run server."
- `README.md` (threadbase-mobile), privacy section — "a thin client for self-hosted streamers".

## What else the relay drags in

- **The privacy policy has a new processor.** Fly.io hosts the relay, in Amsterdam (`primary_region = "ams"` in `threadbase-relay/fly.toml`). The policy's sub-processor list is Expo, Apple, Sentry, MailerLite and Fly.io.
- **Policy changes go through the repo's own tooling.** Editing `pages.privacy` turns `tests/privacy-meta.test.ts` red until `npm run bump-privacy-date` has run. See `docs/plans/2026-09-06-privacy-content-hash.md`.
- **Sentry's IP setting is per-project.** The `threadbase` project has "Prevent Storing of IP Addresses" enabled. A relay reporting into a *new* Sentry project starts without it, so turn it on at project creation; it only affects events ingested afterwards.
- **The web-version diagnostics sentence stays unwritten.** The Anonymous Diagnostics spec (§17) has a clause about Sentry not using a visitor's IP as a substitute identity on web. It is absent from the policy because there is no web version to describe.
- **Re-check the facts before each change.** The relay's logging and hosting are defined by `threadbase-relay` (`src/`, `fly.toml`) and `tb-streamer/docs/architecture/2026-10-04-threadbase-relay.md` (sections 4, 6, 7, 9). Copy comes from there, not from memory.
