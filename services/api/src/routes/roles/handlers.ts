import { BadRequest } from "http-errors"
import { models } from "$/utils"
import { RouteHandler } from "$/types"
import * as schemas from "./schemas"

export const getRoles: RouteHandler = async app => {
    const roles = await app.prisma.role.findMany()
    return { payload: { items: roles.map(models.role.dto) } }
}

export const createRole: RouteHandler<{ body: schemas.CreateRoleBody }> = async (app, { body }) => {
    const role = await app.prisma.role.create({ data: body })
    return { payload: models.role.dto(role) }
}

export const updateRole: RouteHandler<{
    params: schemas.UpdateRoleParams
    body: schemas.UpdateRoleBody
}> = async (app, { params, body }) => {
    const role = await models.role.get(app, params.id)
    if (role.protected) throw new BadRequest("Role with such ID is protected")

    const updatedRole = await app.prisma.role.update({ where: { id: params.id }, data: body })
    return { payload: models.role.dto(updatedRole) }
}

export const deleteRole: RouteHandler<{ params: schemas.UpdateRoleParams }> = async (
    app,
    { params }
) => {
    const role = await models.role.get(app, params.id)
    if (role.protected) throw new BadRequest("Role with such ID is protected")

    const updatedRole = await app.prisma.role.delete({ where: { id: params.id } })
    return { payload: models.role.dto(updatedRole) }
}
