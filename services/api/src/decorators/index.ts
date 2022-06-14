import { FastifyPluginCallback } from "fastify"
import fp from "fastify-plugin"
import { prisma } from "./prisma"
import { sendData } from "./send-data"
import { verifyAuth } from "./verify-auth"
import { verifyPermission } from "./verify-permission"
import { verifyConfirmedEmail } from "./verify-confirmed-email"
import { verifyNotBanned } from "./verify-not-banned"

function changeScope(fn: FastifyPluginCallback) {
    return fp(fn)
}

export const decorators = changeScope((app, options, done) => {
    app.register(changeScope(prisma))
        .register(changeScope(sendData))
        .register(changeScope(verifyAuth))
        .register(changeScope(verifyPermission))
        .register(changeScope(verifyConfirmedEmail))
        .register(changeScope(verifyNotBanned))

    done()
})
