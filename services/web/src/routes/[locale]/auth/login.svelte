<script lang="ts" context="module">
    import { createRedirectResponse } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"

    export const load: Load = ({ session, stuff }) => {
        if (session.user) return createRedirectResponse(`/${stuff.locale!}`)
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

    let email = ""
    let password = ""

    $: trimmedEmail = email.trim()
    $: trimmedPassword = password.trim()

    $: disabledLogin = !(trimmedEmail && trimmedPassword)

    let waiting = false

    async function login() {
        waiting = true

        const [, loginErrorData] = await api.auth.login({
            data: {
                email: trimmedEmail,
                password: trimmedPassword
            }
        })

        if (loginErrorData) {
            toasts.add("error", loginErrorData.message)
        } else {
            const [user, getMeErrorData] = await api.auth.getMe()

            if (getMeErrorData) {
                toasts.add("error", getMeErrorData.message)
            } else {
                $session.user = user
                toasts.add("success", "You have successfully logged in")
                goto($localePath("/"))
            }
        }

        waiting = false
    }
</script>

<svelte:head>
    <title>Вход</title>
</svelte:head>

<Content.Center>
    <div class="flex flex-col gap-4 w-100 border-primary rounded-lg border text-center p-8">
        <div>
            <h1>Вход</h1>
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
                label="Пароль"
                placeholder="Введите пароль..."
                valueType="password"
                disabled={waiting}
                bind:value={password}
            />
        </div>
        <div class="flex justify-between">
            <Button type="primary" loading={waiting} href={$localePath("/auth/registration")} text>
                Регистрация
            </Button>
            <Button type="success" loading={waiting} disabled={disabledLogin} on:click={login}>
                Войти
            </Button>
        </div>
    </div>
</Content.Center>
