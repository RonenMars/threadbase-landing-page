import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ru", "he", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const rtlLocales = ["he", "ar"] as const;

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
