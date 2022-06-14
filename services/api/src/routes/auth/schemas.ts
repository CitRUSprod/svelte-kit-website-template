import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

export const registerBody = Type.Strict(
    Type.Object(
        {
            email: schemas.models.user.email(),
            username: schemas.models.user.username(),
            password: schemas.models.user.password()
        },
        { additionalProperties: false }
    )
)

export type RegisterBody = Static<typeof registerBody>

export const loginBody = Type.Strict(
    Type.Object(
        {
            email: schemas.models.user.email(),
            password: schemas.models.user.password()
        },
        { additionalProperties: false }
    )
)

export type LoginBody = Static<typeof loginBody>

export const updateMeBody = Type.Strict(
    Type.Object(
        {
            email: Type.Optional(schemas.models.user.email()),
            username: Type.Optional(schemas.models.user.username())
        },
        { additionalProperties: false, minProperties: 1 }
    )
)

export type UpdateMeBody = Static<typeof updateMeBody>

export const logoutCookies = Type.Strict(
    Type.Object(
        {
            refreshToken: schemas.models.refreshToken.token()
        },
        { additionalProperties: false }
    )
)

export type LogoutCookies = Static<typeof logoutCookies>

export const refreshCookies = Type.Strict(
    Type.Object(
        {
            refreshToken: schemas.models.refreshToken.token()
        },
        { additionalProperties: false }
    )
)

export type RefreshCookies = Static<typeof refreshCookies>

export const confirmEmailParams = Type.Strict(
    Type.Object(
        {
            emailConfirmationToken: schemas.models.emailConfirmationToken.token()
        },
        { additionalProperties: false }
    )
)

export type ConfirmEmailParams = Static<typeof confirmEmailParams>

export const changePasswordBody = Type.Strict(
    Type.Object(
        {
            oldPassword: schemas.models.user.password(),
            newPassword: schemas.models.user.password()
        },
        { additionalProperties: false }
    )
)

export type ChangePasswordBody = Static<typeof changePasswordBody>

export const sendPasswordResetEmailBody = Type.Strict(
    Type.Object(
        {
            email: schemas.models.user.email()
        },
        { additionalProperties: false }
    )
)

export type SendPasswordResetEmailBody = Static<typeof sendPasswordResetEmailBody>

export const resetPasswordParams = Type.Strict(
    Type.Object(
        {
            passwordResetToken: schemas.models.passwordResetToken.token()
        },
        { additionalProperties: false }
    )
)

export type ResetPasswordParams = Static<typeof resetPasswordParams>

export const resetPasswordBody = Type.Strict(
    Type.Object(
        {
            newPassword: schemas.models.user.password()
        },
        { additionalProperties: false }
    )
)

export type ResetPasswordBody = Static<typeof resetPasswordBody>
