import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tailwind from "eslint-plugin-tailwindcss";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tailwind.configs["flat/recommended"],
  {
    ignores: ["dist/"],
  },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        describe: true, // Used for grouping tests
        test: true, // Used to create tests
        it: true, // Alternative way to create tests
        expect: true, // Used for test assertions
        require: true, // Used in Node.js files like Tailwind config
        module: true, // Used in Node.js files like Tailwind config
        process: true, // Used for environment variables later
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-useless-escape": "off",
    },
  },
];
