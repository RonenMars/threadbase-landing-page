/**
 * Locale list with no imports, so it can be loaded from `next.config.ts`.
 *
 * `i18n/routing.ts` calls `createNavigation()` at module scope, which pulls in
 * `next/navigation` and cannot be loaded outside a React/Next runtime — the
 * build fails to parse the config. Anything the config needs lives here.
 */
export const locales = ["en", "ru", "he", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["he", "ar"] as const;
