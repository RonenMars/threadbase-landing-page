# Landing-site translation revision report (2026-07-14)

Branch: `feat/i18n-ru-he-ar` · Source of truth: `messages/en.json`
Terminology reference: `~/dev/ai-tools/tb-mobile/locales/`

## Summary

Each locale file has **274 leaf strings**. Rough count of values changed:

| Locale | Values changed (approx.) | Dominant categories |
|--------|--------------------------|---------------------|
| **ru** | ~40 | inline-English cleanup, UI-literal translation, term alignment, минор grammar |
| **he** | ~110 | gender-neutral conversion (every imperative + every 2nd-person sentence) + all ru categories + term overrides |
| **ar** | ~90 | session→سيشن & prompt→برومبت term swap (~30 strings), gender-neutral conversion, inline-English cleanup, UI-literals |
| **en** | 5 | approved light copy fixes |

Hebrew has the most edits because gender-neutral phrasing touched nearly every action string; Arabic's high count is driven by the session/prompt terminology swap.

## Validation results

- ✅ All 4 files are valid JSON.
- ✅ Identical key sets across all locales (274 keys each).
- ✅ ICU placeholder parity: **0 mismatches** (`{label}`, `{number}` preserved everywhere).
- ✅ Full unit suite: **62/62 pass across 16 files** (`content.test.ts` 7/7 included).
- ✅ Production build succeeds; TypeScript passes; all 27 static pages (4 locales × routes) generate.
- n/a ESLint does not lint JSON message files (ignored by config).

### i18n page-test wiring fix (follow-up)

The 4 failures noted earlier (`page.test.tsx` ×3, `not-found.test.tsx` ×1) were fixed.

**Root cause:** `app/[locale]/page.tsx` (Home) and `app/[locale]/not-found.tsx` were `async` server components calling server-side `getTranslations`/`await params`. React Testing Library cannot render an async function component synchronously — it receives a Promise, so the DOM was empty and every assertion failed. The sibling `app/[locale]/android-beta/page.tsx` already demonstrated the working pattern: a **synchronous** page wrapper delegating to `"use client"` components that self-serve translations via `useTranslations`.

**Fix:** rewrote both as synchronous wrappers (matching android-beta). This is also architecturally cleaner — the section components already default their props from `useTranslations`, and `app/[locale]/layout.tsx` already owns locale context (`setRequestLocale` + `NextIntlClientProvider` with per-locale messages), so the pages' own async `getTranslations` calls were redundant. Per-locale SSR is unaffected (verified: build generates all locale pages). No test files were changed.

## Policy applied (all locales)

- **Register:** gender-neutral in all three. RU keeps formal **вы** (already neutral). HE/AR: **plural** imperative for buttons/short instructions, body-copy **rephrased impersonal** to avoid gendered "you".
- **Loose English prose** → translated. **Developer jargon** (backend, endpoint, pipeline, PTY, JSONL, SDK, SecureStore, Keychain/Keystore, React Query) → kept Latin.
- **Product names** always Latin: Threadbase, Claude Code, Codex, TestFlight, Google Play, tb-streamer, VS Code, IntelliJ, Electron, iOS, macOS, Android, Homebrew, Expo, NaCl.
- **UI-literal quotes** (store/app buttons) translated fully, English dropped, validated against `tb-mobile` where the app has an equivalent.
- **en.json:** 5 approved light copy fixes applied (see end).

---

## English source (en.json) — 5 approved fixes

| Key | Before → After |
|-----|----------------|
| `home.problem.items[1].description` | `"should I commit?"` (embedded EN quote) → *"asks whether to commit."* |
| `home.features.items[5].description` | "resumes paused **sends**" → "resumes paused **messages**" |
| `home.roadmap.milestones[7].detail` | "Async-teammate workflow. Compose, schedule, walk away." → "An async-teammate workflow: compose it, schedule it, walk away." |
| `pages.androidBeta.intro` | "gates production behind 12 testers × 14 days" → "requires 12 testers over 14 days … before an app can go live." |
| `home.honestCons.items[2].description` | "still **catching up**" → "still **being added**" |

---

## Russian (ru.json)

**Register:** вы, unchanged (already correct and gender-neutral). Standardized **сессия** (never сеанс). Kept transliterations matching the app: **промпт, агент, терминал**.

**Main fix categories:**
1. **Removed inline English from prose** — the file had large amounts of untranslated English mid-sentence.
2. **UI-literal quotes translated** (store/app buttons) and English dropped.
3. **Terminology alignment** with the app (сопряжение/сопрячь, рукопожатие, push-уведомления).
4. **Minor grammar/naturalness** (Wi-Fi сеть → сеть Wi-Fi; онлайн → в сети; с мобильного → с телефона).

**Representative before → after:**

| Context | Before | After |
|---------|--------|-------|
| site description | Threadbase **зеркалирует** сессии | Threadbase **транслирует** сессии |
| problem (commit) | Claude … спрашивает: **"should I commit?"** | Claude … спрашивает, **делать ли коммит** |
| remote control | отправляйте **follow-up** или останавливайте **runaway-сессию** | отправляйте **уточнения** или останавливайте **вышедшую из-под контроля сессию** |
| resilient | возобновит **остановленные отправки** | возобновит **приостановленные сообщения** |
| no relay | нет **relay-сервера** | нет **промежуточного сервера** |
| prompt cards | вопросы Claude и **permission gates** | вопросы Claude и **запросы разрешений** |
| sync milestone | **Sync mode + multi-select prompts** / **Message bubbles** из JSONL … **single-choice** форм | **Режим синхронизации + промпты с множественным выбором** / **Пузыри сообщений** на основе JSONL … форм **с одним вариантом** |
| multi-agent | Надежная **multi-agent** оркестрация … **worker → reviewer → sign-off agent** … **retry** | Надежная оркестрация **нескольких агентов** … **«исполнитель → рецензент → утверждающий агент»** … **перезапустить** |
| quickStart | Нажмите **"Pair"** | Нажмите **«Сопрячь»** |
| betas opt-in | затем **opt in** через Play | затем **подтвердить участие** через Play |
| tester button | нажмите **"Become a tester"** | нажмите **«Стать тестировщиком»** |
| privacy | для **self-hosted streamers** … **crash-reporting** или **telemetry service** | для **самостоятельно размещаемых streamer'ов** … **сбор отчётов о сбоях** или **телеметрию** |
| privacy | **Handshake** сопряжения | **Рукопожатие** сопряжения (matches app «РУКОПОЖАТИЕ ЗАВЕРШЕНО») |
| privacy | **push relay** Expo | **push-ретранслятор** Expo |
| control | Удалите сервер в **Settings** … **push token** | Удалите сервер в **«Настройках»** … **push-токен** |
| dictation | **speech-to-text** выполняется на устройстве | **преобразование речи в текст** выполняется на устройстве |

**Kept Latin (dev jargon / product):** backend, endpoint, pipeline, PTY, JSONL, SDK, Temporal, streamer/tb-streamer, SecureStore, Keychain, Keystore, React Query, Expo, GitHub Releases.

---

## Hebrew (he.json)

**Register — gender-neutral (largest change in this file):**
- **Buttons / CTAs / short instructions → plural imperative** (הצטרפו, סרקו, חברו, הריצו, קבלו, הקישו).
- **a11y labels & short UI labels → verbal noun** (פתיחת תפריט, החלפת שפה, דיווח על באג, ניסיון חוזר).
- **Body copy → impersonal**, avoiding gendered "you" (אתה): rephrased to impersonal/passive (e.g. "אתה לא ליד הלפטופ" → "לא תמיד יושבים ליד הלפטופ"; "כשאתה מתיישב" → "כשחוזרים לשבת"; "שאתה סורק" → "שנסרק"; "אתה ברשימה" → "ההרשמה הושלמה"). Note: `שלך` (possessive "your") is spelled identically for both genders, so it is genuinely gender-neutral and was kept where natural.

**Your Hebrew term overrides applied throughout:**
- push notification → **נוטיפיקציות** (was התראות דחיפה / התראות Push)
- pair / pairing → **חיבור / לחבר** (was צימוד / זיווג / צמד)
- tool call → **הפעלת כלי / הפעלות כלים** (was קריאות כלי / קריאות לכלים)
- speech-to-text → **דיבור לטקסט**

**Other fix categories:** removed inline English from prose; translated UI-literal quotes (validated against the store's real Hebrew wording); kept transliterations matching the app (סשן, פרומפט, טרמינל, סוכן); fixed a literal calque (משקף "mirrors" → משדר "streams").

**Representative before → after:**

| Context | Before | After |
|---------|--------|-------|
| site desc | Threadbase **משקף** … **אשר קריאות לכלים** | Threadbase **משדר** … **אשרו הפעלות כלים** |
| problem | **אתה לא ליד הלפטופ** | **לא תמיד יושבים ליד הלפטופ** |
| features | **התראות Push** / **קבל התראה** … **תפסיק לרענן** | **נוטיפיקציות Push** / **קבלו התראה** … **אין צורך לרענן** |
| features | **צימוד למספר שרתים** / **חבר טלפון** | **חיבור למספר שרתים** / **חברו טלפון** |
| honestCons | אין שרת **relay** … **Resume** של Codex … **משלימים פערים** | אין שרת **מתווך** … **חידוש סשן** ב-Codex … **בהשלמה** |
| roadmap | **Sync mode + multi-select prompts** / **single-choice** | **מצב סנכרון + פרומפטים לבחירה מרובה** / **בחירה יחידה** |
| roadmap | **multi-agent** … **worker → reviewer → sign-off agent** … **retry** | **מספר סוכנים** … **"מבצע → סוקר → סוכן מאשר"** … **הרצה חוזרת** |
| quickStart | הקש **"Pair"** | הקישו **"חיבור"** |
| betas | הקש **"Install"** | הקישו **"התקנה"** |
| androidBeta | **"Become a tester"** → **"Download it on Google Play"** | **"רוצה להיות בודק/ת"** ← **"הורדה מ-Google Play"** (Play's real Hebrew wording; RTL arrow direction) |
| androidBeta | **"App not available"** | **"האפליקציה אינה זמינה"** |
| privacy | **Handshake** של צימוד … **crash-reporting** … **push relay** | **לחיצת יד** של חיבור … **איסוף דיווחי קריסות** … **ממסר ה-push** |
| privacy | הסר שרת ב-**Settings** | הסירו שרת ב-**"הגדרות"** |
| waitlist | **אתה ברשימה ✓** | **ההרשמה הושלמה ✓** |

**RTL note:** all sequential "then" arrows (tester-flow, quickStart Pair→scan, the multi-agent pipeline stages) were flipped from `→` to `←` so they read in the correct RTL direction — consistently across the file. `"Join group"` kept in English — that Google Groups button is English-only in its UI (unlike Play Store buttons, which localize).

**Kept Latin (dev jargon / product):** backend, endpoint, Pipeline, Temporal, PTY, JSONL, SDK, UI, API, URL, QR, streamer/tb-streamer, SecureStore, Keychain, Keystore, React Query, Expo, NaCl, GitHub Releases, Push (in "נוטיפיקציות Push").

---

## Arabic (ar.json)

Already the strongest file (clean MSA). Two structural changes plus cleanup.

**Register — gender-neutral (MSA kept):**
- **Buttons / CTAs / short instructions → plural imperative** (انضمّوا، امسحوا، ثبّتوا، شغّلوا، اقرنوا، احصلوا).
- **Body copy → impersonal**, avoiding gendered "you" (أنت / masculine imperative): rephrased to impersonal/passive (e.g. "وأنت في غرفة أخرى" → "والحاسوب في غرفة أخرى"; "ثم تختبر" → "ويبدأ اختبار"; "الذي تمسحه" → "الذي يُمسح"; "أنت في القائمة" → "تم تسجيلك في القائمة"). Note: the possessive ـك (هاتفك، جهازك) is spelled identically for both genders, so it is genuinely gender-neutral and was kept.

**Terminology aligned to the app (the two big drifts fixed):**
- **session → سيشن / سيشنات** (was جلسة / جلسات — 27 occurrences converted, with correct masculine agreement). Matches the app's transliteration.
- **prompt → برومبت / برومبتات** (was مطالبة / مطالبات). Matches the app.
- Kept the app's other choices: **الطرفية** (terminal), **الإشعارات الفورية** (push notification), **إقران** (pair), **وكيل** (agent), **استدعاءات الأدوات** (tool call).

**Other fix categories:** removed inline English from prose; translated UI-literal quotes (validated against Play/Apple Arabic wording); fixed a literal calque (يعكس "mirrors" → يبث "streams").

**Representative before → after:**

| Context | Before | After |
|---------|--------|-------|
| site desc | **يعكس** … **جلسات** … **وافق** | **يبث** … **سيشنات** … **وافقوا** |
| problem | ينتظر موافقتك — **وأنت في غرفة أخرى** … **“should I commit?”** | ينتظر الموافقة — **والحاسوب في غرفة أخرى** … **عمّا إذا كان ينبغي عمل كوميت** |
| features | **إشعارات Push** / **احصل على تنبيه** … **توقف عن تحديث** | **الإشعارات الفورية** / **يصلكم تنبيه** … **لا حاجة إلى تحديث** |
| features | **بطاقات مطالبة** / **أجب ببطاقة** | **بطاقات برومبت** / **يمكن الرد ببطاقة** |
| honestCons | خادم **relay** … **استئناف** … **تلحق بالركب** | خادم **وسيط** … **استئناف السيشن** … **قيد الإضافة** |
| roadmap | **multi-agent** … **worker → reviewer → sign-off agent** … **retry** | **عدة وكلاء** … **"منفِّذ ← مراجِع ← وكيل معتمِد"** … **إعادة المحاولة** |
| roadmap | **Sync mode + multi-select prompts** … **single-choice** | **وضع المزامنة + برومبتات متعددة الاختيار** … **الاختيار الواحد** |
| quickStart | اضغط **"Pair"** | اضغطوا **"اقتران"** |
| betas | اضغط **"Install"** | اضغطوا **"تثبيت"** |
| androidBeta | **"Become a tester"** → **"Download it on Google Play"** | **"أريد أن أصبح مختبِرًا"** ← **"التنزيل من Google Play"** (RTL arrow) |
| androidBeta | **“App not available”** … **“(unreviewed)”** | **"التطبيق غير متوفر"** … **"(غير مراجَع)"** |
| androidBeta | يمنع **production** قبل 12 مختبرًا **×** 14 يومًا | وجود 12 مختبرًا **على مدى** 14 يومًا قبل أن يصبح التطبيق **منشورًا** |
| privacy | **crash-reporting** … **telemetry** … **relay** الإشعارات | **جمع تقارير الأعطال** … **قياس عن بُعد** … **مُرحِّل** الإشعارات |
| privacy | أزل خادمًا من **Settings** | أزيلوا خادمًا من **"الإعدادات"** |
| waitlist | **أنت في القائمة ✓** | **تم تسجيلك في القائمة ✓** |

**RTL note:** the "then" arrow in tester-flow / Settings-path strings flipped from `→` to `←` for correct RTL reading. `"Join group"` kept in English (English-only Google Groups button).

**Kept Latin (dev jargon / product):** backend, endpoint, Pipeline, Temporal, PTY, JSONL, SDK, UI, API, URL, QR, streamer/tb-streamer, SecureStore, Keychain, Keystore, React Query, Expo, NaCl, GitHub Releases, Push (in title only where paired with الإشعارات).
