<script lang="ts">
    import { Content, Button, TextField, TextArea } from "$lib/components"

    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { posts } from "$lib/stores"

    let postTitle = ""
    let postContent = ""

    $: trimmedPostTitle = postTitle.trim()
    $: trimmedPostContent = postContent.trim()

    $: disabledCreating = !(trimmedPostTitle && trimmedPostContent)

    function createPost() {
        if (!disabledCreating) {
            posts.add(trimmedPostTitle, trimmedPostContent)
            goto($localePath("/posts"))
        }
    }
</script>

<svelte:head>
    <title>{$t("routes.posts.create.post-creating")}</title>
</svelte:head>

<Content.Center>
    <div class="flex flex-col gap-4 w-150 border-primary rounded-lg border text-center p-8">
        <div>
            <h1>{$t("routes.posts.create.post-creating")}</h1>
        </div>
        <div>
            <TextField
                label={$t("routes.posts.create.title")}
                placeholder={$t("routes.posts.create.enter-title")}
                bind:value={postTitle}
            />
        </div>
        <div>
            <TextArea
                class="resize-none"
                label={$t("routes.posts.create.content")}
                placeholder={$t("routes.posts.create.enter-content")}
                bind:value={postContent}
            />
        </div>
        <div class="flex justify-center">
            <Button type="success" disabled={disabledCreating} on:click={createPost}>
                {$t("routes.posts.create.create")}
            </Button>
        </div>
    </div>
</Content.Center>
