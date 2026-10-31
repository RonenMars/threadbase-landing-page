import { Inter, JetBrains_Mono } from "next/font/google";

// Self-hosted at build time by next/font, so visitors never request fonts from Google.
// Inter has no Hebrew or Arabic glyphs; those locales fall through to the system fonts in `--font-sans`.
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${jetbrainsMono.variable}`;
