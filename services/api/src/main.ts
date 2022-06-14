import fastify from "fastify"
import swagger from "@fastify/swagger"
import jwt from "@fastify/jwt"
import cookie from "@fastify/cookie"
import auth from "@fastify/auth"
import socketIo from "fastify-socket.io"
import { decorators } from "$/decorators"
import { routes } from "$/routes"
import { initSockets } from "$/sockets"
import { env, ajv, normalizeAjvErrors } from "$/utils"

const port = 6702

const app = fastify()

app.setValidatorCompiler(({ schema }) => ajv.compile(schema) as any)
app.setSchemaErrorFormatter((errors, scope) => normalizeAjvErrors(errors as any, scope))

if (env.ENABLE_DOCS) {
    app.register(swagger, {
        routePrefix: "/docs",
        swagger: {
            info: {
                title: "Fastify Starter API",
                version: ""
            },
            host: `localhost:${port}`
        },
        exposeRoute: true
    })
}

app.register(jwt, { secret: env.JWT_SECRET, cookie: { cookieName: "accessToken", signed: false } })
    .register(cookie)
    .register(auth)
    .register(socketIo)

app.register(decorators).register(routes)

app.listen(port, "0.0.0.0", err => {
    if (err) throw err
    initSockets(app)
    console.log(`Running on http://localhost:${port}`)
})
