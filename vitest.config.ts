import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@\/i18n\/routing$/,
        replacement: fileURLToPath(
          new URL("./tests/mocks/i18n-routing.tsx", import.meta.url),
        ),
      },
      {
        find: /^next\/navigation$/,
        replacement: fileURLToPath(
          new URL("./tests/mocks/next-navigation.ts", import.meta.url),
        ),
      },
      {
        find: /^next-intl\/server$/,
        replacement: fileURLToPath(
          new URL("./tests/mocks/next-intl-server.ts", import.meta.url),
        ),
      },
    ],
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    exclude: [
      "**/node_modules/**",
      "**/.next/**",
      "**/.claude/**",
      "**/.worktrees/**",
      "tests/visual/**", // owned by Playwright (npm run test:visual)
    ],
  },
});
