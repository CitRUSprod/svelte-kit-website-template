<script lang="ts">
    import { Header, Footer } from "./_components"
</script>

<Header />
<main class="relative flex-1">
    <slot />
</main>
<Footer />
