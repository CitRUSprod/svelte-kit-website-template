<script lang="ts">
    import * as Icon from "./Icon"

    import classNames from "classnames"
    import { getElementTypeObject } from "$lib/utils"

    import type { ElementType } from "$lib/types"

    export let type: ElementType = "default"
    export let label: string | undefined = undefined
    export let disabled = false
    export let checked = false as boolean

    let klass: string | undefined = undefined
    export { klass as class }

    $: types = getElementTypeObject(type)

    function click() {
        if (!disabled) {
            checked = !checked
        }
    }
</script>

<div
    class={classNames(
        "inline-flex items-center w-auto gap-1 align-top cursor-pointer",
        {
            "opacity-50": disabled
        },
        klass
    )}
    on:click={click}
>
    <span
        class={classNames(
            "flex justify-center items-center w-6 h-6 text-content-light border rounded select-none",
            {
                "bg-content": !checked,
                "border-default": types.default,
                "border-primary": types.primary,
                "border-success": types.success,
                "border-error": types.error,
                "border-warning": types.warning,
                "border-info": types.info,
                "bg-default": checked && types.default,
                "bg-primary": checked && types.primary,
                "bg-success": checked && types.success,
                "bg-error": checked && types.error,
                "bg-warning": checked && types.warning,
                "bg-info": checked && types.info
            }
        )}
    >
        {#if checked}
            <Icon.Success class="text-sm" />
        {/if}
    </span>
    {#if label}
        <span>{label}</span>
    {/if}
</div>
