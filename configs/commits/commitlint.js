const { types, getScopes } = require("./base")

/** @type {import("@commitlint/types").UserConfig} */
const config = {
    rules: {
        "body-empty": [2, "always"],
        "footer-empty": [2, "always"],
        "header-max-length": [2, "always", 72],
        "scope-case": [2, "always", "kebab-case"],
        "scope-enum": [2, "always", getScopes("services")],
        "subject-case": [2, "always", "sentence-case"],
        "subject-empty": [2, "never"],
        "subject-full-stop": [2, "never", "."],
        "type-case": [2, "always", "lower-case"],
        "type-empty": [2, "never"],
        "type-enum": [2, "always", Object.keys(types)]
    }
}

module.exports = config
