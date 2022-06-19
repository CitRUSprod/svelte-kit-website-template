<script lang="ts" context="module">
    import { t, localePath, loadTranslations } from "$lib/locales"
    import { getLocaleAndRoute } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"

    export const load: Load = async ({ url }) => {
        const { locale, route } = getLocaleAndRoute(url.pathname)
        await loadTranslations(locale!, "error")

        return {
            stuff: { locale, route }
        }
    }
</script>

<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { page } from "$app/stores"
</script>

<svelte:head>
    <title>{$t("routes.error.error")} {$page.status}</title>
</svelte:head>

<main class="relative flex-1">
    <Content.Center>
        <div class="border-error rounded-lg border text-center p-8">
            <h1>{$t("routes.error.error")} {$page.status}</h1>
            {#if $page.error}
                <h2>{$page.error.message}</h2>
            {/if}
            <div class="flex justify-center mt-5">
                <Button type="error" href={$localePath("/")}>
                    {$t("routes.error.go-home")}
                </Button>
            </div>
        </div>
    </Content.Center>
</main>
