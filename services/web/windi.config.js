import colors from "windicss/colors"

function getColors(color, shade) {
    return {
        lighter: `${color}-${shade - 100}`,
        default: `${color}-${shade}`,
        darker: `${color}-${shade + 100}`
    }
}

const contentColors = {
    light: "white",
    dark: "zinc-800"
}

const specialColors = {
    default: {
        light: getColors("slate", 400),
        dark: getColors("slate", 600)
    },
    primary: {
        light: getColors("orange", 400),
        dark: getColors("teal", 700)
    },
    success: {
        light: getColors("green", 500),
        dark: getColors("green", 600)
    },
    error: {
        light: getColors("red", 400),
        dark: getColors("red", 500)
    },
    warning: {
        light: getColors("yellow", 400),
        dark: getColors("yellow", 500)
    },
    info: {
        light: getColors("sky", 400),
        dark: getColors("sky", 500)
    }
}

const utils = ["bg", "text", "border", "placeholder"]

function getFullPalette() {
    return Object.fromEntries(Object.entries(colors).filter(([color]) => !color.match(/[A-Z]/)))
}

function getShortcuts(util) {
    let result = {}

    for (const color of Object.keys(specialColors)) {
        const base = `${util}-${color}`
        const c = specialColors[color]
        result = {
            ...result,
            [`${base}-lighter`]: `${util}-${c.light.lighter} dark:${util}-${c.dark.lighter}`,
            [base]: `${util}-${c.light.default} dark:${util}-${c.dark.default}`,
            [`${base}-darker`]: `${util}-${c.light.darker} dark:${util}-${c.dark.darker}`
        }
    }

    return result
}

function getShortcutsForAllUtils() {
    let result = {}

    for (const util of utils) {
        result = {
            ...result,
            ...getShortcuts(util),
            [`${util}-content`]: `${util}-${contentColors.light} dark:${util}-${contentColors.dark}`,
            [`${util}-content-inverse`]: `${util}-${contentColors.dark} dark:${util}-${contentColors.light}`,
            [`${util}-content-light`]: `${util}-${contentColors.light}`,
            [`${util}-content-dark`]: `${util}-${contentColors.dark}`
        }
    }

    return result
}

/** @type {import("windicss/types/interfaces").FullConfig} */
const config = {
    extract: {
        include: ["./src/**/*.svelte"]
    },
    darkMode: "class",
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            ...getFullPalette()
        }
    },
    shortcuts: getShortcutsForAllUtils()
}

export default config
