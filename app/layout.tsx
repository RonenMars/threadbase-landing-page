import "./globals.css";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Root layout. Next.js renders this for every route, including locale
 * routes, so it must not render its own <html>/<body> — that would nest
 * inside the one `app/[locale]/layout.tsx` provides and break hydration.
 * `app/not-found.tsx` is the only route that falls outside a locale segment,
 * so it supplies its own <html>/<body>.
 */
export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return children as React.JSX.Element;
}
