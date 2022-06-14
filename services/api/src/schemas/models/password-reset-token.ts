import { Type } from "@sinclair/typebox"

export function token() {
    return Type.String({ minLength: 36, maxLength: 36, transform: ["trim"] })
}
