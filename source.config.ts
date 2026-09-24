import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { threadbaseCodeTheme } from "./lib/shiki-theme";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    // The site is always dark, but Fumadocs emits both theme slots.
    rehypeCodeOptions: {
      themes: { light: threadbaseCodeTheme, dark: threadbaseCodeTheme },
    },
  },
});
