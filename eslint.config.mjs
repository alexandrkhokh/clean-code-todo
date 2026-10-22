import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended", eslintConfigPrettier],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-var": "error",

      "no-unused-vars": "error",

      "prefer-const": [
        "error",
        {
          destructuring: "any",
          ignoreReadBeforeAssign: false,
        },
      ],

      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
    },
  },
]);
