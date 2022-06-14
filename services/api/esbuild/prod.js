const { defu } = require("defu")
const { build } = require("esbuild")
const baseConfig = require("./base")

/** @type {import("esbuild").BuildOptions} */
const prodConfig = {
    minify: true,
    define: {
        "process.env.NODE_ENV": JSON.stringify("production")
    }
}

build(defu(baseConfig, prodConfig))
