<script lang="ts">
    import { Alert } from "$lib/components"

    import { fly, fade } from "svelte/transition"
    import { toasts } from "$lib/stores"
</script>

<div class="fixed right-3 bottom-2 flex flex-col-reverse w-80 text-white z-1000">
    {#each $toasts as toast (toast.id)}
        <div in:fly|local={{ y: -200, duration: 500 }} out:fade|local>
            <Alert
                class="my-1 shadow-md select-none"
                type={toast.type}
                closable
                on:close={() => toasts.remove(toast.id)}
            >
                {toast.text}
            </Alert>
        </div>
    {/each}
</div>
