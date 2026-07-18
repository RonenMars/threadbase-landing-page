"use client";

import { NextIntlClientProvider } from "next-intl";
import { NotFoundContent } from "@/components/NotFoundContent";
import { defaultLocale, getTextDirection } from "@/i18n/routing";
import translations from "@/locales/en.json";

/**
 * Root 404 — serves requests that never reach a locale segment, and so have no
 * request locale to detect. Renders in `defaultLocale` with statically imported
 * translations rather than calling `getTranslations()`, which needs a locale context
 * this route does not have.
 *
 * Must stay a Client Component: `NextIntlClientProvider` reads request state
 * when rendered on the server, which would opt this route out of static
 * rendering even though the locale is passed explicitly.
 *
 * Supplies its own <html>/<body>: it's the only route rendered under the root
 * layout without a locale segment, and the root layout no longer provides one
 * (that would nest inside `app/[locale]/layout.tsx`'s <html> on locale routes).
 */
export default function RootNotFound(): React.JSX.Element {
  return (
    <html
      className="dark font-sans"
      dir={getTextDirection(defaultLocale)}
      lang={defaultLocale}
    >
      <body className="bg-bg-primary font-sans text-primary antialiased">
        <NextIntlClientProvider
          locale={defaultLocale}
          messages={translations}
          timeZone="UTC"
        >
          <NotFoundContent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
