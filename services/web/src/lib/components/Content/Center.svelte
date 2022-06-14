<script lang="ts">
    import classNames from "classnames"

    let klass: string | undefined = undefined
    export { klass as class }
</script>

<div class={classNames("absolute flex justify-center items-center w-full h-full", klass)}>
    <slot />
</div>
