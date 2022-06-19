export function createRedirectResponse(url: string) {
    return {
        status: 302,
        redirect: url
    }
}
