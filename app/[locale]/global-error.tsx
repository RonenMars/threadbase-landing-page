"use client";

import Link from "next/link";
import arMessages from "@/messages/ar.json";
import enMessages from "@/messages/en.json";
import heMessages from "@/messages/he.json";
import ruMessages from "@/messages/ru.json";
import {
  getTextDirection,
  isLocale,
  type Locale,
} from "@/i18n/routing";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const messages = {
  en: enMessages,
  ru: ruMessages,
  he: heMessages,
  ar: arMessages,
} as const;

function getCurrentLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const locale = document.documentElement.lang;
  return isLocale(locale) ? locale : "en";
}

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps): React.JSX.Element {
  const locale = getCurrentLocale();
  const t = messages[locale].pages.globalError;
  const homeHref = locale === "en" ? "/" : `/${locale}`;

  return (
    <html className="dark" dir={getTextDirection(locale)} lang={locale}>
      <body className="bg-bg-primary font-sans text-primary antialiased">
        <div className="app-shell min-h-screen">
          <main className="container-shell flex min-h-screen items-center justify-center px-6 py-24 sm:px-8 lg:px-10">
            <section className="screenshot-shell relative w-full max-w-3xl overflow-hidden rounded-4xl border border-border-strong bg-[linear-gradient(180deg,rgba(8,12,20,0.96),rgba(11,18,31,0.92))] p-8 text-center shadow-[0_28px_80px_rgba(3,7,14,0.56)] sm:p-12">
              <div className="app-grid absolute inset-0 opacity-20" />
              <div className="relative space-y-6">
                <p className="text-xs uppercase tracking-[0.26em] text-accent-secondary">
                  {t.eyebrow}
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tighter text-primary sm:text-5xl">
                  {t.heading}
                </h1>
                <p className="mx-auto max-w-xl leading-7 text-secondary">
                  {t.body}
                </p>
                <div className="rounded-2xl border border-white/6 bg-black/25 px-4 py-3 text-start font-mono text-secondary">
                  {error.digest ?? error.message}
                </div>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    className="inline-flex min-w-44 items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 font-medium tracking-tight text-slate-950 transition-all duration-300 ease-out hover:border-accent-strong hover:bg-accent-strong"
                    onClick={reset}
                    type="button"
                  >
                    {t.retry}
                  </button>
                  <Link
                    className="inline-flex min-w-44 items-center justify-center rounded-full border border-border-strong bg-white/2 px-6 py-3 font-medium tracking-tight text-primary transition-all duration-300 ease-out hover:border-accent hover:bg-white/6"
                    href={homeHref}
                  >
                    {t.homeLink}
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
