"use client";

import { NextIntlClientProvider } from "next-intl";
import { NotFoundContent } from "@/components/NotFoundContent";
import { defaultLocale } from "@/i18n/routing";
import messages from "@/messages/en.json";

/**
 * Root 404 — serves requests that never reach a locale segment, and so have no
 * request locale to detect. Renders in `defaultLocale` with statically imported
 * messages rather than calling `getMessages()`, which needs a locale context
 * this route does not have.
 *
 * Must stay a Client Component: `NextIntlClientProvider` reads request state
 * when rendered on the server, which would opt this route out of static
 * rendering even though the locale is passed explicitly.
 */
export default function RootNotFound(): React.JSX.Element {
  return (
    <NextIntlClientProvider locale={defaultLocale} messages={messages}>
      <NotFoundContent />
    </NextIntlClientProvider>
  );
}
