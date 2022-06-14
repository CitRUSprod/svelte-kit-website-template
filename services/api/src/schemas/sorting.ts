import { Type, TValue } from "@sinclair/typebox"

const order = ["asc", "desc"] as const

export function sorting<T extends TValue>(field: T, ...fields: Array<T>) {
    return Type.Object(
        {
            sort: Type.Optional(
                Type.Union([Type.Literal(field), ...fields.map(f => Type.Literal(f))], {
                    enum: [field, ...fields],
                    transform: ["trim", "toEnumCase"]
                })
            ),
            order: Type.Optional(
                Type.Union(
                    order.map(o => Type.Literal(o)),
                    {
                        enum: [...order],
                        transform: ["trim", "toEnumCase"]
                    }
                )
            )
        },
        { additionalProperties: false }
    )
}
