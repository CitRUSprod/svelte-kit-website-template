import { fetchy } from "$lib/utils"

import type { ApiOptions, ApiResponse, User } from "$lib/types"

interface RegisterData {
    email: string
    username: string
    password: string
}

export async function register(options: ApiOptions<RegisterData>): Promise<ApiResponse<undefined>> {
    const [, errorData, info] = await fetchy.wrapped.post("/api/auth/register", {
        ...options.fetchy,
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
        ...options.fetchy,
        json: {
            email: options.data.email,
            password: options.data.password
        }
    })
    return [undefined, errorData, info]
}

export async function getMe(options: ApiOptions = {}): Promise<ApiResponse<User>> {
    const [data, errorData, info] = await fetchy.wrapped.get("/api/auth/me", options.fetchy)
    return [data as any, errorData, info]
}

interface UpdateMeData {
    email?: string
    username?: string
}

export async function updateMe(options: ApiOptions<UpdateMeData>): Promise<ApiResponse<User>> {
    const [data, errorData, info] = await fetchy.wrapped.patch("/api/auth/me", {
        ...options.fetchy,
        json: {
            email: options.data.email,
            username: options.data.username
        }
    })
    return [data as any, errorData, info]
}

export async function logout(options: ApiOptions = {}): Promise<ApiResponse<undefined>> {
    const [, errorData, info] = await fetchy.wrapped.post("/api/auth/logout", options.fetchy)
    return [undefined, errorData, info]
}
