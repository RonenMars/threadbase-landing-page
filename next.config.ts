import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";
import createNextIntlPlugin from "next-intl/plugin";

import { locales } from "./i18n/locales";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // `/privacy` is the URL the mobile app shipped and the one declared on the
  // App Store Connect and Play Console listings. The page lives at
  // `/privacy-policy`, so those references 404. Store fields and already-shipped
  // builds cannot be corrected retroactively, so the old path has to keep working.
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: `/:locale(${locales.join("|")})/privacy`,
        destination: "/:locale/privacy-policy",
        permanent: true,
      },
      // Docs are English-only and unprefixed; see app/docs/layout.tsx.
      {
        source: `/:locale(${locales.join("|")})/docs/:path*`,
        destination: "/docs/:path*",
        permanent: false,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX();

export default withMDX(withNextIntl(nextConfig));
