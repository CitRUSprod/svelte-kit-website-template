<script lang="ts">
    import { onMount } from "svelte"

    export let type: string
    export let readonly: boolean
    export let autofocus: boolean
    export let value: string | number | null | undefined

    let input: HTMLInputElement

    onMount(() => {
        if (autofocus) {
            input.focus()
        }
    })
</script>

{#if type === "number"}
    <input
        type="number"
        {readonly}
        bind:value
        bind:this={input}
        {...$$restProps}
        on:keypress
        on:focus
        on:blur
    />
{:else}
    <input
        {...{ type }}
        {readonly}
        bind:value
        bind:this={input}
        {...$$restProps}
        on:keypress
        on:focus
        on:blur
    />
{/if}
