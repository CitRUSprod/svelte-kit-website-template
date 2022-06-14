import { locales } from "$lib/locales"

const supportedLocales = locales.get()

export function getLocaleAndRoute(path: string) {
    const parts = path.split("/")
    parts.shift()

    let locale: string | undefined

    if (supportedLocales.includes(parts[0])) {
        locale = parts.shift()
    }

    const route = `/${parts.join("/")}`

    return { locale, route }
}
