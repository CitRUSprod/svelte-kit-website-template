import { BadRequest } from "http-errors"
import { Prisma, Permission } from "@prisma/client"
import { getItemsPage, models } from "$/utils"
import { UserData, PartialUserData, RouteHandler } from "$/types"
import * as schemas from "./schemas"

export const getUsers: RouteHandler<{ query: schemas.GetUsersQuery }> = async (app, { query }) => {
    const page = await getItemsPage(query.page, query.perPage, async (skip, take) => {
        const where: Prisma.UserWhereInput = {
            email: { contains: query.email, mode: "insensitive" },
            username: { contains: query.username, mode: "insensitive" }
        }

        const totalItems = await app.prisma.user.count({ where })
        const users = await app.prisma.user.findMany({
            skip,
            take,
            where,
            orderBy: query.sort && { [query.sort]: query.order ?? "asc" },
            include: { role: true }
        })

        return { totalItems, items: users.map(models.user.dto) }
    })

    return { payload: page }
}

export const getUser: RouteHandler<{ userData: UserData; params: schemas.GetUserParams }> = async (
    app,
    { userData, params }
) => {
    const user: PartialUserData = await models.user.get(app, params.id)
    if (!userData.role.permissions.includes(Permission.GetOtherUserEmail)) delete user.email
    return { payload: models.user.dto(user) }
}

export const assignRoleToUser: RouteHandler<{ params: schemas.AssignRoleToUserParams }> = async (
    app,
    { params }
) => {
    const user = await models.user.get(app, params.id)
    const role = await models.role.get(app, params.roleId)

    if (user.roleId === params.roleId) {
        throw new BadRequest(`User with such ID is already "${role.name}"`)
    }

    const updatedUser = await app.prisma.user.update({
        where: { id: params.id },
        data: { roleId: params.roleId },
        include: { role: true }
    })

    return { payload: models.user.dto(updatedUser) }
}

export const banUser: RouteHandler<{ params: schemas.BanUserParams }> = async (app, { params }) => {
    const user = await models.user.get(app, params.id)
    if (user.banned) throw new BadRequest("User with such ID is already banned")

    const bannedUser = await app.prisma.user.update({
        where: { id: params.id },
        data: { roleId: 1, banned: true },
        include: { role: true }
    })

    return { payload: models.user.dto(bannedUser) }
}

export const unbanUser: RouteHandler<{ params: schemas.UnbanUserParams }> = async (
    app,
    { params }
) => {
    const user = await models.user.get(app, params.id)
    if (!user.banned) throw new BadRequest("User with such ID is not banned")

    const unbannedUser = await app.prisma.user.update({
        where: { id: params.id },
        data: { banned: false },
        include: { role: true }
    })

    return { payload: models.user.dto(unbannedUser) }
}
