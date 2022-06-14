<script lang="ts">
    import { Input } from "./internal"

    import classNames from "classnames"
    import { getElementTypeObject } from "$lib/utils"

    import type { ElementType, Icon } from "$lib/types"

    export let type: ElementType = "default"
    export let placeholder: string | undefined = undefined
    export let label: string | undefined = undefined
    export let valueType = "text"
    export let disabled = false
    export let readonly = false
    export let autofocus = false
    export let value: string | number | null | undefined = undefined
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export let LeftIcon: Icon | undefined = undefined
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export let RightIcon: Icon | undefined = undefined

    let klass: string | undefined = undefined
    export { klass as class }

    $: types = getElementTypeObject(type)
</script>

<div
    class={classNames(
        "relative flex items-center",
        {
            "opacity-50": disabled,
            "text-default": types.default,
            "text-primary": types.primary,
            "text-success": types.success,
            "text-error": types.error,
            "text-warning": types.warning,
            "text-info": types.info
        },
        klass
    )}
>
    {#if label}
        <div
            class="absolute top-0 left-3 -top-1.5 px-0.5 bg-content text-xs select-none pointer-events-none z-1"
        >
            {label}
        </div>
    {/if}
    {#if LeftIcon}
        <svelte:component this={LeftIcon} class="absolute left-3 pointer-events-none" />
    {/if}
    <Input
        class={classNames(
            "w-full h-10 px-3 bg-content text-content-inverse border rounded placeholder-opacity-80 outline-none",
            "dark:placeholder-opacity-80",
            "disabled:cursor-not-allowed",
            {
                "pl-10": LeftIcon,
                "pr-10": RightIcon,
                "border-default placeholder-default-lighter": types.default,
                "border-primary placeholder-primary-lighter": types.primary,
                "border-success placeholder-success-lighter": types.success,
                "border-error placeholder-error-lighter": types.error,
                "border-warning placeholder-warning-lighter": types.warning,
                "border-info placeholder-info-lighter": types.info
            }
        )}
        type={valueType}
        {placeholder}
        {disabled}
        {readonly}
        {autofocus}
        bind:value
        on:keypress
        on:focus
        on:blur
    />
    {#if RightIcon}
        <svelte:component this={RightIcon} class="absolute right-3 pointer-events-none" />
    {/if}
</div>
