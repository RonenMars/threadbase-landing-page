# Mobile app locale suggestions (tb-mobile)

Observations gathered while revising the **landing-site** translations, about the **mobile app** locales at `~/dev/ai-tools/tb-mobile/locales/` (mirrors `~/Desktop/dev/ai-tools/tb-mobile/locales/`).

These are **suggestions only** — no app files were changed. Fix in the app repo if you agree.

## Cross-file inconsistencies

| # | Lang | Issue | Where | Suggestion |
|---|------|-------|-------|------------|
| 1 | ru | `session` is **сессия** in most files but **сеанс** in `terminal.json` (cancel/stop dialogs). | `terminal.json` vs the rest | Standardize on **сессия** (dominant form). |
| 2 | he | Standalone agent name mixes Latin **Claude** and transliterated **קלוד** (e.g. stop-dialog `קלוד יופסק`). | stop/interrupt dialogs | Pick one; Latin **Claude** is the more common choice across files. |
| 3 | ar | `pair` noun appears as both **إقران** (dominant) and **اقتران** (once, settings camera desc). | `settings.json` | Standardize on **إقران**. |

## Notes (not necessarily bugs)

- he `pair` uses **זווג/זיווג** while `connect` uses **חבר/התחבר**. The landing site was asked to use **חיבור/לחבר** for "pair" — if the app wants site/app parity, consider whether pairing should read as חיבור in the app too, or keep the זיווג/חיבור distinction deliberately.

_Appended to as more items surface during the landing-site work._
