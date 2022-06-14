import { Permission } from "@prisma/client"
import { Type } from "@sinclair/typebox"

export function name() {
    return Type.String({ minLength: 1, transform: ["trim", "toLowerCase"] })
}

export function permissions() {
    return Type.Array(
        Type.Enum(Permission, { enum: Object.keys(Permission), transform: ["trim", "toEnumCase"] }),
        { uniqueItems: true }
    )
}
