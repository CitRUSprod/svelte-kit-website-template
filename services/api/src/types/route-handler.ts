import { FastifyInstance } from "fastify"
import { UserData } from "./user"
import { ReplyData } from "./reply-data"

export interface RequestData {
    userData?: UserData
    cookies?: Record<string, string>
    params?: Record<string, string | number>
    query?: Record<string, unknown>
    body?: Record<string, unknown>
}

export type RouteHandler<T extends RequestData = object> = (
    app: FastifyInstance,
    requestData: T
) => Promise<ReplyData>
