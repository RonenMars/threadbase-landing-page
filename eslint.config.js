import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import next from "@next/eslint-plugin-next";
import tailwindCanonicalClasses from "eslint-plugin-tailwind-canonical-classes";

export default defineConfig([
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
      "@next/next": next,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
  ...tailwindCanonicalClasses.configs["flat/recommended"],
  globalIgnores([
    ".next/**",
    ".claude/**",
    ".remember/**",
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
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
    },
  },
]);
