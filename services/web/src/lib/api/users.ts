import { fetchy } from "$lib/utils"

import type { ApiOptions, ApiResponse, User } from "$lib/types"

interface GetUserData {
    id: number
}

export async function getUser(options: ApiOptions<GetUserData>): Promise<ApiResponse<User>> {
    const [user, errorData, info] = await fetchy.wrapped.get(
        `/api/users/${options.data.id}`,
        options.fetchy
    )
    return [user as any, errorData, info]
}
