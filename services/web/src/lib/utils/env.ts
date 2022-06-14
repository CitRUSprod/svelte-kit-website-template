import { Type } from "@sinclair/typebox"
import { parseByAjvSchema } from "./ajv"

const schema = Type.Strict(
    Type.Object(
        {
            VITE_TITLE: Type.String({ minLength: 1, transform: ["trim"] })
        },
        { additionalProperties: false }
    )
)

export const env = parseByAjvSchema(schema, import.meta.env, "env")
