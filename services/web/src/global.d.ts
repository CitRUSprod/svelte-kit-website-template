/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

type User = import("$lib/types").User

declare namespace App {
    interface Locals {
        user?: Readonly<User>
    }

    interface Session {
        user: Readonly<User> | null
    }

    interface Stuff {
        locale: string
        route: string
    }
}
