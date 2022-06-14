import preprocess from "svelte-preprocess"
import icons from "unplugin-icons/vite"
import dynamicImport from "vite-plugin-dynamic-import"
import adapterNode from "@sveltejs/adapter-node"

const isDev = process.env.NODE_ENV === "development"

/** @type {import("@sveltejs/kit").Config} */
const config = {
    preprocess: preprocess({
        postcss: true
    }),
    kit: {
        adapter: adapterNode({ out: "dist" }),
        vite: {
            envDir: isDev ? "../.." : undefined,
            plugins: [icons({ compiler: "svelte" }), dynamicImport.default()]
        }
    }
}

export default config
