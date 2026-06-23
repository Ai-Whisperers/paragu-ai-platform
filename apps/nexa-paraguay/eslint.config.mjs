// Nexa Paraguay — ESLint flat config (Next 16 compatible)
// Uses the local `eslint-config-next` dev dependency.

import nextConfig from "eslint-config-next";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "dist/**",
      "scripts/_archive/**",
      "tests/e2e/**",
      "**/*.tsbuildinfo",
    ],
  },
  nextConfig,
  {
    rules: {
      // Conservative overrides — turn rules on gradually, not all at once
      "@next/next/no-html-link-for-pages": "off",  // we use href rewrites in proxy.ts
      "react/no-unescaped-entities": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
