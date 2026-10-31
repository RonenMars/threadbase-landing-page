import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import { source } from "@/lib/source";
import { fontVariables } from "@/lib/fonts";

type DocsLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Docs are English-only, so they live outside `app/[locale]` and bypass the
 * next-intl proxy (see `proxy.ts`). Like `app/not-found.tsx`, this route has
 * no locale layout above it and supplies its own <html>/<body>.
 * Theme switching is off because the site is always dark.
 */
export default function Layout({
  children,
}: DocsLayoutProps): React.JSX.Element {
  return (
    <html className={`dark font-sans ${fontVariables}`} dir="ltr" lang="en">
      <body className="flex min-h-screen flex-col bg-bg-primary font-sans text-primary antialiased">
        <RootProvider theme={{ enabled: false }}>
          <DocsLayout
            nav={{ title: "Threadbase Docs", url: "/docs" }}
            links={[{ text: "threadbase.sh", url: "/" }]}
            themeSwitch={{ enabled: false }}
            tree={source.getPageTree()}
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
