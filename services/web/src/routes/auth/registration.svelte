<script lang="ts" context="module">
    import { fetchy, HttpError, vld, createRedirectResponse } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session } from "$lib/types"

    export const load: Load<{ session: Session }> = ({ session }) => {
        if (session.user) {
            return createRedirectResponse("/")
        }

        return {}
    }
</script>

<script lang="ts">
    import { Button } from "$lib/components"

    import * as yup from "yup"
    import { goto } from "$app/navigation"
    import { toasts } from "$lib/stores"

    let email = ""
    let username = ""
    let password = ""
    let passwordConfirmation = ""

    let waiting = false

    $: validators = {
        completedRegistrationForm:
            vld.isEqualT(password, passwordConfirmation) &&
            yup.string().trim().lowercase().max(64).email().required().isValidSync(email) &&
            yup
                .string()
                .trim()
                .min(3)
                .max(32)
                .test(v => vld.isWordChars(v!))
                .required()
                .isValidSync(username) &&
            yup.string().trim().min(8).required().isValidSync(password)
    }

    async function register() {
        waiting = true

        try {
            await fetchy.post("/api/auth/registration", {
                json: {
                    email: email.trim().toLowerCase(),
                    username: username.trim(),
                    password: password.trim()
                }
            })
            toasts.add("success", "You have successfully registered")
            goto("/auth/login")
        } catch (err: unknown) {
            if (err instanceof HttpError) {
                const data = await err.response.json()
                toasts.add("error", data.message)
            } else {
                console.error(err)
            }
        }

        waiting = false
    }

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && validators.completedRegistrationForm) {
            await register()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }
</script>

<svelte:head>
    <title>Registration</title>
</svelte:head>

<div class="flex h-full justify-center items-center">
    <div class="border-primary rounded-lg border-2 text-center p-8 w-80">
        <h1 class="text-4xl">Registration</h1>
        <div class="mt-4">
            <input
                class="input input-bordered w-full"
                placeholder="Email"
                disabled={waiting}
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-2">
            <input
                class="input input-bordered w-full"
                placeholder="Username"
                disabled={waiting}
                bind:value={username}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-2">
            <input
                class="input input-bordered w-full"
                placeholder="Password"
                type="password"
                disabled={waiting}
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-2">
            <input
                class="input input-bordered w-full"
                placeholder="Password Confirmation"
                type="password"
                disabled={waiting}
                bind:value={passwordConfirmation}
                on:keypress={onEnter}
            />
        </div>
        <div class="flex mt-4 justify-between">
            <Button class="btn-ghost" href="/auth/login">Login</Button>
            <Button
                class="btn-primary"
                loading={waiting}
                disabled={!validators.completedRegistrationForm}
                on:click={register}
            >
                Register
            </Button>
        </div>
    </div>
</div>
