"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, locales, type Locale } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

function rememberLocale(locale: Locale): void {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({
  variant = "inline",
}: {
  variant?: "inline" | "compact";
}): React.JSX.Element {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("languageSwitcher");
  const selectableLocales = locales.filter(
    (targetLocale) => targetLocale !== locale,
  );

  if (variant === "compact") {
    return (
      <CompactLanguageSwitcher
        locale={locale}
        selectableLocales={selectableLocales}
        pathname={pathname}
        ariaLabel={t("ariaLabel")}
        getLocaleLabel={(targetLocale) => t(`localeLabels.${targetLocale}`)}
      />
    );
  }

  return (
    <nav aria-label={t("ariaLabel")} className="flex flex-wrap gap-1.5">
      {locales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={pathname}
          locale={targetLocale}
          aria-current={targetLocale === locale ? "true" : undefined}
          aria-label={t(`localeLabels.${targetLocale}`)}
          onClick={() => rememberLocale(targetLocale)}
          className={cn(
            "inline-flex h-7 min-w-9 items-center justify-center rounded-full border border-border bg-bg-primary/50 px-2 text-[11px] font-semibold uppercase text-muted transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            targetLocale === locale &&
              "border-accent-secondary text-accent-secondary",
          )}
        >
          {targetLocale.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}

function CompactLanguageSwitcher({
  locale,
  selectableLocales,
  pathname,
  ariaLabel,
  getLocaleLabel,
}: {
  locale: Locale;
  selectableLocales: Locale[];
  pathname: string;
  ariaLabel: string;
  getLocaleLabel: (locale: Locale) => string;
}): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent): void => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-bg-secondary/85 px-3 text-xs font-semibold uppercase text-secondary shadow-lg backdrop-blur transition-[border-color,color,box-shadow,transform] duration-300 ease-out hover:border-accent hover:text-primary hover:shadow-[0_8px_24px_-8px_rgba(99,179,255,0.55)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
      >
        <span aria-hidden="true">🌐</span>
        <span>{locale.toUpperCase()}</span>
        <span aria-hidden="true" className="text-[10px] leading-none">
          ▾
        </span>
      </button>

      {open ? (
        <nav
          aria-label={ariaLabel}
          className="absolute right-0 mt-2 flex min-w-28 flex-col gap-1 rounded-lg border border-border bg-bg-secondary p-1 shadow-2xl"
        >
          {selectableLocales.map((targetLocale) => (
            <Link
              key={targetLocale}
              href={pathname}
              locale={targetLocale}
              aria-current={targetLocale === locale ? "true" : undefined}
              aria-label={getLocaleLabel(targetLocale)}
              onClick={() => {
                rememberLocale(targetLocale);
                setOpen(false);
              }}
              className={cn(
                "flex h-8 items-center justify-between rounded-md px-2 text-xs font-semibold uppercase text-muted transition-colors hover:bg-bg-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                targetLocale === locale && "text-accent-secondary",
              )}
            >
              <span>{targetLocale.toUpperCase()}</span>
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
