const path = require("path")
const { defu } = require("defu")
const { build } = require("esbuild")
const { run } = require("esbuild-plugin-run")
const baseConfig = require("./base")

/** @type {import("esbuild").BuildOptions} */
const devConfig = {
    sourcemap: "inline",
    watch: true,
    define: {
        "process.env.NODE_ENV": JSON.stringify("development")
    },
    plugins: [run()],
    inject: [path.join(__dirname, "dotenv.js"), path.join(__dirname, "sourcemaps.js")]
}

build(defu(baseConfig, devConfig))
