import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import {
  getTextDirection,
  routing,
  type Locale,
} from "@/i18n/routing";
import { NavMenu } from "@/components/NavMenu";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams(): Array<{ locale: Locale }> {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: "metadata.site",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Must precede any other next-intl server API call: anything that reads
  // request state first (getMessages) opts the whole route into dynamic
  // rendering, silently defeating generateStaticParams.
  setRequestLocale(locale);

  const translations = await getMessages();

  return (
    <html
      className="dark font-sans"
      dir={getTextDirection(locale)}
      lang={locale}
    >
      <body className="bg-bg-primary font-sans text-primary antialiased">
        <NextIntlClientProvider locale={locale} messages={translations}>
          <NavMenu />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
