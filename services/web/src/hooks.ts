import { defaultLocale, locales } from "$lib/locales"
import { getLocaleAndRoute } from "$lib/utils"

import type { Handle } from "@sveltejs/kit"

const supportedLocales = locales.get()

export const handle: Handle = async ({ event: e, resolve }) => {
    const { locale, route } = getLocaleAndRoute(e.url.pathname)

    if (!locale) {
        const lang = e.request.headers.get("accept-language") ?? ""
        const localeCandidate = /^[a-z]{2}\b/.exec(lang)?.toString()
        const isSupportedLocale = !!localeCandidate && supportedLocales.includes(localeCandidate)

        const headers = new Headers()
        headers.set("location", `/${isSupportedLocale ? localeCandidate : defaultLocale}${route}`)

        return new Response(undefined, { status: 301, headers })
    }

    const response = await resolve(e)
    const body = await response.text()

    return new Response(body.replace(/<html.*>/, `<html lang="${locale}">`), response)
}
