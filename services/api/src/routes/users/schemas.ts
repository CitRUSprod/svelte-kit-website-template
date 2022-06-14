import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

export const getUsersQuery = Type.Strict(
    Type.Object(
        {
            ...schemas.pagination().properties,
            ...schemas.sorting("email", "username", "registrationDate").properties,
            email: Type.Optional(schemas.models.user.email()),
            username: Type.Optional(schemas.models.user.username())
        },
        { additionalProperties: false }
    )
)

export type GetUsersQuery = Static<typeof getUsersQuery>

export const getUserParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type GetUserParams = Static<typeof getUserParams>

export const assignRoleToUserParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id(),
            roleId: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type AssignRoleToUserParams = Static<typeof assignRoleToUserParams>

export const banUserParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type BanUserParams = Static<typeof banUserParams>

export const unbanUserParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type UnbanUserParams = Static<typeof unbanUserParams>
