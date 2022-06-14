import { Type } from "@sinclair/typebox"

export function token() {
    return Type.String({ minLength: 1, transform: ["trim"] })
}
