/** @type {import("eslint").Linter.Config} */
const config = {
    extends: [
        "@citrus-linting",
        "@citrus-linting/eslint-config/typescript",
        "@citrus-linting/eslint-config/svelte-typescript",
        "prettier"
    ],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [2]
    },
    overrides: [
        {
            files: ["*.json"],
            parser: "any-eslint-parser"
        },
        {
            files: ["*.y?(a)ml"],
            parser: "any-eslint-parser"
        },
        {
            files: ["*.html"],
            parser: "any-eslint-parser",
            rules: {
                "prettier/prettier": [2, { parser: "html" }]
            }
        },
        {
            files: ["*.md"],
            parser: "any-eslint-parser",
            rules: {
                "prettier/prettier": [2, { parser: "markdown" }]
            }
        },
        {
            files: ["*.ts"],
            parserOptions: {
                project: "./services/*/tsconfig.json"
            }
        },
        {
            files: ["*.svelte"],
            parserOptions: {
                project: "./services/*/tsconfig.eslint.json"
            },
            rules: {
                "@ota-meshi/svelte/indent": 0,
                "@ota-meshi/svelte/first-attribute-linebreak": 0
            }
        }
    ]
}

module.exports = config
