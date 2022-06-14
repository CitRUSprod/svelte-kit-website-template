import { FastifyInstance } from "fastify"
import { Unauthorized } from "http-errors"
import { TokenTtl } from "$/enums"
import { UserPayload } from "$/types"

interface PayloadWithTimestamps extends UserPayload {
    iat: string
    exp: string
}

export function generateTokens(app: FastifyInstance, payload: UserPayload) {
    const access = app.jwt.sign(payload, { expiresIn: TokenTtl.Access })
    const refresh = app.jwt.sign(payload, { expiresIn: TokenTtl.Refresh })
    return { access, refresh }
}

export function getPayload(app: FastifyInstance, token: string): UserPayload {
    try {
        const { iat, exp, ...payload } = app.jwt.verify<PayloadWithTimestamps>(token)
        return payload
    } catch (err: any) {
        throw new Unauthorized(err.message)
    }
}

export async function deleteExpiredRefreshTokens(app: FastifyInstance) {
    await app.prisma.refreshToken.deleteMany({
        where: { creationDate: { lt: new Date(Date.now() - TokenTtl.Refresh * 1000) } }
    })
}

export async function deleteExpiredEmailConfirmationTokens(app: FastifyInstance) {
    await app.prisma.emailConfirmationToken.deleteMany({
        where: { creationDate: { lt: new Date(Date.now() - TokenTtl.EmailConfirmation * 1000) } }
    })
}

export async function deleteExpiredPasswordResetTokens(app: FastifyInstance) {
    await app.prisma.passwordResetToken.deleteMany({
        where: { creationDate: { lt: new Date(Date.now() - TokenTtl.PasswordReset * 1000) } }
    })
}
