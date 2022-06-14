import { User, Role } from "@prisma/client"
import { SetOptional } from "type-fest"

export interface UserPayload {
    id: number
}

export type UserData = User & { role: Role }

export type PartialUserData = SetOptional<UserData, "email">
