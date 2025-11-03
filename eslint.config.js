import js from "@eslint/js";
import html from "@html-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
    },
    {
        files: ["**/*.html"],
        plugins: {
            html,
        },
        extends: ["html/recommended"],
        language: "html/html",
        rules: {
            // best practice
            "html/max-element-depth": "off",
            "html/no-duplicate-attrs": "error",
            "html/no-duplicate-id": "error",
            "html/no-duplicate-class": "error",
            "html/no-duplicate-in-head": "error",
            "html/no-ineffective-attrs": "error",
            "html/no-inline-styles": "warn",
            "html/no-invalid-entity": "error",
            "html/no-nested-interactive": "warn",
            "html/no-obsolete-tags": "warn",
            "html/no-script-style-type": "error",
            "html/no-target-blank": "error",
            "html/prefer-https": "warn",
            "html/require-attrs": [
                "warn",
                {
                    tag: "svg",
                    attr: "viewBox",
                    message: "SVGs should have a viewBox attribute",
                },
            ],
            "html/require-button-type": "error",
            "html/require-closing-tags": [
                "error",
                {
                    selfClosing: "never",
                },
            ],
            "html/require-doctype": "error",
            "html/require-explicit-size": "off",
            "html/require-li-container": "error",
            "html/require-meta-charset": "error",
            "html/use-baseline": "warn",

            // seo
            "html/no-multiple-h1": "error",
            "html/require-lang": "error",
            "html/require-meta-description": "warn",
            "html/require-open-graph-protocol": "warn",
            "html/require-title": "error",

            // accessibility
            "html/no-abstract-roles": "warn",
            "html/no-accesskey-attrs": "warn",
            "html/no-aria-hidden-body": "error",
            "html/no-aria-hidden-on-focusable": "warn",
            "html/no-empty-headings": "warn",
            "html/no-heading-inside-button": "warn",
            "html/no-invalid-role": "warn",
            "html/no-non-scalable-viewport": "off",
            "html/no-positive-tabindex": "off",
            "html/no-skip-heading-levels": "warn",
            "html/require-form-method": "error",
            "html/require-frame-title": "error",
            "html/require-img-alt": "warn",
            "html/require-input-label": "warn",
            "html/require-meta-viewport": "error",

            // style
            "html/attrs-newline": "warn",
            "html/indent": "warn",
            "html/lowercase": "warn",
            "html/no-extra-spacing-attrs": "warn",
            "html/no-extra-spacing-text": ["warn", { skip: ["pre", "code"] }],
            "html/no-multiple-empty-lines": "warn",
            "html/no-trailing-spaces": "warn",
            "html/quotes": "warn",
            "html/sort-attrs": [
                "warn",
                {
                    priority: [
                        "id",
                        "type",
                        "class",
                        "style",
                        "property",
                        "name",
                    ],
                },
            ],
        },
    },
]);
