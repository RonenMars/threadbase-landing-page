import "./globals.css";
import { defaultLocale, getTextDirection } from "@/i18n/routing";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Root layout. Only ever renders for requests that fall outside a locale
 * segment — in practice, `app/not-found.tsx`. Locale routes supply their own
 * <html> via `app/[locale]/layout.tsx`, so this must stay minimal and must not
 * depend on request state or a locale context.
 */
export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <html
      className="dark font-sans"
      dir={getTextDirection(defaultLocale)}
      lang={defaultLocale}
    >
      <body className="bg-bg-primary font-sans text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
