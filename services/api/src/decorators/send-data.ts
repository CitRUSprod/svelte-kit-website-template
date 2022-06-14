import { FastifyReply, FastifyPluginCallback } from "fastify"
import { ReplyData } from "$/types"

declare module "fastify" {
    interface FastifyReply {
        sendData(data: ReplyData): Promise<void>
    }
}

export const sendData: FastifyPluginCallback = (app, options, done) => {
    app.decorateReply<FastifyReply["sendData"]>("sendData", async function (this, data) {
        if (data.cookies) {
            for (const cookie of data.cookies) {
                if (cookie.value === undefined) {
                    this.clearCookie(cookie.name, cookie.options)
                } else {
                    this.setCookie(cookie.name, cookie.value, cookie.options)
                }
            }
        }

        await this.send(data.payload)
    })

    done()
}
