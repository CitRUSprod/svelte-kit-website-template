<script lang="ts">
    import { Content, Icon, Button, TextField, Checkbox } from "$lib/components"

    import { crossfade } from "svelte/transition"
    import { browser } from "$app/env"
    import { t } from "$lib/locales"

    const [send, receive] = crossfade({
        duration: 500,
        fallback(node) {
            const style = getComputedStyle(node)
            const transform = style.transform === "none" ? "" : style.transform

            return {
                duration: 300,
                css: value => `
                    transform: ${transform} scale(${value});
                    opacity: ${value};
                `
            }
        }
    })

    interface Task {
        id: number
        text: string
        completed: boolean
    }

    let tasks: Array<Task> = []

    if (browser) {
        tasks = JSON.parse(localStorage.getItem("tasks") ?? "[]")
    }

    $: if (browser) {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    $: completedTasks = tasks.filter(task => task.completed)
    $: incompleteTasks = tasks.filter(task => !task.completed)

    let taskText = ""

    $: trimmedTaskText = taskText.trim()

    function addTask() {
        if (trimmedTaskText) {
            tasks.push({
                id: Date.now(),
                text: trimmedTaskText,
                completed: false
            })
            tasks = tasks
            taskText = ""
        }
    }

    function addTaskOnEnter(e: KeyboardEvent) {
        if (e.key === "Enter") {
            addTask()
        }
    }

    function removeTask(id: number) {
        tasks = tasks.filter(task => task.id !== id)
    }
</script>

<svelte:head>
    <title>{$t("routes.todo.todo")}</title>
</svelte:head>

<Content.Default title={$t("routes.todo.todo")}>
    <div class="flex gap-2">
        <TextField
            class="flex-1"
            type="primary"
            placeholder={$t("routes.todo.enter-task")}
            LeftIcon={Icon.Task}
            bind:value={taskText}
            on:keypress={addTaskOnEnter}
        />
        <Button type="primary" disabled={!trimmedTaskText} on:click={addTask}>
            {$t("routes.todo.add")}
        </Button>
    </div>
    <div class="flex gap-4">
        <div class="flex-1">
            <h2>{$t("routes.todo.should-be-done")} ({incompleteTasks.length})</h2>
            <ul class="flex flex-col gap-2 mt-2">
                {#each incompleteTasks as task (task.id)}
                    <li
                        class="flex items-center gap-2 p-3 bg-content border-primary border rounded"
                        in:receive|local={{ key: task.id }}
                        out:send|local={{ key: task.id }}
                    >
                        <Checkbox type="primary" bind:checked={task.completed} />
                        <span class="flex-1">{task.text}</span>
                        <Button type="error" text icon on:click={() => removeTask(task.id)}>
                            <Icon.Trash />
                        </Button>
                    </li>
                {/each}
            </ul>
        </div>
        <div class="flex-1">
            <h2>{$t("routes.todo.done")} ({completedTasks.length})</h2>
            <ul class="flex flex-col gap-2 mt-2">
                {#each completedTasks as task (task.id)}
                    <li
                        class="flex items-center gap-2 p-3 bg-content border-primary border rounded"
                        in:receive|local={{ key: task.id }}
                        out:send|local={{ key: task.id }}
                    >
                        <Checkbox type="primary" bind:checked={task.completed} />
                        <span class="flex-1 line-through">{task.text}</span>
                        <Button type="error" text icon on:click={() => removeTask(task.id)}>
                            <Icon.Trash />
                        </Button>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</Content.Default>
