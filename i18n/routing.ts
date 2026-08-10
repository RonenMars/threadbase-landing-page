import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export { defaultLocale, locales, rtlLocales } from "./locales";
export type { Locale } from "./locales";

import { defaultLocale, locales, rtlLocales } from "./locales";
import type { Locale } from "./locales";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: true,
  localeCookie: {
    name: "NEXT_LOCALE",
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getTextDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale as (typeof rtlLocales)[number])
    ? "rtl"
    : "ltr";
}
