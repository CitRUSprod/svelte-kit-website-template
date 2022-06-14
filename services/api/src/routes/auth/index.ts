import { FastifyPluginCallback } from "fastify"
import { Unauthorized } from "http-errors"
import { parseByAjvSchema } from "$/utils"
import * as schemas from "./schemas"
import * as handlers from "./handlers"

export const authRoutes: FastifyPluginCallback = (app, options, done) => {
    app.post<{ Body: schemas.RegisterBody }>("/register", {
        schema: {
            tags: ["auth"],
            body: schemas.registerBody
        },
        async handler(req, reply) {
            const data = await handlers.register(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemas.LoginBody }>("/login", {
        schema: {
            tags: ["auth"],
            body: schemas.loginBody
        },
        async handler(req, reply) {
            const data = await handlers.login(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.get("/me", {
        schema: {
            tags: ["auth"]
        },
        preHandler: app.auth([app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.getMe(app, { userData: req.userData })
            await reply.sendData(data)
        }
    })

    app.patch<{ Body: schemas.UpdateMeBody }>("/me", {
        schema: {
            tags: ["auth"],
            body: schemas.updateMeBody
        },
        preHandler: app.auth([app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.updateMe(app, { userData: req.userData, body: req.body })
            await reply.sendData(data)
        }
    })

    app.post("/logout", {
        schema: {
            tags: ["auth"]
        },
        async handler(req, reply) {
            let cookies: schemas.LogoutCookies

            try {
                cookies = parseByAjvSchema(schemas.logoutCookies, req.cookies, "cookies")
            } catch (err: any) {
                throw new Unauthorized(err.message)
            }

            const data = await handlers.logout(app, { cookies })
            await reply.sendData(data)
        }
    })

    app.post("/refresh", {
        schema: {
            tags: ["auth"]
        },
        async handler(req, reply) {
            let cookies: schemas.RefreshCookies

            try {
                cookies = parseByAjvSchema(schemas.refreshCookies, req.cookies, "cookies")
            } catch (err: any) {
                throw new Unauthorized(err.message)
            }

            const data = await handlers.refresh(app, { cookies })
            await reply.sendData(data)
        }
    })

    app.post("/email/confirm", {
        schema: {
            tags: ["auth"]
        },
        preHandler: app.auth([app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.sendConfirmationEmail(app, { userData: req.userData })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: schemas.ConfirmEmailParams }>("/email/confirm/:emailConfirmationToken", {
        schema: {
            tags: ["auth"],
            params: schemas.confirmEmailParams
        },
        async handler(req, reply) {
            const data = await handlers.confirmEmail(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemas.ChangePasswordBody }>("/password/change", {
        schema: {
            tags: ["auth"],
            body: schemas.changePasswordBody
        },
        preHandler: app.auth([app.verifyAuth]),
        async handler(req, reply) {
            const data = await handlers.changePassword(app, {
                userData: req.userData,
                body: req.body
            })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemas.SendPasswordResetEmailBody }>("/password/reset", {
        schema: {
            tags: ["auth"],
            body: schemas.sendPasswordResetEmailBody
        },
        async handler(req, reply) {
            const data = await handlers.sendPasswordResetEmail(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.post<{ Params: schemas.ResetPasswordParams; Body: schemas.ResetPasswordBody }>(
        "/password/reset/:passwordResetToken",
        {
            schema: {
                tags: ["auth"],
                params: schemas.resetPasswordParams,
                body: schemas.resetPasswordBody
            },
            async handler(req, reply) {
                const data = await handlers.resetPassword(app, {
                    params: req.params,
                    body: req.body
                })
                await reply.sendData(data)
            }
        }
    )

    done()
}
