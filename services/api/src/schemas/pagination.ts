import { Type } from "@sinclair/typebox"

export function pagination() {
    return Type.Object(
        {
            page: Type.Integer({ minimum: 1, default: 1 }),
            perPage: Type.Integer({ minimum: 1, maximum: 100, default: 10 })
        },
        { additionalProperties: false }
    )
}
