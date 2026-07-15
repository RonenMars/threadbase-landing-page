import * as React from "react";
import { vi } from "vitest";

export const locales = ["en", "ru", "he", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const rtlLocales = ["he", "ar"] as const;
export const routing = {
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: true,
} as const;

type LinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: string | { pathname: string };
  locale?: Locale;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ href, locale, ...props }, ref) {
    void locale;
    const resolvedHref = typeof href === "string" ? href : href.pathname;

    return <a ref={ref} href={resolvedHref} {...props} />;
  },
);

export function usePathname(): string {
  return "/";
}

export function useRouter(): {
  back: () => void;
  forward: () => void;
  prefetch: () => void;
  push: () => void;
  refresh: () => void;
  replace: () => void;
} {
  return {
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  };
}

export function redirect(url: string): never {
  throw new Error(`NEXT_REDIRECT:${url}`);
}

export function getPathname({
  href,
}: {
  href: string | { pathname: string };
}): string {
  return typeof href === "string" ? href : href.pathname;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getTextDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale as (typeof rtlLocales)[number])
    ? "rtl"
    : "ltr";
}
