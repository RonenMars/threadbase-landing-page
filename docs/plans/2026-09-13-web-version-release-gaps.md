# Web version — what the site and privacy policy are missing

**Status:** gap list with settled launch decisions (2026-09-14).
**Checked:** 2026-09-13 against `origin/main` @ `ca67ce7`; decisions updated 2026-09-14.
**Scope:** everything on threadbase.sh and in the privacy policy that is missing, or becomes false, if the Threadbase app is also released as a public web version.
**Dilemmas:** end-to-end encryption, push notifications and local streamer access on web are explained in [2026-09-13-web-version-dilemmas.md](./2026-09-13-web-version-dilemmas.md).
**Settled:** public hosted web (`app.threadbase.sh`) requires end-to-end encryption (WebCrypto device key + WebSocket ticket subprotocol). Push on web is **browser notifications while Threadbase Web stays connected**, never background Web Push.

Line numbers refer to `locales/en.json` unless a file is named.
Every copy change in `en.json` needs the same change in `he`, `ar` and `ru` — the locale-parity test fails otherwise.

## What the web version is

- The same Expo / React Native app, exported as a static web bundle and hosted on Vercel (today behind a password on a non-public domain; the public domain is undecided).
- Vercel serves the files, so it processes visitor IP addresses and user agents in its request logs.
- The browser talks directly to the user's own streamer — there is still no Threadbase session relay — but a Threadbase-operated host now delivers the app itself.
- API keys and server credentials are stored in browser `localStorage` (`services/secure-store.web.ts` in tb-mobile), not an OS keychain or keystore.
- Encrypted pairing is **required** for the public hosted web app. The device key is a non-extractable WebCrypto X25519 `CryptoKey` in IndexedDB (mobile PR #1085); the WebSocket ticket rides in `Sec-WebSocket-Protocol` (streamer PR #910). Passkeys are optional later hardening, not a launch requirement.
- The streamer must be reachable over `https://` / `wss://` (recommended path: HTTPS tunnel). Direct LAN from a hosted HTTPS page is an experimental Chromium Local Network Access path, not the default. The streamer must allow the web app's origin in `browser_cors:`, and must include streamer PR #906 (released) plus the ticket-subprotocol work in PR #910.
- Not available or not verified on web: background Web Push, iOS Live Activities, Face ID / biometric lock, voice dictation, camera QR pairing, photo library, native crash handler. Browser notifications while the page stays connected are the launch notification model.
- Sentry is not configured in the web build today (no DSN).

## The three that block a public launch

1. **End-to-end encryption is required for the hosted public web app.**
   Site-wide copy claims E2EE. Launching `app.threadbase.sh` TLS-only would weaken that: a Cloudflare tunnel terminates TLS at the edge. Hold the public hosted launch until Noise works in the browser (PRs #1085 / #910). A local developer preview can exist before that.
2. **The privacy policy describes phone storage only** — Keychain / Keystore, nothing about browser storage.
3. **No Threadbase host exists anywhere in the copy.**
   The policy never names Vercel, and the site says a Threadbase server doesn't exist ("there isn't one").

## Decisions needed before any copy is written

- [x] **Hosted service?** Does a static app served from a Threadbase-operated Vercel project count as a "hosted service" under `docs/no-hosted-service.md`, and is "there isn't one" rewritten?
   a. Not a hosted service — the app is static files and session traffic still goes only to the user's streamer. Keep the claim, and scope "there isn't one" to session traffic.
   b. **Chosen.** Counts as a hosted service — do the full one-pass rewrite `docs/no-hosted-service.md` describes, now.
   c. Sidestep it — don't host the app; ship the web build for users to serve next to their own streamer (needs streamer work, and removes the CORS and mixed-content setup).
- [x] **Encryption position.** The hosted public web app launches only with end-to-end encryption. A local developer preview can exist before that.
   a. Release now as "TLS only, no end-to-end encryption", stated on the site and in the app, with a quick-tunnel warning.
   b. Release only as an unlinked beta link until Noise works in the browser.
   c. **Chosen.** Hold the public hosted launch until Noise works in the browser (WebCrypto device key + WebSocket ticket subprotocol; mobile PR #1085, streamer PR #910).
- [x] **Domain and entry points.** Public domain for the web app, and where it is linked: hero desktop CTA, nav, a `/betas` card, the Solutions page, or its own page. It should be `noindex` while in beta.
   a. **Chosen.** Own subdomain (for example `app.threadbase.sh`), linked from the hero desktop CTA, the nav and a `/betas` card.
   b. Own subdomain, linked only from a `/betas` card.
   c. A path on the marketing site's domain (for example `threadbase.sh/app`).
   d. Not linked anywhere yet — direct link only.
- [x] **Beta label and hero badge** for web.
   a. **Chosen.** "Beta" label everywhere, plus a "Web · beta" hero badge.
   b. "Beta" label on `/betas` and in the app, no hero badge.
   c. No beta label.
- [ ] **Policy shape.** "On the web version…" clauses in each section, or a separate web section? Republish with a new effective date or only update? App Store Connect and Google Play link the same policy (`next.config.ts:10-13`), so one text must stay accurate for the store apps and for web.
   a. "On the web version…" clauses inside each affected section, and a new effective date.
   b. A separate "Web version" section plus Vercel under providers, and a new effective date.
   c. A separate "Web version" section, keeping the effective date — only "Last updated" changes (`npm run bump-privacy-date` updates `lastUpdated` only).
- [ ] **Vercel disclosure details.** Log retention and processing region; confirm Vercel Web Analytics and Speed Insights stay off. Also decide whether to disclose now that the marketing site itself runs on Vercel (`proxy.ts:7` excludes `_vercel`) and sets a `NEXT_LOCALE` cookie.
   a. Disclose Vercel for the web app only.
   b. Disclose Vercel for the web app and the marketing site, including the `NEXT_LOCALE` cookie.
   c. Don't add a provider — serve the web app from somewhere Threadbase doesn't operate (see Hosted service, option c).
- [x] **Sentry on web.** Enabling it brings in the gated §17 sentence and requires "Prevent Storing of IP Addresses" on the Sentry project.
   a. Keep Sentry off on web; the policy says the web version sends no crash reports or diagnostics.
   b. **Chosen.** Turn it on, opt-in like mobile — first confirm the SDK sends no IP, enable "Prevent Storing of IP Addresses", then add the §17 sentence.
- [x] **Browser credentials.** Does a browser get its own revocable credentials, or keep using the streamer API key? This changes `features.items[5]`, `security.description` and `yourControl`.
   a. Keep using the streamer API key; the copy says web uses the shared key, not per-device credentials.
   b. **Chosen.** Per-browser revocable credentials through encrypted pairing (mobile PR #1085; device key in IndexedDB, not `localStorage`).
   c. API key now, per-browser credentials later.
- [x] **Launch gate.** Streamer PR #906 released, a minimum streamer version stated, and `browser_cors:` documented for users.
   a. Wait for a streamer release with #906, and have the app detect older streamers and show a clear message.
   b. Wait for a streamer release with #906, and state the minimum version in the docs only.
   c. **Chosen.** No gate — ship and document the known limits.

## A. Privacy policy — `pages.privacy`

| Done | Key (line) | Current text | What is missing or false for web |
|---|---|---|---|
| [ ] | `description` (409) | "thin client for the Claude Code sessions you run on your own computer… credentials stay on your device" | No browser or web version; add that credentials live in browser storage on web. (Codex is also missing — already stale.) |
| [ ] | `intro` (410) | "cases in which data leaves your device" | Fine, but the sections that follow must include app delivery from Vercel. |
| [ ] | `trafficIntro`, `trafficCategories` (412–420) | "six distinct categories" | Add a seventh: delivery of the web app by a Threadbase-operated host, which logs IP and user agent. Mark push (2) and Sentry (3) as not applicable on web. The count in the text must change with the list. |
| [ ] | `coreBody` (422) | "stored on your device (in the iOS Keychain / Android Keystore)" | On web the long-term API key still sits in `localStorage`; the E2EE device key is a non-extractable WebCrypto `CryptoKey` in IndexedDB. Add browser storage, and that session traffic is Noise-encrypted once pairing succeeds. Web still needs https/wss and `browser_cors:`. |
| [ ] | `pushHeading`, `pushBody` (423–424) | Expo, APNs, Live Activities, "Paired devices… revoke" | Add: the web version does not register Expo push tokens or receive background Web Push. At launch it may show **browser notifications while Threadbase Web stays connected**. Verify that encrypted pairing creates a paired-device record on web. |
| [ ] | `crashIntro`, `automaticReporting`, `crashSameData` (426–431) | "Native iOS and Android crashes", "Report this crash" | Say web sends no crash reports or diagnostics while it has no DSN. Verify whether the Anonymous diagnostics toggle is shown on web, where it would do nothing. |
| [ ] | `crashReportingDetails` "What is sent" (442) | "the platform (iOS or Android)… EAS update identifier" | On web the platform is "web", there is no EAS update id, and the browser user agent is involved. |
| [ ] | `crashReportingDetails` "What is excluded" (446) | "…IP addresses…" | A browser Sentry SDK sends the IP by default; only true for web with the §17 setup. |
| [ ] | `feedbackDetails` "How it is sent" (482) | "your device's email app… copy-to-clipboard" | On web that is a `mailto:` handler, and clipboard needs browser permission. Verify which feedback paths work on web. |
| [ ] | `screenshotAndDiagnosticDetails` "Screenshots" (501) | "select it explicitly from your photo library… re-encoded to strip embedded metadata" | Web uses a browser file picker; verify re-encoding and metadata stripping run on web before claiming them. |
| [ ] | `newsletterBody` (510) | "separate from the mobile app" | Also separate from the web app. |
| [ ] | `staysOnDevice[3]` (516) | "(in the iOS Keychain / Android Keystore)" | False on web; add "in your browser's local storage on the web version". |
| [ ] | `uninstallBody` (519) | app container and Keychain only | Web has no container: credentials stay until site data is cleared or the server is removed. Keep the word "Keychain" (test-pinned). |
| [ ] | `notCollectBody` (521) | "The only data that leaves your device is the core streamer traffic…, the optional push-notification token…" | False on web: loading the app sends IP, user agent and referrer to Vercel. Confirm the web bundle calls no other third parties (fonts, CDNs, Expo endpoints). |
| [ ] | `subProcessorsIntro`, `subProcessors` (523–541) | Expo, Apple, Sentry, MailerLite as the complete set | **Vercel is missing** (hosting, request logs, retention, region). The intro says each processes "only the data described in its section above", so Vercel needs its own section. Expo and Apple don't apply on web. |
| [ ] | `permissionsHeading`, `permissions` (542–567) | OS permissions: camera, photos, microphone, speech, Face ID, notifications | Unavailable or unverified on web. Add which browser permissions web requests, and that there is no biometric lock on web — anyone with the browser profile can open it. |
| [ ] | `yourControl[2]` (571) | "Removing a server deletes its credentials from your device… Paired devices…" | On web it clears browser storage (`localStorage` + the IndexedDB device key); no Expo push token. Keep "Paired devices" (test-pinned). |
| [ ] | `yourControl[3]` (572) | "Uninstalling the app…" | Add clearing site data for web. Keep "Keychain" (test-pinned). |
| [ ] | `yourControl` (new) | — | Advise rotating the API key after using the web version on a shared computer. |
| [ ] | new | — | State that `localStorage` holds credentials and counts as strictly necessary storage. |
| [ ] | `metadata.routes.privacy.description` (26) | "streamer traffic, push notifications, anonymous diagnostics…" | Add web hosting. |
| [ ] | `content/privacy-meta.json` | `effectiveDate` / content hash | Any `pages.privacy` edit requires `npm run bump-privacy-date`; CI fails until it runs. |

## B. Website copy and pages

### Hero — `home.hero`, `components/Hero/index.tsx`

- [ ] `subheadline` (80): "…to your phone… End-to-end encrypted. Nothing leaves your machines." — add the browser. Encryption holds on web only after E2EE ships; until then this line is a launch blocker for `app.threadbase.sh`.
- [ ] `badges` (83–87): no web badge.
- [ ] `primaryButtonLabel`, `ctas` (81, 88–91), `Hero/index.tsx:35-41`: desktop visitors are sent to `/betas`, and desktop is where the web app is used. `HERO_CTA_CONFIG` (`lib/content.ts:165`) only knows TestFlight and Quick start.

### How it works and Quick start — `home.howItWorks`, `home.quickStart`, `components/QuickStart`

- [ ] `howItWorks.heading` (95), `steps[1]` (103–104): "Pair your phone with a QR code — the keys are exchanged right there" / "Encrypted from the first byte" — no QR or key exchange on web.
- [ ] `howItWorks.steps[2]` (107): "We'll push you when the agent needs you." — on web this is **notifications while the page stays connected**, not background push.
- [ ] `quickStart.steps` (273–274): "Open the Threadbase app on your phone / Tap Pair → scan the QR" — no web path. Web needs an https/wss streamer URL, `browser_cors:` allowing the app's origin, a streamer including PR #906, and manual URL + API key entry.
- [ ] `quickStart.links` (280–284), `QUICK_START_LINK_CONFIG` (`lib/content.ts:185`): no web link.
- [ ] `quickStart.operatorNote` (285): "check server and notification health" — on web, notification health means browser notifications while connected, not Expo push.

### Features and phone strip

- [ ] `features.items[0]` (120–121): "pushes you the moment the agent stops" — on web this is notifications while connected, not background push.
- [ ] `features.items[2]` (129): "Dictate them. Attach a screenshot." — no dictation on web; screenshot attach unverified.
- [ ] `features.items[5]` (141): "Each phone gets its own credentials you can revoke" — web gets per-browser credentials through encrypted pairing (not the shared API key).
- [ ] `phoneStrip.heading`, `items[2]` (146, 150): "Built for the phone" / "Face ID lock" — decide whether this section stays mobile-only.
   a. Keep the phone strip mobile-only and say so.
   b. Add a web line to the strip.
   c. Replace it with a strip that covers both.

### Security — `home.security`, `components/SecuritySection.tsx`

- [ ] `description` (156): "Sessions are end-to-end encrypted by default — Noise IK…", and "Every phone gets its own scoped credentials" — add that web uses the same Noise path once pairing succeeds, and that whoever hosts the JS can still replace the build.
- [ ] `cantSee[0]` (159): "never touch a Threadbase server — there isn't one." — prompts still don't, but "there isn't one" is arguable once a Threadbase host serves the app (tied to the hosted-service decision).
- [ ] `cantSee[1]` (160): "No analytics." — holds only while Vercel analytics stays off.
- [ ] `cantSee[4]` (163): "Keys live in the Keychain and Keystore." — on web the device key is a non-extractable WebCrypto key in IndexedDB; the API key is still in `localStorage`.
- [ ] `scopeNote` (165): add app delivery (web hosting) as a separate part.
- [ ] `highlights[0]` (167): "End-to-end encrypted by default" — true on web after E2EE ships; keep the hosted-JS caveat (a compromised `app.threadbase.sh` can still replace the client).
- [x] `heading` (155): "No Threadbase session relay." — still true.

### Honest cons — `home.honestCons`

- [ ] `items[1]` (184): "keep it accessible from your phone… Cloudflare quick-tunnel helper" — add web's recommended HTTPS tunnel path, CORS, and the streamer version that accepts the WebSocket ticket subprotocol.
- [ ] `items[2]` (188): "iOS ships through TestFlight; Android ships through closed testing" — add web.
- [ ] `items[3]` (192), platform edges: the natural home for remaining web gaps (notifications only while connected, no Live Activities, Face ID, dictation, QR pairing; API key in `localStorage`). The item count is pinned at 5 by a test.

### FAQ — `home.faq`

- [ ] `items[1]` (214): "Do I have to open ports? No. Pairing over your LAN works out of the box." — hosted web's recommended path is an HTTPS tunnel. Direct LAN from a public HTTPS origin is experimental Chromium Local Network Access, not the default.
- [ ] `items[2]` (218): "The push waits…" — on web, notifications while the page stays connected, not background push.
- [ ] `items[4]` (226): "Why is Sentry in the app?" — not configured on web.
- [ ] New questions: Is there a web version? Which browsers? Does web have end-to-end encryption? (Yes, required before the public hosted launch.) Can a hosted page talk to a LAN streamer? (Tunnel is the default; Chromium LNA is experimental.)

### Final CTA, nav and footer

- [ ] `finalCta.description` (236): "Join the iOS or Android beta" — add web. `FinalCta.tsx:40` links `/betas`.
- [ ] `nav.betaPlatforms` (54–57), `components/NavMenu/index.tsx:106-199`: iOS and Android only. The footer reuses the same config (`lib/content.ts:215`).

### Betas page — `pages.betas`, `components/BetasPage`

- [ ] `intro` (292): "available in early access on both iOS and Android… on your device." — a web card needs copy, a new `BetaPlatform.id` value (`lib/content.ts:124`), `BETA_PLATFORM_CONFIG` (`lib/content.ts:217`) and the icon map (`BetasPage/index.tsx:15`). Steps: open the URL, https streamer (tunnel recommended), `browser_cors:`, streamer with PR #910, encrypted pairing.

### Android beta page

- [x] Android-only; nothing becomes false.

### Solutions — `pages.solutions` (371–374), `metadata.routes.solutions` (17–18)

- [ ] "Threadbase also ships Electron, VS Code, and IntelliJ surfaces." — the web app is another surface and is not listed.

### Support — `pages.support`

- [ ] `topics[0]`–`[1]` (386–387): installing and QR pairing — add web access and https / CORS connection problems.
- [ ] `topics[3]` (389): "App Store support questions" — store-specific.
- [ ] `requestDetails[0]` (394): "Your device model and iOS version" — web needs browser, version and OS (Android is already missing too).
- [ ] `privacyBeforeLink` (401): "thin client for self-hosted streamers. The app does not run its own analytics, crash-reporting, or telemetry service." — needs a web-hosting mention, and is already inaccurate about crash reporting because opt-in Sentry exists.

## C. Metadata and SEO

- [ ] `metadata.site.description` (5): "…from your phone across every machine you pair." — add the browser. The OG image renders only the title.
- [ ] `metadata.routes.betas.description` (10): "Join the Threadbase beta on iOS via TestFlight or Android via Google Play." — add web.
- [x] Structured data: none exists (no JSON-LD, `SoftwareApplication`, sitemap, `robots.ts`, manifest or canonical), so nothing becomes false. If added later, list iOS, Android and Web and include the web app URL.
- [ ] `app/[locale]/layout.tsx:39`: `metadataBase` is `threadbase.sh`. If the app lives under this domain, the sitemap and robots rules must account for it; on its own domain its metadata lives in the Expo web build, which should be `noindex` while in beta.
- [ ] Pre-existing, unrelated: the i18n spec (`docs/superpowers/specs/2026-07-13-i18n-design.md:52`) promises hreflang tags that are not implemented.

## D. Internal rules, briefs and tests that pin these claims

### Positioning docs

- [ ] `docs/no-hosted-service.md`: L3 "Nothing routes through a Threadbase-operated server, because there isn't one."; L31 assumes a web version only arrives with a hosted service. The table (L11–18) is also missing the hero encryption claim, `cantSee[4]`, the FAQ LAN answer and the sub-processor list. Its rule: change everything in one pass, as a positioning decision.
- [ ] `CLAUDE.md:65`, `AGENTS.md:8`: "Threadbase has no hosted service: the app talks only to streamers the user runs." — separate app delivery (Vercel) from runtime traffic.
- [ ] `.agents/product-marketing.md`: L7 "an app on your phone, end-to-end encrypted between them, no relay"; L19 proof points (push, voice dictation, E2EE by default) are mobile-only; add web limits to "Not claims (yet)" (L21–24). Same text in `docs/plans/threadbase-landing-refresh-brief.md` §1 (L11, L17, L37).
- [ ] `docs/plans/threadbase-landing-refresh-brief.md:163` and `docs/plans/landing-phase-c-prompt.md:15`: the gated §17 Sentry sentence — usable only once web Sentry has a DSN, the SDK doesn't send IP, and the project IP setting is on.
- [ ] `README.md:21-28`: no web entry. Outside this repo: tb-mobile `docs/FEATURES.md` and `README.md` ("thin client for self-hosted streamers", "No hosted relay").

### Tests that pin current copy (vitest)

Qualifying pinned text is fine; removing it fails.

- [ ] `tests/content.test.ts:117-129` — "end-to-end encrypted by default", "noise ik", and the "does not relay… Threadbase-hosted session backend" sentence.
- [ ] `tests/security-section.test.tsx:11-28` — the relay heading, the exact description sentence, the Noise IK / X25519 / ChaCha20-Poly1305 line, and "keys live in the keychain and keystore".
- [ ] `tests/hero.test.tsx` — subheadline (~28), 3 platform badges (47–54), desktop CTA href `https://threadbase.sh/betas` (~58), Android/iOS routing (66–85).
- [ ] `tests/content.test.ts:46-56` — `HERO_CTA_CONFIG` length 2, TestFlight primary.
- [ ] `tests/content.test.ts:134` — `NAV_LINK_CONFIG` length 6; `tests/nav-menu.test.tsx:147` — two beta platform rows.
- [ ] `tests/content.test.ts:79-81` — honestCons 5, highlights 4, cantSee 5.
- [ ] `tests/content.test.ts:192-223` — "Keychain" in `uninstallBody` and a `yourControl` bullet in every locale; `242-277` — "Paired devices" in `pushBody` and `yourControl`.
- [ ] `tests/content.test.ts:69-74, 149-175` — locale key parity; privacy and support arrays non-empty in every locale.
- [ ] `tests/privacy-meta.test.ts` — content hash must match (`npm run bump-privacy-date`).
- [ ] `tests/phone-strip.test.tsx:17` ("face id lock"), `tests/faq.test.tsx:15,20`, `tests/how-it-works.test.tsx:22,25`, `tests/quick-start.test.tsx:19-26`, `tests/page.test.tsx:24-28`, `tests/support-page.test.tsx:23`.
- [ ] Playwright visual snapshots (`tests/visual/landing-page.spec.ts-snapshots/*`, home above-fold and full on desktop and mobile, solutions) — `npm run test:visual:update` after hero, badge or Solutions changes.
