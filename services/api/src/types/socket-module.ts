import { Socket } from "socket.io"
import { User } from "@prisma/client"

export type SocketModule = (socket: Socket, user: User | null) => void
