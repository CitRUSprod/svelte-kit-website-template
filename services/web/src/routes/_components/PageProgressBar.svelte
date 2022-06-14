<script lang="ts">
    import { onDestroy } from "svelte"
    import NProgress from "nprogress"
    import { beforeNavigate, afterNavigate } from "$app/navigation"

    NProgress.configure({
        showSpinner: false
    })

    beforeNavigate(() => {
        NProgress.start()
    })

    afterNavigate(() => {
        NProgress.done()
    })

    onDestroy(() => {
        NProgress.done()
    })
</script>

{#if false}
    <div />
{/if}

<!-- eslint-disable @ota-meshi/svelte/valid-compile -->
<style lang="postcss" global>
    #nprogress {
        @apply pointer-events-none;
    }

    #nprogress .bar {
        @apply fixed top-0 left-0 w-full h-0.5 bg-green-500 z-1000;
    }
</style>
