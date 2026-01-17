import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import regexpEslint from "eslint-plugin-regexp";

// Base configuration for all files
const baseConfig = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  rules: {
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
  },
};

export default [
  baseConfig,
  // general ignores
  {
    ignores: [
      "**/*.d.ts",
      ".astro/",
      ".vscode/",
      "**/*.min.*",
      "node_modules/",
      "dist/",
      "public/",
    ],
  },
  // general rules
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  prettierRecommended,
  regexpEslint.configs["flat/recommended"],
  {
    // default for astro files
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    // JavaScript/TypeScript files
    files: ["**/*.{js,jsx,mjs,ts,tsx}"],
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    // TypeScript-specific rules
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  {
    // disable prettier only for js/ts in <script> tags in astro files
    files: ["**/*.astro/*.js", "**/*.astro/*.ts"],
    rules: {
      "prettier/prettier": "off",
    },
  },
];
