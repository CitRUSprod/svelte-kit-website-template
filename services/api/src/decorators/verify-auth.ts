import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { InternalServerError } from "http-errors"
import { UserPayload, UserData } from "$/types"

declare module "fastify" {
    interface FastifyInstance {
        verifyAuth: FastifyAuthFunction
    }

    interface FastifyRequest {
        userData: UserData
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: UserPayload
    }
}

export const verifyAuth: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyAuth"]>("verifyAuth", async req => {
        const payload = await req.jwtVerify<UserPayload>()
        const user = await app.prisma.user.findFirst({
            where: { id: payload.id },
            include: { role: true }
        })
        if (!user) throw new InternalServerError("User with such ID was not found")
        req.userData = user
    })

    done()
}
