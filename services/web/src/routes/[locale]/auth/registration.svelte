<script lang="ts" context="module">
    import { createRedirectResponse } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"

    export const load: Load = ({ session, params }) => {
        if (session.user) return createRedirectResponse(`/${params.locale}`)
        return {}
    }
</script>

<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { goto } from "$app/navigation"
    import { toasts } from "$lib/stores"
    import { localePath } from "$lib/locales"
    import * as api from "$lib/api"

    let email = ""
    let username = ""
    let password = ""
    let passwordConfirmation = ""

    $: trimmedEmail = email.trim()
    $: trimmedUsername = username.trim()
    $: trimmedPassword = password.trim()
    $: trimmedPasswordConfirmation = passwordConfirmation.trim()

    $: disabledRegistration = !(
        trimmedEmail &&
        trimmedPassword &&
        trimmedPassword === trimmedPasswordConfirmation
    )

    let waiting = false

    async function register() {
        waiting = true

        const [, errorData] = await api.auth.register({
            data: {
                email: trimmedEmail,
                username: trimmedUsername,
                password: trimmedPassword
            }
        })

        if (errorData) {
            toasts.add("error", errorData.message)
        } else {
            toasts.add("success", "You have successfully registered")
            goto($localePath("/auth/login"))
        }

        waiting = false
    }
</script>

<svelte:head>
    <title>Регистрация</title>
</svelte:head>

<Content.Center>
    <div class="flex flex-col gap-4 w-100 border-primary rounded-lg border text-center p-8">
        <div>
            <h1>Регистрация</h1>
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
        <div>
            <TextField
                label="Пароль"
                placeholder="Введите пароль..."
                valueType="password"
                disabled={waiting}
                bind:value={password}
            />
        </div>
        <div>
            <TextField
                label="Подтверждение пароля"
                placeholder="Введите пароль..."
                valueType="password"
                disabled={waiting}
                bind:value={passwordConfirmation}
            />
        </div>
        <div class="flex justify-between">
            <Button type="primary" loading={waiting} href={$localePath("/auth/login")} text>
                Вход
            </Button>
            <Button
                type="success"
                loading={waiting}
                disabled={disabledRegistration}
                on:click={register}
            >
                Зарегистрироваться
            </Button>
        </div>
    </div>
</Content.Center>
