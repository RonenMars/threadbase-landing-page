# Wire the homepage "Notify me" waitlist form to MailerLite

## Context

The waitlist form in `components/RoadmapTeaser/WaitlistForm.tsx` is currently cosmetic — the button flips a local `submitted` boolean and the email is discarded. We're connecting it to MailerLite (chosen for its free tier: 500 subscribers, 12k emails/mo, EU-based, built-in double opt-in and unsubscribe handling) so signups actually land on a mailing list, in a GDPR-compliant way. This introduces the repo's first API route and first environment variable.

## Manual prerequisites (user, in MailerLite dashboard)

1. Create a MailerLite account (free plan).
2. Account settings → Subscribe settings → toggle **"Double opt-in for API and integrations" ON**; customize the confirmation email text.
3. Generate an API token (Integrations → API) and provide it as `MAILERLITE_API_KEY`.
4. Update the privacy policy page content (`app/[locale]/privacy-policy/page.tsx` copy) to mention: email collected for launch updates, MailerLite as processor, retention, right to erasure. (Can be a follow-up PR.)

## Changes

### 1. `app/api/subscribe/route.ts` (new — first route handler in repo)

POST handler, ~30 lines:
- Parse JSON body `{ email, company }` — `company` is a honeypot field; if non-empty, return 200 without doing anything (fools bots silently).
- Validate email with a simple regex + length cap; return 400 on failure.
- `fetch("https://connect.mailerlite.com/api/subscribers", { method: "POST", headers: { Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}` }, body: { email } })`. MailerLite returns 200/201 on success (upsert semantics — duplicate submits are safe), 422 on invalid data. Double opt-in is handled by the account-level toggle; no `status` field needed.
- Return 200 on success, 502 on MailerLite failure. No email is logged.
- Lives outside `app/[locale]/` so the next-intl middleware locale-prefixing doesn't apply.

Skipped: rate limiting, zod, env validation framework — add if abuse or config bugs actually appear.

### 2. `components/RoadmapTeaser/WaitlistForm.tsx` (rewrite internals, same visual shell)

- Wrap input+button in a real `<form onSubmit={...}>`; read email via `FormData`; add hidden honeypot input (`name="company"`, `autoComplete="off"`, visually hidden, `tabIndex={-1}`).
- State: `"idle" | "sending" | "done" | "error"` (single `useState`, replaces the boolean).
- On submit: `fetch("/api/subscribe", ...)` → `done` shows existing `t("submitted")` message (adjust copy to mention the confirmation email, see i18n); `error` shows inline error text and leaves the form usable; `sending` disables the button.
- Add consent microcopy under the form: rendered with `t.rich("consent", ...)` linking to the existing privacy-policy route (use the repo's localized `Link` from next-intl navigation, same as `NavMenu`). This is the GDPR consent statement — no checkbox needed for a single-purpose waitlist.

### 3. Locales — `locales/en.json`, `ru.json`, `he.json`, `ar.json`

Under `home.roadmap.waitlist` add keys (translated in all 4): `sending`, `error`, `consent` (e.g. "By subscribing you agree to receive launch updates from Threadbase. See our <link>Privacy Policy</link>."). Update `submitted` copy to say "check your inbox to confirm" (double opt-in changes the success meaning).

### 4. Env

- Create `.env.example` (committed) with `MAILERLITE_API_KEY=` and a one-line comment; actual key goes in `.env.local` (already gitignored) and the deploy host's dashboard.
- Add a short "Environment variables" note to `CLAUDE.md` or README.

### 5. Tests

- Update `tests/roadmap-teaser.test.tsx`: the existing "shows success message after waitlist submit" test clicks with no email and expects instant success — rewrite to type an email, mock global `fetch` (vi.stubGlobal), assert success message; add one error-path test (fetch rejects → error text shown).
- New `tests/api-subscribe.test.ts`: call the route handler's `POST` directly with mocked `fetch` — cases: valid email → forwards to MailerLite and returns 200; invalid email → 400; honeypot filled → 200 with no MailerLite call. Uses existing vitest setup (`tests/setup.ts`).
- Visual: the consent line changes the homepage full-page snapshot → run `npm run test:visual:update` after confirming the rendering is intentional.

## Verification

1. `vitest run` — all unit tests green, including the new route-handler and form tests.
2. `eslint . --fix` clean; `npm run build` passes.
3. Manual end-to-end: `npm run dev` with a real `MAILERLITE_API_KEY` in `.env.local`, submit a test email on `/`, confirm the subscriber appears in the MailerLite dashboard as **unconfirmed** and the confirmation email arrives; click it and confirm status flips to active. Also verify a bad email shows the inline error and a filled honeypot (via curl) is silently accepted.
4. `npm run test:visual:update` for the changed homepage snapshot, eyeball the diff.

## Delivery

Branch `feat/waitlist-mailerlite`, PR to `main` (no direct push; commit only after showing the staged diff and message per user rules).
