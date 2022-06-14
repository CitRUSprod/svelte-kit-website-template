import path from "path"
import { config } from "dotenv"
import { expand } from "dotenv-expand"

const env = config({
    path: path.join(__dirname, "../../../.env")
})

expand(env)
