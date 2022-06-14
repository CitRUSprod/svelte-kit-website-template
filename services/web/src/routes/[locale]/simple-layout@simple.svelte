<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { t, localePath } from "$lib/locales"
</script>

<svelte:head>
    <title>{$t("routes.simple-layout.simple-layout")}</title>
</svelte:head>

<Content.Center>
    <div class="border-primary rounded-lg border text-center p-8">
        <h1>{$t("routes.simple-layout.simple-layout")}</h1>
        <div class="flex justify-center mt-5">
            <Button type="primary" href={$localePath("/")}>
                {$t("routes.simple-layout.go-home")}
            </Button>
        </div>
    </div>
</Content.Center>
