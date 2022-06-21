<script lang="ts" context="module">
    import { createRedirectResponse } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"

    export const load: Load = async ({ session, params }) => {
        if (!session.user) return createRedirectResponse(`/${params.locale}`)
        return {}
    }
</script>

<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { goto } from "$app/navigation"
    import { session } from "$app/stores"
    import { toasts } from "$lib/stores"
    import { localePath } from "$lib/locales"
    import * as api from "$lib/api"

    let { id, email, username } = $session.user!

    $: trimmedEmail = email.trim()
    $: trimmedUsername = username.trim()

    $: disabledSave = !(trimmedEmail && trimmedUsername)

    let waiting = false

    async function save() {
        waiting = true

        const [, errorData] = await api.auth.updateMe({
            data: {
                email: trimmedEmail,
                username: trimmedUsername
            }
        })

        if (errorData) {
            toasts.add("error", errorData.message)
        } else {
            toasts.add("success", "Профиль успешно сохранён")
            goto($localePath(`/users/${String(id)}`))
        }

        waiting = false
    }
</script>

<svelte:head>
    <title>Редактирование профиля</title>
</svelte:head>

<Content.Center>
    <div class="flex flex-col gap-4 w-100 border-primary rounded-lg border text-center p-8">
        <div>
            <h1>Редактирование профиля</h1>
        </div>
        <div>
            <TextField
                label="Email"
                placeholder="Введите email..."
                disabled={waiting}
                bind:value={email}
            />
        </div>
        <div>
            <TextField
                label="Имя пользователя"
                placeholder="Введите имя пользователя..."
                disabled={waiting}
                bind:value={username}
            />
        </div>
        <div class="flex justify-between">
            <Button
                type="primary"
                loading={waiting}
                href={$localePath(`/users/${String(id)}`)}
                text
            >
                Назад
            </Button>
            <Button type="success" loading={waiting} disabled={disabledSave} on:click={save}>
                Сохранить
            </Button>
        </div>
    </div>
</Content.Center>
