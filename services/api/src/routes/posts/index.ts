import { FastifyPluginCallback } from "fastify"
import * as schemas from "./schemas"
import * as handlers from "./handlers"

export const postsRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get<{ Querystring: schemas.GetPostsQuery }>("/", {
        schema: {
            tags: ["posts"],
            querystring: schemas.getPostsQuery
        },
        async handler(req, reply) {
            const data = await handlers.getPosts(app, { query: req.query })
            await reply.sendData(data)
        }
    })

    app.post<{ Body: schemas.CreatePostBody }>("/", {
        schema: {
            tags: ["posts"],
            body: schemas.createPostBody
        },
        preHandler: app.auth([app.verifyAuth, app.verifyConfirmedEmail, app.verifyNotBanned], {
            relation: "and"
        }),
        async handler(req, reply) {
            const data = await handlers.createPost(app, { userData: req.userData, body: req.body })
            await reply.sendData(data)
        }
    })

    app.get<{ Params: schemas.GetPostParams }>("/:id", {
        schema: {
            tags: ["posts"],
            params: schemas.getPostParams
        },
        async handler(req, reply) {
            const data = await handlers.getPost(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    app.patch<{ Params: schemas.UpdatePostParams; Body: schemas.UpdatePostBody }>("/:id", {
        schema: {
            tags: ["posts"],
            params: schemas.updatePostParams,
            body: schemas.updatePostBody
        },
        preHandler: app.auth([app.verifyAuth, app.verifyConfirmedEmail, app.verifyNotBanned], {
            relation: "and"
        }),
        async handler(req, reply) {
            const data = await handlers.updatePost(app, {
                userData: req.userData,
                params: req.params,
                body: req.body
            })
            await reply.sendData(data)
        }
    })

    app.delete<{ Params: schemas.DeletePostParams }>("/:id", {
        schema: {
            tags: ["posts"],
            params: schemas.deletePostParams
        },
        preHandler: app.auth([app.verifyAuth, app.verifyConfirmedEmail, app.verifyNotBanned], {
            relation: "and"
        }),
        async handler(req, reply) {
            const data = await handlers.deletePost(app, {
                userData: req.userData,
                params: req.params
            })
            await reply.sendData(data)
        }
    })

    done()
}
