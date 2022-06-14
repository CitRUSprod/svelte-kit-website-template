<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"

    export const load: Load = ({ params }) => ({
        props: {
            id: parseInt(params.id)
        }
    })
</script>

<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { posts } from "$lib/stores"

    export let id: number

    const post = $posts.find(p => p.id === id)
    if (browser && !post) goto($localePath("/posts"))

    function removePost() {
        posts.remove(id)
        goto($localePath("/posts"))
    }
</script>

<svelte:head>
    {#if browser && post}
        <title>{post.title}</title>
    {/if}
</svelte:head>

{#if browser && post}
    <Content.Default title={post.title}>
        <div class="flex flex-col gap-4">
            {#each post.content.split(/\n+/) as paragraph}
                <p>{paragraph}</p>
            {/each}
        </div>
        <div>
            <Button type="warning" href={$localePath(`/posts/${id}/edit`)}>
                {$t("routes.posts.[id].edit")}
            </Button>
            <Button type="error" on:click={removePost}>{$t("routes.posts.[id].remove")}</Button>
        </div>
    </Content.Default>
{/if}
