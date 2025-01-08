import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    pluginJs.configs.recommended,
    pluginReactConfig,
    {
        rules: {
            "react/prop-types": "off",
        },
    },
];
