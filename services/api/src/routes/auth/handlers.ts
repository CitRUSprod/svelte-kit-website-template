import { BadRequest, InternalServerError } from "http-errors"
import argon2 from "argon2"
import { v4 as createUuid } from "uuid"
import { TokenTtl } from "$/enums"
import { env, sendEmail, models } from "$/utils"
import { UserData, ReplyCookie, RouteHandler } from "$/types"
import * as schemas from "./schemas"
import * as utils from "./utils"

export const register: RouteHandler<{ body: schemas.RegisterBody }> = async (app, { body }) => {
    const userByEmail = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (userByEmail) throw new BadRequest("User with such email already exists")

    const userByUsername = await app.prisma.user.findFirst({ where: { username: body.username } })
    if (userByUsername) throw new BadRequest("User with such username already exists")

    const password = await argon2.hash(body.password)
    await app.prisma.user.create({
        data: { email: body.email, username: body.username, password, registrationDate: new Date() }
    })

    return {}
}

export const login: RouteHandler<{ body: schemas.LoginBody }> = async (app, { body }) => {
    const user = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (!user) throw new BadRequest("User with such email was not found")

    const isCorrectPassword = await argon2.verify(user.password, body.password)
    if (!isCorrectPassword) throw new BadRequest("Incorrect password")

    await utils.deleteExpiredRefreshTokens(app)

    const tokens = utils.generateTokens(app, { id: user.id })
    await app.prisma.refreshToken.create({
        data: { token: tokens.refresh, userId: user.id, creationDate: new Date() }
    })

    return {
        cookies: [
            {
                name: "accessToken",
                value: tokens.access,
                options: { path: "/", maxAge: TokenTtl.Access }
            },
            {
                name: "refreshToken",
                value: tokens.refresh,
                options: { path: "/", maxAge: TokenTtl.Refresh, httpOnly: true }
            }
        ]
    }
}

export const getMe: RouteHandler<{ userData: UserData }> = async (app, { userData }) => ({
    payload: models.user.dto(userData)
})

export const updateMe: RouteHandler<{ userData: UserData; body: schemas.UpdateMeBody }> = async (
    app,
    { userData, body }
) => {
    const updatedUser = await app.prisma.user.update({
        where: { id: userData.id },
        data: {
            email: body.email,
            username: body.username,
            confirmedEmail: body.email === undefined ? undefined : false
        },
        include: { role: true }
    })

    return { payload: models.user.dto(updatedUser) }
}

export const logout: RouteHandler<{ cookies: schemas.LogoutCookies }> = async (
    app,
    { cookies }
) => {
    const localCookies: Array<ReplyCookie> = [
        { name: "accessToken", value: undefined, options: { path: "/" } },
        { name: "refreshToken", value: undefined, options: { path: "/" } }
    ]

    const refreshToken = await app.prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken }
    })

    if (!refreshToken) {
        utils.getPayload(app, cookies.refreshToken)

        return {
            cookies: localCookies,
            payload: new InternalServerError("Unexpected error")
        }
    }

    await app.prisma.refreshToken.delete({ where: { id: refreshToken.id } })

    return { cookies: localCookies }
}

export const refresh: RouteHandler<{ cookies: schemas.RefreshCookies }> = async (
    app,
    { cookies }
) => {
    const payload = utils.getPayload(app, cookies.refreshToken)

    await utils.deleteExpiredRefreshTokens(app)

    const refreshToken = await app.prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken }
    })
    if (!refreshToken) throw new InternalServerError("Refresh token not found")

    const tokens = utils.generateTokens(app, payload)
    await app.prisma.refreshToken.update({
        where: { id: refreshToken.id },
        data: { token: tokens.refresh, creationDate: new Date() }
    })

    return {
        cookies: [
            {
                name: "accessToken",
                value: tokens.access,
                options: {
                    path: "/",
                    maxAge: TokenTtl.Access
                }
            },
            {
                name: "refreshToken",
                value: tokens.refresh,
                options: {
                    path: "/",
                    maxAge: TokenTtl.Refresh,
                    httpOnly: true
                }
            }
        ]
    }
}

export const sendConfirmationEmail: RouteHandler<{ userData: UserData }> = async (
    app,
    { userData }
) => {
    if (userData.confirmedEmail) throw new BadRequest("Email is already confirmed")

    const token = createUuid()

    const emailConfirmationToken = await app.prisma.emailConfirmationToken.findFirst({
        where: { userId: userData.id }
    })

    if (emailConfirmationToken) {
        await app.prisma.emailConfirmationToken.update({
            where: { id: emailConfirmationToken.id },
            data: { token, creationDate: new Date() }
        })
    } else {
        await app.prisma.emailConfirmationToken.create({
            data: { token, userId: userData.id, creationDate: new Date() }
        })
    }

    const url = env.EMAIL_CONFIRMATION_URL.replace(/{token}/g, token)
    const subject = "Email confirmation"
    const message = `
        <div>
            <h3>Dear ${userData.username}</h3>
        </div>
        <div>
            <a href="${url}">Confirm Email</a>
        </div>
    `
    await sendEmail(userData.email, subject, message)

    return {}
}

export const confirmEmail: RouteHandler<{ params: schemas.ConfirmEmailParams }> = async (
    app,
    { params }
) => {
    await utils.deleteExpiredEmailConfirmationTokens(app)

    const emailConfirmationToken = await app.prisma.emailConfirmationToken.findFirst({
        where: { token: params.emailConfirmationToken }
    })
    if (!emailConfirmationToken) throw new BadRequest("Email confirmation token expired")

    await app.prisma.user.update({
        where: { id: emailConfirmationToken.userId },
        data: { confirmedEmail: true }
    })

    await app.prisma.emailConfirmationToken.delete({ where: { id: emailConfirmationToken.id } })

    return {}
}

export const changePassword: RouteHandler<{
    userData: UserData
    body: schemas.ChangePasswordBody
}> = async (app, { userData, body }) => {
    if (body.oldPassword === body.newPassword) throw new BadRequest("Old and new passwords match")

    const isCorrectPassword = await argon2.verify(userData.password, body.oldPassword)
    if (!isCorrectPassword) throw new BadRequest("Incorrect old password")

    const newPassword = await argon2.hash(body.newPassword)
    await app.prisma.user.update({
        where: { id: userData.id },
        data: { password: newPassword }
    })

    return {}
}

export const sendPasswordResetEmail: RouteHandler<{
    body: schemas.SendPasswordResetEmailBody
}> = async (app, { body }) => {
    const user = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (!user) throw new BadRequest("User with such email was not found")

    const token = createUuid()

    const passwordResetToken = await app.prisma.passwordResetToken.findFirst({
        where: { userId: user.id }
    })

    if (passwordResetToken) {
        await app.prisma.passwordResetToken.update({
            where: { id: passwordResetToken.id },
            data: { token, creationDate: new Date() }
        })
    } else {
        await app.prisma.passwordResetToken.create({
            data: { token, userId: user.id, creationDate: new Date() }
        })
    }

    const url = env.PASSWORD_RESET_URL.replace(/{token}/g, token)
    const subject = "Password reset"
    const message = `
        <div>
            <h3>Dear ${user.username}</h3>
        </div>
        <div>
            <a href="${url}">Reset password</a>
        </div>
    `
    await sendEmail(user.email, subject, message)

    return {}
}

export const resetPassword: RouteHandler<{
    params: schemas.ResetPasswordParams
    body: schemas.ResetPasswordBody
}> = async (app, { params, body }) => {
    await utils.deleteExpiredPasswordResetTokens(app)

    const passwordResetToken = await app.prisma.passwordResetToken.findFirst({
        where: { token: params.passwordResetToken }
    })
    if (!passwordResetToken) throw new BadRequest("Password reset token expired")

    const newPassword = await argon2.hash(body.newPassword)
    await app.prisma.user.update({
        where: { id: passwordResetToken.userId },
        data: { password: newPassword }
    })

    await app.prisma.passwordResetToken.delete({ where: { id: passwordResetToken.id } })

    return {}
}
