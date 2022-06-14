<script lang="ts">
    import classNames from "classnames"

    export let title: string

    let klass: string | undefined = undefined
    export { klass as class }
</script>

<div class="container mx-auto p-4">
    <div>
        <h1>{title}</h1>
    </div>
    <div class={classNames("grid gap-4 my-4", klass)}>
        <slot />
    </div>
</div>
