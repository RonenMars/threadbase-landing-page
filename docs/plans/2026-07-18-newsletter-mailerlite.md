# Convert the homepage waitlist to a MailerLite newsletter subscription

## Context

`components/RoadmapTeaser/WaitlistForm.tsx` is currently cosmetic: clicking the button flips a local `submitted` boolean — no `<form>`, no email capture, no network call. The original plan (`docs/plans/2026-07-18-waitlist-mailerlite.md`) wired it to MailerLite as a waitlist. Three user decisions since then:

1. **Waitlist → newsletter.** Anyone can already join the iOS/Android betas via `app/[locale]/betas/page.tsx`, so a "get notified when it ships" waitlist is pointless. Convert the form to a newsletter subscription (new copy in all 4 locales, same spot in the RoadmapTeaser section).
2. **Add an optional Name input** alongside email (no Company — consumer newsletter, conversion cost). Since Company is not a real field, the hidden honeypot keeps its original `name="company"`.
3. **No compliance libraries.** Researched npm: the popular "GDPR" packages (vanilla-cookieconsent ~277k dl/wk, react-cookie-consent, klaro, c15t) are cookie-consent banners — irrelevant to an email form that sets no cookies. No maintained email-marketing-compliance library exists; that job lives in the ESP. MailerLite covers double opt-in, consent records, unsubscribe, and DPA. Compliance here = consent copy + privacy-policy link + no pre-ticked boxes + double opt-in enabled in MailerLite. Zero new dependencies.

Scope boundaries (user instruction):

- Branch `feat/waitlist-mailerlite` (as originally specified).
- Skip MailerLite dashboard setup; `MAILERLITE_API_KEY=` placeholder in `.env.example` only.
- Verification: `vitest run`, `eslint . --fix`, `npm run build`. Manual MailerLite e2e and `npm run test:visual:update` are skipped — flag as pending for the user.
- Stop after showing staged diff + commit message; no commit without approval.
- PR description must list the four locale `consent` strings (en/ru/he/ar) for review.

Confirmed from exploration:

- `app/api/` and `.env.example` don't exist yet (first API route, first env var in repo).
- Localized link import is `import { Link } from "@/i18n/routing"` (no `@/i18n/navigation` in this repo).
- `tests/setup.ts` has no fetch mocking (just jest-dom + IntersectionObserver polyfill) — tests use `vi.stubGlobal("fetch", ...)`.
- Current locale subtree `home.roadmap.waitlist`: `heading`, `body`, `placeholder`, `button`, `submitted`, `footnote` in en/ru/he/ar.
- `app/[locale]/privacy-policy/page.tsx` exists.

## Changes

### 1. `app/api/subscribe/route.ts` (new)

POST handler (~30 lines):

- Parse JSON body `{ email, name, company }` — `company` is the honeypot; if non-empty, return 200 silently without calling MailerLite.
- Validate email (simple regex + length cap) → 400 on failure. `name` optional, length-capped, no validation beyond that.
- `fetch("https://connect.mailerlite.com/api/subscribers", ...)` with `Authorization: Bearer ${process.env.MAILERLITE_API_KEY}`, body `{ email, fields: { name } }` (fields only when name present). MailerLite upserts, so duplicate submits are safe; account-level double opt-in toggle handles confirmation.
- 200 on success, 502 on MailerLite failure. Never log the email.
- Lives outside `app/[locale]/` so next-intl locale-prefix middleware doesn't apply.

### 2. `components/RoadmapTeaser/NewsletterForm.tsx` (rename + rewrite of WaitlistForm.tsx)

- Rename file/component WaitlistForm → NewsletterForm; update the import in the RoadmapTeaser parent.
- Real `<form onSubmit>`: optional Name input + Email input + button, read via `FormData`; hidden honeypot input (`name="company"`, `autoComplete="off"`, visually hidden, `tabIndex={-1}`).
- State: `useState<"idle" | "sending" | "done" | "error">`.
- Submit → `fetch("/api/subscribe", ...)`; `done` shows success copy, `error` shows inline error and leaves form usable, `sending` disables the button.
- Consent microcopy under the form via `t.rich("consent", ...)` linking to `/privacy-policy` with `Link` from `@/i18n/routing`. No checkbox (single-purpose subscription).

### 3. Locales — `locales/en.json`, `ru.json`, `he.json`, `ar.json`

Rename subtree `home.roadmap.waitlist` → `home.roadmap.newsletter` and rewrite copy for newsletter semantics in all four locales:

- `heading`/`body` — newsletter framing (e.g. "Stay in the loop" / product news + updates), replacing ship-notification copy.
- `namePlaceholder` (new), `placeholder` (email), `button` (e.g. "Subscribe").
- `submitted` — "check your inbox to confirm" (double opt-in), `sending`, `error` (new).
- `consent` (new, rich text with `<link>`): "By subscribing you agree to receive product updates and news from Threadbase. See our <link>Privacy Policy</link>." — translated in ru/he/ar.
- Keep `footnote` if still sensible with newsletter copy, else rewrite.
- Check `metadata`/other references to the waitlist wording — update only if they reference this section directly.

### 4. Env + docs

- `.env.example` (committed): `MAILERLITE_API_KEY=` with a one-line comment.
- Short "Environment variables" note in `CLAUDE.md`.

### 5. Tests

- `tests/roadmap-teaser.test.tsx`: update render test for new copy/fields; rewrite submit test to type an email, `vi.stubGlobal("fetch", ...)`, assert success message; add error-path test (fetch rejects → error text shown).
- New `tests/api-subscribe.test.ts`: call `POST` directly with mocked fetch — valid email (+name) → forwards to MailerLite, 200; invalid email → 400; honeypot filled → 200 with no MailerLite call.

## Out of scope

- MailerLite dashboard setup (account, double opt-in toggle, API token).
- Privacy-policy page copy update (follow-up PR per original plan).
- Manual e2e with a real API key — **pending for user**.
- `npm run test:visual:update` — **pending for user** (form changes alter the homepage snapshot).
- Any compliance/consent npm library — researched, none applicable.

## Verification

1. `vitest run` green (new route + form tests included).
2. `eslint . --fix` clean.
3. `npm run build` passes.
4. Report pending items: manual MailerLite e2e, visual snapshot update.

## Delivery

Branch `feat/waitlist-mailerlite`. Stop after staging: show the full staged diff and the exact conventional commit message, wait for explicit approval before `git commit`. PR description (post-approval) lists the four `consent` strings for review.
