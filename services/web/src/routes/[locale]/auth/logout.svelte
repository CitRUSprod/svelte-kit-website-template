<script lang="ts" context="module">
    import { createRedirectResponse } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"

    export const load: Load = ({ session, params }) => {
        if (!session.user) return createRedirectResponse(`/${params.locale}`)
        return {}
    }
</script>

<script lang="ts">
    import { Content } from "$lib/components"

    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { session } from "$app/stores"
    import { toasts } from "$lib/stores"
    import { localePath } from "$lib/locales"
    import * as api from "$lib/api"

    async function logout() {
        const [, errorData] = await api.auth.logout()

        if (errorData) {
            toasts.add("error", errorData.message)
        } else {
            $session.user = null
            toasts.add("success", "You have successfully logged out")
            goto($localePath("/"), { replaceState: true })
        }
    }

    if (browser) logout()
</script>

<svelte:head>
    <title>Перенаправление...</title>
</svelte:head>

<Content.Default title="Перенаправление..." />
