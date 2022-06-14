import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { Forbidden } from "http-errors"

declare module "fastify" {
    interface FastifyInstance {
        verifyNotBanned: FastifyAuthFunction
    }
}

export const verifyNotBanned: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyNotBanned"]>("verifyNotBanned", async req => {
        if (req.userData.banned) throw new Forbidden("Banned")
    })

    done()
}
