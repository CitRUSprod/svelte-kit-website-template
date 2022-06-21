<script lang="ts" context="module">
    import * as api from "$lib/api"
    import { dt, createRedirectResponse } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"

    export const load: Load = async ({ session, params, fetch: f }) => {
        if (!session.user) return createRedirectResponse(`/${params.locale}`)

        const [user, errorData] = await api.users.getUser({
            fetchy: { fetch: f },
            data: { id: parseInt(params.id) }
        })

        if (errorData) {
            return createRedirectResponse(`/${params.locale}`)
        } else {
            return { props: { user } }
        }
    }
</script>

<script lang="ts">
    import { Content, Button } from "$lib/components"

    import { localePath } from "$lib/locales"

    import type { User } from "$lib/types"

    export let user: User
</script>

<svelte:head>
    <title>Профиль</title>
</svelte:head>

<Content.Default title="Профиль">
    <div class="flex flex-col gap-2">
        <div><b>Username:</b> {user.username}</div>
        <div><b>Email:</b> {user.email}</div>
        <div><b>Role:</b> {user.role.name}</div>
        <div><b>Confirmed email:</b> {user.confirmedEmail ? "Yes" : "No"}</div>
        <div><b>Banned:</b> {user.banned ? "Yes" : "No"}</div>
        <div><b>Role:</b> {user.role.name}</div>
        <div><b>Registration date:</b> {dt.getFullDateAndTime(user.registrationDate)}</div>
        <div>
            <Button type="warning" href={$localePath("/users/edit")}>Редактировать</Button>
        </div>
    </div>
</Content.Default>
