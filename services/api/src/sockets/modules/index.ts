import { SocketModule } from "$/types"
import { globalChat } from "./global-chat"

export const initModules: SocketModule = (socket, user) => {
    globalChat(socket, user)
}
