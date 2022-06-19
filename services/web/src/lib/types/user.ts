import type { Role } from "./role"

export interface User {
    id: string
    email: string
    username: string
    role: Role
    confirmedEmail: boolean
    banned: boolean
    registrationDate: string
}
