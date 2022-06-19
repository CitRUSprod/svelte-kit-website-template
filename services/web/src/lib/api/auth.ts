import { fetchy } from "$lib/utils"

import type { ApiOptions, ApiResponse, User } from "$lib/types"

interface RegisterData {
    email: string
    username: string
    password: string
}

export async function register(options: ApiOptions<RegisterData>): Promise<ApiResponse<undefined>> {
    const [, errorData, info] = await fetchy.wrapped.post("/api/auth/register", {
        headers: options.headers,
        json: {
            email: options.data.email,
            username: options.data.username,
            password: options.data.password
        }
    })
    return [undefined, errorData, info]
}

interface LoginData {
    email: string
    password: string
}

export async function login(options: ApiOptions<LoginData>): Promise<ApiResponse<undefined>> {
    const [, errorData, info] = await fetchy.wrapped.post("/api/auth/login", {
        headers: options.headers,
        json: {
            email: options.data.email,
            password: options.data.password
        }
    })
    return [undefined, errorData, info]
}

export async function getMe(options: ApiOptions = {}): Promise<ApiResponse<User>> {
    const [data, errorData, info] = await fetchy.wrapped.get("/api/auth/me", {
        headers: options.headers
    })
    return [data as any, errorData, info]
}

export async function logout(options: ApiOptions = {}): Promise<ApiResponse<undefined>> {
    const [, errorData, info] = await fetchy.wrapped.post("/api/auth/logout", {
        headers: options.headers
    })
    return [undefined, errorData, info]
}
