import { CookieSerializeOptions } from "@fastify/cookie"
import { JsonObject } from "type-fest"

export interface ReplyCookie {
    name: string
    value: string | undefined
    options?: CookieSerializeOptions
}

export interface ReplyData {
    payload?: JsonObject
    cookies?: Array<ReplyCookie>
}
