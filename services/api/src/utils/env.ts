import { Type } from "@sinclair/typebox"
import { parseByAjvSchema } from "./ajv"

const schema = Type.Strict(
    Type.Object(
        {
            POSTGRES_URL: Type.String({ transform: ["trim"] }),
            JWT_SECRET: Type.String({ minLength: 6, transform: ["trim"] }),
            MAILER_HOST: Type.String({ format: "hostname", transform: ["trim"] }),
            MAILER_PORT: Type.Integer({ minimum: 1 }),
            MAILER_EMAIL: Type.String({ format: "email", transform: ["trim"] }),
            MAILER_PASSWORD: Type.String({ minLength: 1, transform: ["trim"] }),
            MAILER_NAME: Type.String({ minLength: 1, transform: ["trim"] }),
            EMAIL_CONFIRMATION_URL: Type.String({ format: "uri-template", transform: ["trim"] }),
            PASSWORD_RESET_URL: Type.String({ format: "uri-template", transform: ["trim"] }),
            ENABLE_DOCS: Type.Boolean()
        },
        { additionalProperties: false }
    )
)

export const env = parseByAjvSchema(schema, process.env, "env")
