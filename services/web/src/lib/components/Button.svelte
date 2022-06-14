<script lang="ts">
    import * as Icon from "./Icon"

    import classNames from "classnames"
    import { getElementTypeObject } from "$lib/utils"

    import type { ElementType } from "$lib/types"

    export let type: ElementType = "default"
    export let href = undefined as string | undefined
    export let target: string | undefined = undefined
    export let rel: string | undefined = undefined
    export let text = false as boolean
    export let icon = false
    export let disabled = false as boolean
    export let loading = false as boolean

    let klass: string | undefined = undefined
    export { klass as class }

    $: types = getElementTypeObject(type)
</script>

<button
    class={classNames(
        "relative inline-flex justify-center items-center h-10 font-bold transition duration-200 align-top select-none",
        "active:transform",
        "disabled:cursor-not-allowed",
        "focus:outline-none",
        {
            "px-4 rounded": !icon,
            "w-10 rounded-full": icon,
            "text-content-light": !text && !loading,
            "text-transparent": loading,
            "hover:bg-opacity-30 active:bg-opacity-30 dark:hover:bg-opacity-30 dark:active:bg-opacity-30":
                text,
            "active:scale-90": !disabled && !loading,
            "disabled:opacity-50": disabled,
            "bg-default": !text && types.default,
            "bg-primary": !text && types.primary,
            "bg-success": !text && types.success,
            "bg-error": !text && types.error,
            "bg-warning": !text && types.warning,
            "bg-info": !text && types.info,
            "hover:bg-default-lighter active:bg-default-darker": !disabled && types.default,
            "hover:bg-primary-lighter active:bg-primary-darker": !disabled && types.primary,
            "hover:bg-success-lighter active:bg-success-darker": !disabled && types.success,
            "hover:bg-error-lighter active:bg-error-darker": !disabled && types.error,
            "hover:bg-warning-lighter active:bg-warning-darker": !disabled && types.warning,
            "hover:bg-info-lighter active:bg-info-darker": !disabled && types.info,
            "text-default": !loading && text && types.default,
            "text-primary": !loading && text && types.primary,
            "text-success": !loading && text && types.success,
            "text-error": !loading && text && types.error,
            "text-warning": !loading && text && types.warning,
            "text-info": !loading && text && types.info
        },
        klass
    )}
    disabled={disabled || loading}
    on:click
>
    <slot />
    {#if loading}
        <div
            class={classNames(
                "absolute top-0 left-0 flex justify-center items-center w-full h-full",
                {
                    rounded: !icon,
                    "rounded-full": icon,
                    "text-content-light": !text,
                    "text-default": text && types.default,
                    "text-primary": text && types.primary,
                    "text-success": text && types.success,
                    "text-error": text && types.error,
                    "text-warning": text && types.warning,
                    "text-info": text && types.info
                }
            )}
        >
            <Icon.Loading class="animate-spin" />
        </div>
    {:else if href !== undefined && !disabled}
        <!-- svelte-ignore a11y-missing-content -->
        <a
            class={classNames("absolute top-0 left-0 w-full h-full", {
                rounded: !icon,
                "rounded-full": icon
            })}
            {href}
            {target}
            {rel}
        />
    {/if}
</button>
