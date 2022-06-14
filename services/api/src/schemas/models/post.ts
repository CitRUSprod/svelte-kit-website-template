import { Type } from "@sinclair/typebox"

export function title() {
    return Type.String({ minLength: 1, maxLength: 100, transform: ["trim"] })
}

export function content() {
    return Type.String({ minLength: 1, transform: ["trim"] })
}
