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
      // eslint-plugin-react@7.37.5 (bundled in eslint-config-next) uses
      // context.getFilename() which was removed in ESLint 10. Disable all
      // react/* rules until eslint-config-next ships a compatible version.
      "react/display-name": "off",
      "react/jsx-key": "off",
      "react/jsx-no-comment-textnodes": "off",
      "react/jsx-no-duplicate-props": "off",
      "react/jsx-no-target-blank": "off",
      "react/jsx-no-undef": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "off",
      "react/no-children-prop": "off",
      "react/no-danger-with-children": "off",
      "react/no-deprecated": "off",
      "react/no-direct-mutation-state": "off",
      "react/no-find-dom-node": "off",
      "react/no-is-mounted": "off",
      "react/no-render-return-value": "off",
      "react/no-string-refs": "off",
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": "off",
      "react/no-unsafe": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-render-return": "off",
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
