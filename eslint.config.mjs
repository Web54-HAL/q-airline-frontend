import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-console": "warn", 
      "no-unused-vars": "warn", 
      "react/prop-types": "off", // Tắt cảnh báo về prop-types
      "react/react-in-jsx-scope": "off", 
      "react/jsx-key": "warn", 
      "react/no-unstable-nested-components": "off",
        "react/no-uncontrolled-component": "off"
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
