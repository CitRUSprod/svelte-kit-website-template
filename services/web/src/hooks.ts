import { defaultLocale, locales } from "$lib/locales"
import * as api from "$lib/api"
import { cookies, getLocaleAndRoute } from "$lib/utils"

import type { Handle, GetSession } from "@sveltejs/kit"

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

    let cookieArray: Array<string> = []

    const [user, errorData, info] = await api.auth.getMe({ fetchy: { headers: e.request.headers } })

    if (!errorData) {
        e.locals.user = user
        cookieArray = cookies.getSetFromHeaders(info.headers)
    }

    const cookie = cookies.merge(
        e.request.headers.get("cookie")?.split("; "),
        cookies.getKeyValuePairs(cookieArray)
    )

    if (cookie.length) e.request.headers.set("cookie", cookie.join("; "))

    const response = await resolve(e)
    const body = await response.text()

    cookieArray = cookies.merge(cookieArray, cookies.getSetFromHeaders(response.headers))

    if (cookieArray.length) response.headers.set("set-cookie", cookieArray.toString())

    return new Response(body.replace(/<html.*>/, `<html lang="${locale}">`), response)
}

export const getSession: GetSession = req => ({ user: req.locals.user ?? null })
