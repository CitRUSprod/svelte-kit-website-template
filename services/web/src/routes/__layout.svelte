<script lang="ts" context="module">
    import { loadTranslations } from "$lib/locales"
    import { getLocaleAndRoute } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"

    export const load: Load = async ({ url }) => {
        const { locale, route } = getLocaleAndRoute(url.pathname)
        await loadTranslations(locale!, route)

        return {
            stuff: { locale, route }
        }
    }
</script>

<script lang="ts">
    import { PageProgressBar, ToastContainer } from "./_components"

    import { browser } from "$app/env"
    import { darkTheme } from "$lib/stores"

    if (browser) {
        darkTheme.sync()
    }
</script>

<PageProgressBar />
<slot />
<ToastContainer />

<!-- eslint-disable @ota-meshi/svelte/valid-compile -->
<style lang="postcss" global>
    @windicss;

    html {
        @apply overflow-x-hidden;
    }

    body {
        @apply flex flex-col min-h-screen bg-content text-content-inverse transition duration-200 overflow-x-hidden;
    }

    h1,
    h2,
    h3 {
        @apply font-bold;
    }

    h1 {
        @apply text-4xl;
    }

    h2 {
        @apply text-2xl;
    }

    h3 {
        @apply text-lg;
    }
</style>
