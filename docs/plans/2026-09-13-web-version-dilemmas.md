# Web version — three dilemmas

**Status:** decided 2026-09-14; implementation in flight (mobile PR #1085, streamer PRs #910 and #911).
**Written:** 2026-09-13. **Revised:** 2026-09-14 after review against `main` of threadbase-mobile and threadbase-streamer and current browser documentation.
**Companion to:** [2026-09-13-web-version-release-gaps.md](./2026-09-13-web-version-release-gaps.md), the list of site and policy changes a public web version needs.

## Decisions

| Dilemma | Decision | Launch blocker? |
|---|---|---|
| 1. End-to-end encryption on web | **1b with A3 + B**: end-to-end encryption before the hosted public web app launches. Browser key as a non-extractable WebCrypto X25519 key in IndexedDB; the WebSocket ticket in `Sec-WebSocket-Protocol`. Passkeys (A2) become optional hardening later. | **Yes**, for `app.threadbase.sh`. A local developer preview can exist before it. |
| 2. Notifications on web | **2b at launch**, worded as browser notifications while Threadbase Web stays connected — never "push". 2c is deferred until Web Push has a design for multiple streamers. OneSignal (2d) rejected. | No |
| 3. Local and LAN connectivity | **3b**, revised for Chrome's Local Network Access: hosted web + HTTPS tunnel is the recommended path, locally served web is the no-tunnel path, hosted web + direct LAN is an experimental Chromium path. No change to the streamer's default CORS origins. | Documentation and onboarding |

### Implementation order

1. **Web end-to-end encryption:** non-extractable WebCrypto X25519 device key in IndexedDB → async static-key DH in Noise → WebSocket ticket through `Sec-WebSocket-Protocol` (streamer + app) → interoperability and security tests against the existing streamer.
2. **Connectivity and onboarding:** separate hosted and local instructions, the tunnel as the default hosted path; test Chrome's Local Network Access (fetch and WebSocket), Safari and Firefox before advertising direct LAN.
3. **Browser notifications while connected:** a `.web.ts` implementation driven by the existing WebSocket session state, with accurate permission copy.
4. **Fix the streamer's push capability report** so `/api/info` matches what the server sends (see dilemma 2).
5. **Design Web Push later**, starting from the multi-streamer constraint.

Each dilemma follows the same shape: the question, how it works today (with the file or source that shows it), the options with what each costs, what it changes on the site and in the privacy policy, and the decision.

---

## 1. End-to-end encryption on the web version

### The question

The site says Threadbase is end-to-end encrypted. Should the web version be end-to-end encrypted before it launches, launch without it and say so, or never have it?

### What "end-to-end" means here, and why HTTPS is not it

End-to-end encryption means only two parties can read session traffic: the Threadbase app and the user's own streamer. Nothing in between can — not Cloudflare, not a proxy, not a hosting provider.

HTTPS is encryption between the browser and whatever terminates TLS:

- Loading the app from `https://app.threadbase.sh` protects the *download* of the app's files, between the browser and Vercel. After the files load, Vercel is not involved in any session traffic.
- The browser then talks to the streamer's URL. If that URL is a Cloudflare Tunnel (the setup the site recommends), TLS ends at Cloudflare's edge. Cloudflare forwards the traffic to the streamer, and on that hop it can read it.

So HTTPS through Vercel does not make the web version end-to-end encrypted. On mobile, the Noise protocol layer inside the app provides that guarantee on top of any TLS. On web that layer is currently switched off.

### How it works today

- **The crypto already runs in a browser.** The app's Noise implementation (`services/e2ee/noise.ts`, `pair-handshake.ts`, `record.ts`) uses pure-JavaScript libraries: `@stablelib/x25519`, `@stablelib/chacha20poly1305`, `@stablelib/sha256`, `@stablelib/hmac`, `tweetnacl`. No native module is involved.
- **Web refuses to store the device key.** `services/secure-store.web.ts` sets `HAS_SECURE_KEYCHAIN = false`, and `services/pair-exchange.ts:263` refuses encrypted pairing when that is false. The reason is deliberate: on web, "secure storage" is `localStorage`, which any script on the page can read, and the design refuses to keep a long-lived device key there.
- **The encrypted WebSocket needs a header a browser cannot send.** On an encrypted connection the app opens the socket with a one-time ticket in an `X-TB-Ticket` HTTP header (`services/ws-client.ts`). Browser WebSockets cannot set custom headers. So even with a key store, the streamer would need to accept the ticket another way.
- Result: web connects with the plain API key over whatever TLS the streamer URL provides.

### What it would take

Two pieces of work, both needed.

**A. A key store the pairing code will accept.** Three options, from weakest to strongest:

| Option | How it works | Protects against | Does not protect against | Work |
|---|---|---|---|---|
| **A1. WebCrypto-wrapped key in IndexedDB** | Generate a non-extractable AES key with WebCrypto, store it in IndexedDB, and use it to encrypt the Noise device key. | Someone copying the browser's storage files or a dump of `localStorage`. | Malicious script running on the page: it cannot export the wrapping key, but it can ask the browser to use it. | Small, app only. |
| **A2. Passkey-derived key (WebAuthn `prf` extension)** | The user creates a passkey for the web app. Each time the app starts, the user unlocks it (Face ID, Touch ID, Windows Hello, a security key), and the passkey's PRF output derives the key that decrypts the device key. | Storage theft, and a stolen laptop without the user's biometric or PIN. The key is only available after a deliberate unlock. | Malicious script running *after* the user unlocks. | Medium, app only. Needs a browser and authenticator that support PRF; check current support before committing. |
| **A3. Key exchange inside WebCrypto** | Keep the X25519 private key as a non-extractable WebCrypto key and do the Diffie-Hellman step with `crypto.subtle.deriveBits`. The raw key never exists in JavaScript memory. | Any way of copying the key out. | Malicious script using the key in place while it runs. | Medium: the static key is used in exactly two `dh()` calls in `noise.ts` (lines 304 and 330, both synchronous today), so those move behind an async DH function; SHA-256, HKDF, ChaChaPoly and framing stay as they are. |

A2 and A3 can be combined. Your note on the privacy policy row suggested Passkeys; that is A2.

**B. A ticket channel a browser can use.** The streamer accepts the one-time ticket on the WebSocket upgrade through something a browser can send, and the app sends it that way on web only (`ws-client.web.ts` or a `Platform.OS` branch). Small, but it is a streamer change and needs a streamer release.

- **`Sec-WebSocket-Protocol` (chosen).** Browsers set it from the second argument of `new WebSocket(url, protocols)`. The client offers two values, `threadbase-e2ee-v1` and `tb-ticket.<ticket>`; the streamer reads the ticket from the second and answers with `threadbase-e2ee-v1`. The ticket is 16 random bytes in base64url (`src/e2ee/context.ts:582`, 22 characters), which is valid in that header. Keep the existing single-use and 30-second rules. Check with a test that the upgrade answers with `threadbase-e2ee-v1` and never echoes the ticket value.
- **Query parameter (fallback only).** The streamer deliberately put the ticket in a header, never the URL, because Cloudflare logs full request URLs (`src/e2ee/context.ts`, the `TICKET_HEADER` comment). Use a query parameter only if `@hono/node-ws` makes protocol negotiation impractical, and then with explicit redaction in every log.

### The limit no option removes

A web app is downloaded again on every visit. Whoever controls what `app.threadbase.sh` serves — the Vercel project, its deploy pipeline, the domain's DNS — could serve modified JavaScript that reads messages before they are encrypted. Store-installed apps do not have this exposure in the same way, because a binary is signed and reviewed once and does not change between launches.

This is true of every web app that claims end-to-end encryption (web versions of encrypted messengers included), and it is normally disclosed rather than solved. It should be documented in the privacy policy and reduced with:

- a strict Content Security Policy and no unnecessary third-party JavaScript,
- immutable, content-hashed assets and published build provenance,
- the self-hosted or locally served web app as the highest-trust web option (`npx expo start --web` or a static export the user serves), since it is not exposed to a hosted build.

### Options

- **1a. Launch as "TLS only", clearly disclosed.** The web version is labelled beta and the site says it is not end-to-end encrypted, with a warning that a TLS-terminating tunnel (Cloudflare) can read web traffic. Cheapest; honest; weakens the "end-to-end encrypted" headline, which then needs "on iOS and Android" everywhere.
- **1b. Build A (A1 or A2) + B, then launch.** The web version joins the end-to-end promise, with the "code is re-downloaded" caveat in the policy. Delays launch by the app and streamer work.
- **1c. Launch 1a now, ship 1b later.** Beta without encryption, with a dated plan to add it; the site copy changes twice.

### Site and policy impact

- 1a: every "end-to-end encrypted" claim gets a mobile-only qualifier (hero subheadline, How it works, Security description and highlights, `.agents/product-marketing.md`); the policy's core traffic section adds a web paragraph; the Cloudflare warning goes into Security and Honest cons.
- 1b: the claims stay, with a web caveat about served code; the policy explains how the web key is stored (IndexedDB wrapping key or passkey).

### Decision (2026-09-14): 1b with A3 + B

The hosted public web app (`app.threadbase.sh`) launches only with end-to-end encryption. A local developer preview can exist before that, but it is not marketed as a normal Threadbase client.

**Why not 1c (the earlier recommendation).** Without Noise, web sends the ordinary API credential and all session traffic — terminal output, code, prompts, approvals, remote control — over TLS that a Cloudflare Tunnel terminates. A hosted client that weakens the native clients' security model works against one of Threadbase's main differentiators, and the browser primitives are now good enough to avoid it.

**Why A3 as the baseline.**
- WebCrypto supports X25519: MDN's compatibility data lists `generateKey`, `deriveBits` and `importKey` from Chrome 133, Firefox 130 and Safari 17. Test on the lowest Safari you intend to support before relying on it.
- The Web Cryptography specification makes `CryptoKey` objects serializable so they can be stored in IndexedDB "without ever exposing that key material to the application or the JavaScript environment".
- It fits the existing Noise code: only the two static-key DH calls change.
- The persistent device key is never a readable byte array in storage — a clear step above A1.

**Why passkeys (A2) are optional, not required.** PRF support depends on the authenticator and still has browser and security-key edge cases. Requiring it would add an unlock step and new failure modes to every startup for protection beyond the core end-to-end threat model. It stays available as a later "Require a passkey to unlock this web device" setting.

---

## 2. Push notifications on the web version

### The question

Should the web version notify the user when a session needs attention — and how, given that phones and browsers deliver notifications completely differently?

### How it works today

- **Mobile only.** `services/push.ts` calls `Notifications.getExpoPushTokenAsync()` from `expo-notifications` and registers that token with each paired streamer. The streamer sends through Expo's push service (and iOS Live Activities through APNs).
- **The streamer misreports this.** `src/server.ts:1147` builds an `ExpoPushSender` and a `WaitingInputNotifier`, so ordinary mobile "your turn" notifications are sent. But `describePushCapability()` in `src/api/routes/misc.routes.ts` still returns `notifications: false`, and its type comment says nothing sends them. That stale report should be fixed on its own, and before any web capability is added the flag should split into separate facts (Expo notifications, Web Push, Live Activities) instead of one `notifications` boolean.
- **`expo-notifications` does not support web.** Expo's current documentation lists Android and iOS for the library and for every API, including `getExpoPushTokenAsync`. Older Expo versions had web settings (`vapidPublicKey`, `serviceWorkerPath`); they are not in the current SDK.
- **Nothing on web replaces it.** The web build has no service worker and no push subscription, and `tb-streamer/src` has no web-push code (a search for `web-push`, `vapid` and `webpush` finds nothing).
- Result: the web version currently shows no notifications at all.

### How web notifications can work

There are two different mechanisms, and they are often confused.

**Browser notifications while the page is open.** The page already holds a live WebSocket to the streamer. When a session starts waiting for input, the page calls the browser's Notification API and a system notification appears — even if the tab is in the background. This is what the dev.to Socket.IO article builds. Its own conclusion applies here: it stops when the tab or browser is closed, so it is not true push.

**Web Push.** A service worker registered by the page subscribes to the browser's push service (Google's for Chrome, Apple's for Safari, Mozilla's for Firefox) using a VAPID key pair. The streamer stores that subscription and sends an encrypted push message to the push service, which wakes the service worker to show the notification — even with the tab closed. Requirements:

- HTTPS (localhost is allowed for development).
- A service worker file served from the app's origin.
- On iPhone and iPad: iOS/iPadOS 16.4 or later, and the web app must be added to the Home Screen (WebKit). No Apple Developer account is needed.
- On the streamer: VAPID keys and a Web Push sender, plus an endpoint to register and remove web subscriptions — none of which exists today.
- **The multi-streamer problem.** A Web Push subscription belongs to one service-worker registration and is bound to one `applicationServerKey` (the VAPID public key); changing it means unsubscribing and subscribing again. If every independent streamer has its own VAPID key, a single root service worker cannot cleanly hold subscriptions for any number of streamers. The options — several scoped service-worker registrations, a shared Threadbase push relay, or one push-owning streamer — each change the architecture, and a relay is a hosted service.

A hosted service such as OneSignal (`react-onesignal`) wraps the service worker, subscription and sending for you. It is a third party that receives subscriber data, so it becomes a new provider in the privacy policy — and Threadbase's positioning is that it runs no hosted service.

### Options

| Option | Notifies with the tab closed | Work | Privacy policy |
|---|---|---|---|
| **2a. None on web** | No | None | Say the web version does not send notifications. |
| **2b. Tab-open notifications** | No | Small, app only: a `services/push.web.ts` that asks for notification permission and fires on `waiting_input` events already arriving over the WebSocket. | Nothing leaves the device; mention that the browser shows notifications while the app is open. |
| **2c. Standard Web Push** | Yes (iPhone only from the Home Screen) | App: service worker, subscription, register with the streamer. Streamer: VAPID keys, subscription storage, a Web Push sender, a streamer release. | The browser vendor's push service delivers the message — describe it the way Expo and Apple are described today, and state what the payload contains. |
| **2d. OneSignal** | Yes | App SDK + streamer calls to OneSignal's API. | Adds OneSignal as a provider that receives subscriber data; conflicts with the no-hosted-service positioning. |

### Site and policy impact

The rows you marked "push works on web" (How it works step 2, Quick start operator note, Features item 0, FAQ item 2, the policy's push section) stay false until 2b or 2c ships. With 2b they can say "notifications while the web app is open"; only 2c or 2d supports "push" in the mobile sense.

### Decision (2026-09-14): 2b at launch, 2c deferred

- **Ship 2b.** The wording is "Browser notifications while Threadbase Web stays connected", never "push". A background tab can often still show them, but delivery stops once the browser suspends or closes the page or drops its WebSocket.
- **Do not promise background Web Push yet.** 2c is a separate design problem because of the multi-streamer constraint above, not a small follow-up.
- **Reject OneSignal (2d).** Standards-based Web Push already works through the browsers' own push services — including Home Screen web apps on iOS/iPadOS 16.4+ without an Apple Developer account — so a third-party processor adds nothing needed.
- **Fix the streamer's capability report** independently (implementation order, step 4).
- Not a launch blocker.

---

## 3. Connecting the web version to a streamer on your own machine or network

### The question

Your FAQ answer says a user who runs the web app locally can reach their streamer without opening ports. When does a browser allow that, and what should the FAQ and Quick start say?

### The browser rules involved

1. **Mixed content.** A page loaded over `https://` may not call `http://` or `ws://` addresses; the browser blocks it before any request leaves. Loopback (`localhost`, `127.0.0.1`) is treated as potentially trustworthy and exempt in Chrome and Firefox; Safari's behaviour needs testing. Chrome now makes one more exception — see Local Network Access below.
2. **CORS.** The streamer must allow the page's origin. `tb-streamer/src/api/middleware/cors.middleware.ts` allows `http://localhost:8081`, `http://localhost:19006` and `http://localhost:3000` whenever `browser_cors` is on, plus any origins listed in `browser_cors:` or `THREADBASE_ALLOW_BROWSER_CORS`. Streamer v1.91.3 includes the #906 fixes (the `X-Client-Id` header and the WebSocket upgrade); older streamers fail from any browser.
3. **Chrome Local Network Access.** Since Chrome 142, a *public* site that calls a local-network or loopback address triggers a permission prompt ("Look for and connect to any device on your local network"). It replaced the earlier Private Network Access preflights. A page loaded from localhost is not a public site, so it is not affected.
   - **It also relaxes mixed content.** Chrome's announcement says permission-gated local network requests "will now be exempted from mixed content checks" — but only if Chrome knows the request goes to the local network before resolving the destination (for example a literal private IP address). So on current Chrome, `https://app.threadbase.sh` → `http://192.168.x.x:8766` can work after the user grants permission, if CORS allows the origin.
   - **WebSockets are the open question.** The same announcement listed WebSocket connections as not yet covered and planned "soon". Before relying on it, test that a WebSocket from the hosted app to a private IP works after permission on the Chrome version you target.

### What works

| Web app loaded from | Streamer URL | Works? | Why |
|---|---|---|---|
| `http://localhost:8081` (`npx expo start --web`) | `http://localhost:8766` | **Yes** | Both plain http, so no mixed content; `localhost:8081` is a default CORS origin. Verified on this Mac. |
| `http://localhost:8081` | `http://192.168.x.x:8766` (LAN) | **Yes** | Same origin rules; the streamer must be reachable on the LAN. |
| `http://127.0.0.1:8081` | any | **No** (CORS) | `127.0.0.1:8081` is not in the default origin list — only the `localhost` spelling is. Add it to `browser_cors:` or use `localhost`. |
| `http://localhost:4173` (`npx serve dist`) | `http://localhost:8766` | **Only with config** | Port 4173 is not a default origin; add `http://localhost:4173` to `browser_cors:`. |
| `https://app.threadbase.sh` | `https://…` tunnel | **Yes** | Needs `https://app.threadbase.sh` in `browser_cors:`. |
| `https://app.threadbase.sh` | `http://192.168.x.x:8766` (LAN) | **Chrome only, after permission; otherwise no** | Chrome 142+ exempts permission-gated local network requests from mixed content (WebSocket coverage to be tested); Safari and Firefox block it as mixed content. `browser_cors:` must list `https://app.threadbase.sh`. With dilemma 1 solved, Noise protects the traffic even though the local transport is plain HTTP. |
| `https://app.threadbase.sh` | `http://localhost:8766` | **Untested** | Loopback is exempt from mixed content in Chrome and Firefox, but Chrome 142+ shows the local-network permission prompt, Safari may block it, and `browser_cors:` must list `https://app.threadbase.sh`. |

### What this means for users

- **Phone apps:** LAN pairing works as the site says.
- **Web app run locally:** your FAQ answer is right — a user who runs `npx expo start --web` can reach a streamer on `localhost` or the LAN with no open ports, as long as they open `localhost` (not `127.0.0.1`).
- **Hosted web app (`app.threadbase.sh`):** the tunnel (`https://`) is the path that works in every browser. A LAN `http://` address can work only in Chrome, after the user grants local-network permission.

### Options for the site copy

- **3a. One qualified FAQ answer:** "No open ports. The phone apps and a locally run web app can use your LAN; the hosted web app at app.threadbase.sh works with your streamer's tunnel URL."
- **3b. Separate web FAQ entry** covering hosted vs local web, `browser_cors:`, and the `localhost` / `127.0.0.1` trap, keeping the existing answer about the phone apps.
- **3c. Make the hosted app handle localhost:** add `https://app.threadbase.sh` to the streamer's default CORS origins and test Chrome's prompt and Safari. This could make "hosted app + local streamer on the same computer" work without a tunnel, but it widens which websites can talk to every streamer with browser CORS on, so it needs its own security review.

### Decision (2026-09-14): 3b, revised for Local Network Access

The product model:

- **Hosted web + HTTPS tunnel** — the recommended, cross-browser path.
- **Locally served web + LAN or localhost** — the no-tunnel path.
- **Hosted web + direct LAN** — an experimental, permission-gated Chromium path the user enables explicitly (adding `https://app.threadbase.sh` to their own `browser_cors:`).

Do **not** add `https://app.threadbase.sh` to the streamer's default CORS origins (3c) just to make the third path work: it widens which websites every browser-CORS streamer answers, and Chrome's path is not predictable across browsers. The FAQ describes the tunnel as recommended rather than technically mandatory, which stays true as browsers change. Documentation and onboarding requirement, not a code blocker.

---

## Sources checked

- MDN, `SubtleCrypto.deriveBits()` — X25519 supported for key derivation.
- MDN, WebAuthn extensions — the `prf` extension, including deriving symmetric keys for end-to-end encryption.
- Chrome for Developers, "Local Network Access" — permission prompt for public-to-local requests, full launch in Chrome 142, replaces Private Network Access; permission-gated local network requests are exempted from mixed content checks when Chrome knows the destination is local before resolving it; WebSockets listed as not yet covered, planned "soon".
- MDN browser-compat-data, `SubtleCrypto` — X25519 for `generateKey`, `deriveBits` and `importKey` from Chrome 133, Firefox 130, Safari 17.
- W3C Web Cryptography specification — `CryptoKey` objects are serializable and can be stored in IndexedDB without exposing key material to script.
- WebKit, "Web Push for Web Apps on iOS and iPadOS" — iOS/iPadOS 16.4+, Home Screen web apps only, no Apple Developer account.
- Expo documentation, `expo-notifications` — supported platforms Android and iOS.
- dev.to, "Push notifications with Socket.IO in Expo React Native (web and mobile)" — browser Notification API over a live socket; does not work when the app is closed.
- `react-onesignal` README — hosted web push via OneSignal's service worker.
- React Native, platform-specific code — `.web` file resolution and `Platform.OS`.
- RapidNative, React Native push notifications — mobile only, no web guidance.
- The Stack Overflow question on Expo web push could not be fetched (automated access blocked), so it is not used here.
- Code (checked on `origin/main`, 2026-09-14): tb-mobile `services/e2ee/*` (static-key `dh()` calls at `noise.ts:304` and `:330`), `services/secure-store.web.ts`, `services/pair-exchange.ts:263`, `services/ws-client.ts`, `services/push.ts`; tb-streamer `src/api/middleware/cors.middleware.ts`, `src/e2ee/context.ts` (ticket header rationale, ticket format at line 582), `src/server.ts:1147` (`ExpoPushSender`, `WaitingInputNotifier`), `src/api/routes/misc.routes.ts` (`describePushCapability`); tb-streamer release v1.91.3 contains PR #906.
- Not verified: the claim that Chrome 147 extended Local Network Access to WebSockets, and that Safari added WebCrypto X25519 in 18.4 (MDN lists 17). Both are marked as things to test.
