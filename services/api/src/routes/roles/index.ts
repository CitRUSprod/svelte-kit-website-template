import { FastifyPluginCallback } from "fastify"
import { Permission } from "@prisma/client"
import * as schemas from "./schemas"
import * as handlers from "./handlers"

export const rolesRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get("/", {
        schema: {
            tags: ["roles"]
        },
        async handler(req, reply) {
            const data = await handlers.getRoles(app, {})
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemas.CreateRoleBody }>("/", {
        schema: {
            tags: ["roles"],
            body: schemas.createRoleBody
        },
        preHandler: app.auth(
            [app.verifyAuth, app.verifyConfirmedEmail, app.verifyPermission(Permission.CreateRole)],
            { relation: "and" }
        ),
        async handler(req, reply) {
            const data = await handlers.createRole(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.patch<{ Params: schemas.UpdateRoleParams; Body: schemas.UpdateRoleBody }>("/:id", {
        schema: {
            tags: ["roles"],
            params: schemas.updateRoleParams,
            body: schemas.updateRoleBody
        },
        preHandler: app.auth(
            [app.verifyAuth, app.verifyConfirmedEmail, app.verifyPermission(Permission.CreateRole)],
            { relation: "and" }
        ),
        async handler(req, reply) {
            const data = await handlers.updateRole(app, { params: req.params, body: req.body })
            await reply.sendData(data)
        }
    })

    app.delete<{ Params: schemas.DeleteRoleParams }>("/:id", {
        schema: {
            tags: ["roles"],
            params: schemas.deleteRoleParams
        },
        preHandler: app.auth(
            [app.verifyAuth, app.verifyConfirmedEmail, app.verifyPermission(Permission.CreateRole)],
            { relation: "and" }
        ),
        async handler(req, reply) {
            const data = await handlers.deleteRole(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    done()
}
