import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

export const createRoleBody = Type.Strict(
    Type.Object(
        {
            name: schemas.models.role.name(),
            permissions: schemas.models.role.permissions()
        },
        { additionalProperties: false }
    )
)

export type CreateRoleBody = Static<typeof createRoleBody>

export const updateRoleParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type UpdateRoleParams = Static<typeof updateRoleParams>

export const updateRoleBody = Type.Strict(
    Type.Object(
        {
            name: Type.Optional(schemas.models.role.name()),
            permissions: Type.Optional(schemas.models.role.permissions())
        },
        { additionalProperties: false, minProperties: 1 }
    )
)

export type UpdateRoleBody = Static<typeof updateRoleBody>

export const deleteRoleParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type DeleteRoleParams = Static<typeof deleteRoleParams>
