# Threadbase Privacy — Consolidated Checklist & Validation

Derived from two source docs in `threadbase-mobile`:

- `docs/privacy-policy/proposed-privacy-policy.md` (the policy text)
- `docs/privacy-policy/privacy-follow-up-checklist.md` (the follow-up items)

**Scope note.** The follow-up checklist is written against the **mobile app**, not this
marketing site. Ownership is split three ways and marked on every item:

| Owner | Meaning |
|---|---|
| **LANDING** | Owned by `tb-landing` — publishing the policy text. Validated in this repo. |
| **MOBILE** | Owned by `threadbase-mobile` — app runtime. Validated by reading that repo at `main`. |
| **STREAMER** | Owned by the streamer repo — not reachable from either repo above. |
| **EXTERNAL** | Sentry dashboard / App Store Connect / Play Console — not verifiable from source. |

Status: `[x]` verified in code · `[ ]` not done / not verifiable · `[!]` mismatch found

---

## 1. Sentry SDK configuration

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| 1.1 | Verify Sentry SDK configuration | MOBILE | `[x]` | `services/sentry.ts` — single module owns all SDK interaction; app never imports `@sentry/react-native` directly. |
| 1.2 | Confirm `sendDefaultPii = false` | MOBILE | `[x]` | `services/sentry.ts:176` — `sendDefaultPii: false`. |
| 1.3 | Verify server-side IP scrubbing | EXTERNAL | `[ ]` | Client-side is covered: `sanitizeUser()` strips `ip_address`, and IPv4/IPv6 value patterns redact IPs. **Server-side "Prevent Storing of IP Addresses" must still be confirmed in the Sentry project settings.** |
| 1.4 | Audit `beforeSend` sanitization | MOBILE | `[x]` | `services/sentry.ts:79-85` → `sanitizeEvent()`; allowlist-first (`EVENT_ALLOWED_KEYS`), fails closed (`catch → null`). |
| 1.5 | Session Replay disabled | MOBILE | `[x]` | `replaysSessionSampleRate: 0`, `replaysOnErrorSampleRate: 0`; `Replay`/`MobileReplay` in `BLOCKED` integrations. |
| 1.6 | Profiling disabled | MOBILE | `[x]` | No profiling integration enabled; `enableAutoPerformanceTracing: false`. |
| 1.7 | Performance Monitoring / Tracing disabled | MOBILE | `[x]` | `tracesSampleRate: 0`, `enableAutoPerformanceTracing: false`, `enableUserInteractionTracing: false`. |
| 1.8 | Breadcrumbs (console, HTTP, navigation) appropriate | MOBILE | `[x]` | `filterIntegrations()` blocks `Breadcrumbs`/`Console`/`HttpClient`; `sanitizeBreadcrumb()` drops `http`/`xhr`/`fetch`/`navigation`/`ui.click`/`ui.input`/`console`; free-form messages kept only if `isSafeEnumToken()`. `maxBreadcrumbs: 20`. |

**Extra hardening found (beyond the checklist):** `attachScreenshot: false`, `attachViewHierarchy: false`,
`enableCaptureFailedRequests: false`, `enableAutoSessionTracking: false`, `enableWatchdogTerminationTracking: false`,
and `DeviceContext`/`ExpoConstants`/`ReactNativeInfo` stripped.

---

## 2. Crash reporting

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| 2.1 | Fields sent — JS exception | MOBILE | `[x]` | `sanitizeExceptionValue()` keeps `type`/`value`/`module`/`stacktrace`; `sanitizeStackFrame()` explicitly drops `vars`, `pre_context`, `context_line`, `post_context`. |
| 2.2 | Fields sent — native iOS crash | MOBILE | `[x]` | Same `beforeSend` allowlist applies to native events routed through the JS layer. **Caveat:** see 6.2 — raw envelopes should still be eyeballed once. |
| 2.3 | Fields sent — native Android crash | MOBILE | `[x]` | As 2.2. |
| 2.4 | Fields sent — manual crash report | MOBILE | `[x]` | `reportOneShot()` reuses the same `performInit()` + `beforeSend`, so both paths cannot drift. |
| 2.5 | Installation identifier lifecycle | MOBILE | `[x]` | `services/sentry-install-id.ts` — random v4 UUID, own SecureStore key, deliberately separate from the `X-Client-Id` network correlator; `clearSentryInstallId()` on disable. Matches policy wording. |
| 2.6 | Opt-in / opt-out behavior | MOBILE | `[x]` | `initCrashReporting()` returns early unless `consentGranted`; `disableCrashReporting()` calls `Sentry.close()` + clears id; `reportOneShot()` tears its client down again so "off" stays off. |

---

## 3. Feedback

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| 3.1 | Finalize feedback transport architecture | MOBILE | `[x]` | `services/feedback-transport.ts` — order is endpoint → Sentry → email → clipboard, matching the published policy. |
| 3.2 | Document retention period | LANDING | `[x]` | **Resolved.** A `Retention.` entry was added to `feedbackDetails` in all four locales: Sentry-submitted feedback inherits the 90-day crash retention; emailed feedback is kept until the request is resolved. |
| 3.3 | Document attachment handling | LANDING | `[x]` | Policy covers EXIF-stripping, size limits, preview/remove. Code path: `loadAttachment()` → Sentry attachment. |

**Note on 3.3 / attachments:** `submitFeedbackViaSentry()` documents that attachments bypass `beforeSend`
(Sentry never routes attachments through that hook). The policy's claim holds because the image is
user-picked and EXIF-stripped upstream — but it is worth keeping in mind as an audit point.

---

## 4. Push notifications

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| 4.1 | Audit notification payload | STREAMER | `[ ]` | **Not verifiable from either repo.** `services/push.ts` only registers the token (`POST /api/push/register`); the payload is composed by the streamer. |
| 4.2 | Payload excludes prompts / terminal output / credentials / repo info / conversation content | STREAMER | `[ ]` | Same as 4.1. The policy asserts this ("Threadbase is designed so these payloads do not include…") — the assertion is currently **unverified in code available here**. |

---

## 5. Privacy & Legal

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| 5.1 | Replace Sentry region placeholder | LANDING | `[x]` | **Resolved.** Region confirmed as the **European Union** and named explicitly in all four locales, replacing the vague "region configured for the Sentry project". |
| 5.2 | Add controller/entity information | LANDING | `[ ]` | **Blocked — needs a legal entity name.** Nothing in the repo declares one (`Ltd`/`LLC`/`GmbH`/"controller" all absent); only `support@threadbase.sh` is published. Cannot be invented. |
| 5.3 | Review GDPR / UK GDPR wording | LANDING | `[ ]` | **Blocked — needs legal review.** No lawful-basis or data-subject-rights section exists. Depends on 5.2 (rights must be exercised against a named controller). |
| 5.4 | International transfer wording | LANDING | `[x]` | **Resolved.** Now that the region is known (5.1), each locale states that crash reports from outside the EU are transmitted to and stored in the EU. |
| 5.5 | Review deletion request flow | LANDING | `[x]` | Published: deletion requests routed to `support@threadbase.sh`, scoped to the install id "where feasible". |

**Contact-address drift:** the source doc uses `ronenmars@gmail.com`; the published site uses
`support@threadbase.sh`. The site's choice is better — flagging only so the source doc gets aligned.

---

## 6. Speech recognition

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| 6.1 | Verify on-device behavior on iOS and Android | MOBILE | `[x]` | **Verified and accepted as-is.** `hooks/useVoiceInput.ts:79` sets `requiresOnDeviceRecognition: Platform.OS === 'ios'` — on **Android** audio may go to Google's speech service. Decision: keep current behaviour (forcing on-device on Android would break dictation on devices without a downloaded offline model) and rely on the corrected disclosure in 6.2. **Consequence: the Play Data Safety form must disclose audio going to Google (see 7.2).** |
| 6.2 | Adjust wording if cloud processing is possible | LANDING | `[x]` | **Fixed in this branch** — all four locales now state iOS = on-device, Android = may be processed by the system service. |

---

## 7. Store compliance

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| 7.1 | Update Apple App Privacy labels | EXTERNAL | `[ ]` | App Store Connect — not verifiable from source. |
| 7.2 | Update Google Play Data Safety form | EXTERNAL | `[ ]` | Play Console — not verifiable from source. Note this now **must** disclose speech audio going to Google on Android (see 6.1). |
| 7.3 | Verify third-party SDK disclosures | EXTERNAL | `[ ]` | SDKs in play: `@sentry/react-native` ^8.18.0, Expo push. Both are described in the policy; the store forms still need to match. |

---

## 8. Final QA

| # | Item | Owner | Status | Evidence |
|---|---|---|---|---|
| 8.1 | Compare policy against production implementation | ALL | `[x]` | This document. Two real mismatches found: speech (6.1) and the region placeholder (5.1); plus gaps 3.2, 4.1/4.2, 5.2–5.4. |
| 8.2 | Inspect raw Sentry events before release | EXTERNAL | `[ ]` | Requires a real build sending to a real DSN. 25 unit tests in `__tests__/unit/services/sentry.test.ts` cover the sanitizer, but tests are not raw-envelope inspection. |
| 8.3 | Review policy after every SDK upgrade | PROCESS | `[ ]` | Ongoing process item; no automation exists to enforce it. |

---

## Summary

**Verified working (20):** 1.1, 1.2, 1.4–1.8, 2.1–2.6, 3.1, 3.2, 3.3, 5.1, 5.4, 5.5, 6.1, 6.2.
The mobile Sentry implementation is genuinely privacy-hardened and, on the whole, **exceeds** what
the policy promises.

**All three original mismatches are now resolved:**
1. **6.1 — speech on Android is not on-device.** Decision taken: keep current app behaviour, publish
   an honest platform-specific disclosure (shipped in all four locales).
2. **5.1 — Sentry region.** Confirmed **European Union**; named explicitly in all four locales, and
   5.4 (international transfer) closed as a consequence.
3. **3.2 — feedback retention.** Documented: 90 days via Sentry, until-resolved via email.

**Still open — needs you (2):**
- **5.2 / 5.3 — controller identity + GDPR wording.** Blocked on a legal entity name; nothing in the
  repo declares one. These are lawyer questions, not engineering ones.

**Not verifiable from these repos (8):** 1.3, 4.1, 4.2, 7.1, 7.2, 7.3, 8.2, 8.3 — these need the
Sentry dashboard, the streamer repo, and the two store consoles.

> **Action required outside this repo:** 7.2 (Play Data Safety) must now disclose that dictation
> audio may be sent to Google on Android, per the 6.1 decision.
