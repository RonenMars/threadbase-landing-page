import { defineConfig, globalIgnores } from "eslint/config";
import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";
import tailwindCanonicalClasses from "eslint-plugin-tailwind-canonical-classes";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tailwindCanonicalClasses.configs["flat/recommended"],
  globalIgnores([
    ".next/**",
    ".claude/**",
    "node_modules/**",
    ".vercel/**",
    "dist/**",
    "build/**",
    "out/**",
    "next-env.d.ts",
    "scaffold/**",
  ]),
  {
    rules: {
      "tailwind-canonical-classes/tailwind-canonical-classes": [
        "warn",
        {
          cssPath: "./app/globals.css",
        },
      ],
    },
  },
]);
