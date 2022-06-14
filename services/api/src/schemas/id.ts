import { Type } from "@sinclair/typebox"

export function id() {
    return Type.Integer({ minimum: 1 })
}
