import { defineConfig, globalIgnores } from "eslint/config";
import babelParser from "@babel/eslint-parser";
import next from "@next/eslint-plugin-next";
import tailwindCanonicalClasses from "eslint-plugin-tailwind-canonical-classes";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          parserOpts: { plugins: ["typescript", "jsx"] },
        },
      },
    },
    plugins: {
      "@next/next": next,
    },
    rules: {
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
    },
  },
]);
