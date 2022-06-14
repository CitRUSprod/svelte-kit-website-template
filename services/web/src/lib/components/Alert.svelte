<script lang="ts">
    import * as Icon from "./Icon"
    import Button from "./Button.svelte"

    import { createEventDispatcher } from "svelte"
    import classNames from "classnames"
    import { t } from "$lib/locales"
    import { getElementBasicTypeObject } from "$lib/utils"

    import type { ElementBasicType } from "$lib/types"

    export let type: ElementBasicType
    export let visible = true
    export let closable = false

    let klass: string | undefined = undefined
    export { klass as class }

    $: types = getElementBasicTypeObject(type)

    const dispatch = createEventDispatcher()

    function getIconByType(localType: string) {
        switch (localType) {
            case "success":
                return Icon.Success
            case "error":
                return Icon.Error
            case "warning":
                return Icon.Warning
            default:
                return Icon.Info
        }
    }

    function getTextByType(localType: string) {
        switch (localType) {
            case "success":
                return $t("components.alert.success")
            case "error":
                return $t("components.alert.error")
            case "warning":
                return $t("components.alert.warning")
            default:
                return $t("components.alert.info")
        }
    }

    function close() {
        dispatch("close")
        visible = false
    }
</script>

{#if visible}
    <div
        class={classNames(
            "flex w-full rounded-md bg-content border-2",
            {
                "border-success": types.success,
                "border-error": types.error,
                "border-warning": types.warning,
                "border-info": types.info
            },
            klass
        )}
    >
        <div
            class={classNames("flex justify-center items-center w-12 text-content-light", {
                "bg-success": types.success,
                "bg-error": types.error,
                "bg-warning": types.warning,
                "bg-info": types.info
            })}
        >
            <svelte:component this={getIconByType(type)} />
        </div>
        <div class="flex flex-1 justify-between">
            <div class="px-4 py-2">
                <b
                    class={classNames({
                        "text-success": types.success,
                        "text-error": types.error,
                        "text-warning": types.warning,
                        "text-info": types.info
                    })}
                >
                    {getTextByType(type)}
                </b>
                <p class="text-content-inverse text-sm">
                    <slot />
                </p>
            </div>
            {#if closable}
                <div class="pr-2 py-2">
                    <Button {type} text icon on:click={close}>
                        <Icon.Close />
                    </Button>
                </div>
            {/if}
        </div>
    </div>
{/if}
