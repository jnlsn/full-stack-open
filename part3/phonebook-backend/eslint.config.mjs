import globals from "globals";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },

    rules: {
      eqeqeq: "error",
      "no-console": "off",
    },
  },
  {
    ignores: ["dist/**", "build/**"],
  },
  eslintConfigPrettier,
];
