<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { env } from "$lib/utils"
    import { toasts } from "$lib/stores"
    import { t } from "$lib/locales"

    let count = 0

    function addOne() {
        count++
        toasts.add("success", `${$t("routes.home.count") as string}: ${count}`)
    }
</script>

<svelte:head>
    <title>{$t("routes.home.home")}</title>
</svelte:head>

<Content.Center>
    <div class="border-primary rounded-lg border text-center p-8">
        <h1>{env.VITE_TITLE}</h1>
        <div class="flex justify-center mt-5">
            <Button type="primary" on:click={addOne}>
                {$t("routes.home.clicked")}: {count}
            </Button>
        </div>
    </div>
</Content.Center>
