<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { t, localePath } from "$lib/locales"
    import { posts } from "$lib/stores"

    function integer(id: number) {
        return id
    }
</script>

<svelte:head>
    <title>{$t("routes.posts.posts")}</title>
</svelte:head>

<Content.Default title={$t("routes.posts.posts")}>
    <div>
        <Button type="success" href={$localePath("/posts/create")}>
            {$t("routes.posts.create-post")}
        </Button>
    </div>
    <div class="grid grid-cols-3 gap-4">
        {#each $posts as post (post.id)}
            <a
                class="p-4 border-primary rounded-lg border transition hover:bg-primary hover:bg-opacity-20 dark:hover:bg-opacity-20"
                href={$localePath(`/posts/${integer(post.id)}`)}
            >
                <div>
                    <h3>{post.title}</h3>
                </div>
                <div>
                    <p class="truncate">{post.content}</p>
                </div>
            </a>
        {/each}
    </div>
</Content.Default>
