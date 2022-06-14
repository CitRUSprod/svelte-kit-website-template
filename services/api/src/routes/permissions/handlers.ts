import { Permission } from "@prisma/client"
import { RouteHandler } from "$/types"

export const getPermissions: RouteHandler = async () => ({
    payload: { items: Object.keys(Permission) }
})
