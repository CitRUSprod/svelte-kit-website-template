<script lang="ts">
    import { Icon, Button } from "$lib/components"

    import classNames from "classnames"
    import { page } from "$app/stores"
    import { darkTheme } from "$lib/stores"
    import { t, currentLocale, locales, localePath } from "$lib/locales"
    import { env } from "$lib/utils"
</script>

<header class="flex items-center gap-2 px-6 py-2 bg-primary text-content-light shadow-lg">
    <div>
        <h2>
            <a href={$localePath("/")}>{env.VITE_TITLE}</a>
        </h2>
    </div>
    <div class="flex flex-1 flex-wrap justify-end gap-2">
        <Button type="primary" href={$localePath("/todo")}>{$t("components.header.todo")}</Button>
        <Button type="primary" href={$localePath("/lorem")}>Lorem</Button>
        <Button type="primary" href={$localePath("/simple-layout")}>
            {$t("components.header.simple-layout")}
        </Button>
        <Button type="primary" href={$localePath("/posts")}>
            {$t("components.header.posts")}
        </Button>
        <div class="flex items-center gap-1 mx-1">
            {#each $locales as locale, index (locale)}
                <Button
                    class={classNames("px-1", { "opacity-50": $currentLocale !== locale })}
                    type="primary"
                    href={$localePath($page.stuff.route, locale)}
                >
                    {locale.toUpperCase()}
                </Button>
                {#if index < $locales.length - 1}
                    <div class="font-bold">/</div>
                {/if}
            {/each}
        </div>
        <Button type="primary" icon on:click={darkTheme.toggle}>
            <svelte:component this={$darkTheme ? Icon.Sun : Icon.Moon} />
        </Button>
        <Button
            type="primary"
            href="https://github.com/CitRUSprod/svelte-kit-starter"
            target="_blank"
            rel="noopener noreferrer"
            icon
        >
            <Icon.GitHub />
        </Button>
    </div>
</header>
