import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { Forbidden } from "http-errors"
import { Permission } from "@prisma/client"
import { models } from "$/utils"

declare module "fastify" {
    interface FastifyInstance {
        verifyPermission(permission: Permission): FastifyAuthFunction
    }
}

export const verifyPermission: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyPermission"]>(
        "verifyPermission",
        permission => async req => {
            const { role } = await models.user.get(app, req.user.id)
            const allowed = role.permissions.includes(permission)
            if (!allowed) throw new Forbidden("No access")
        }
    )

    done()
}
