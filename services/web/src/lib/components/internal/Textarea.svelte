<script lang="ts">
    import { onMount } from "svelte"

    export let readonly: boolean
    export let autofocus: boolean
    export let value: string | number | null | undefined

    let textarea: HTMLTextAreaElement

    onMount(() => {
        if (autofocus) {
            textarea.focus()
        }
    })
</script>

<textarea
    {readonly}
    bind:value
    bind:this={textarea}
    {...$$restProps}
    on:keypress
    on:focus
    on:blur
/>
