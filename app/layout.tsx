import type { Metadata } from "next";
import { SITE_METADATA } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html className="dark" lang="en">
      <body className="bg-bg-primary font-sans text-primary antialiased">{children}</body>
    </html>
  );
}
