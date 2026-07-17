"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * The 404 body, shared by the locale-scoped `app/[locale]/not-found.tsx` and
 * the root `app/not-found.tsx`. Each caller supplies the locale context: the
 * locale route via its layout, the root route via `defaultLocale` messages.
 */
export function NotFoundContent(): React.JSX.Element {
  const t = useTranslations("pages.notFound");

  return (
    <div className="app-shell min-h-screen">
      <main className="container-shell flex min-h-screen items-center justify-center px-6 py-24 sm:px-8 lg:px-10">
        <section className="screenshot-shell relative w-full max-w-3xl overflow-hidden rounded-4xl border border-border-strong bg-[linear-gradient(180deg,rgba(8,12,20,0.96),rgba(11,18,31,0.92))] p-8 text-center shadow-[0_28px_80px_rgba(3,7,14,0.56)] sm:p-12">
          <div className="app-grid absolute inset-0 opacity-20" />
          <div className="relative space-y-6">
            <p className="text-xs uppercase tracking-[0.26em] text-accent-strong">
              {t("eyebrow")}
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tighter text-primary sm:text-5xl">
              {t("heading")}
            </h1>
            <p className="mx-auto max-w-xl leading-7 text-secondary">
              {t("body")}
            </p>
            <div className="flex justify-center">
              <Link
                className="inline-flex min-w-44 items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 font-medium tracking-tight text-slate-950 transition-all duration-300 ease-out hover:border-accent-strong hover:bg-accent-strong"
                href="/"
              >
                {t("homeLink")}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
