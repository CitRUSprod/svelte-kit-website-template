import { FastifyInstance } from "fastify"
import { BadRequest } from "http-errors"
import { User, Post } from "@prisma/client"
import { JsonObject } from "type-fest"

export function dto(post: Post & { author: User }): JsonObject {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        author: {
            id: post.author.id,
            username: post.author.username
        },
        creationDate: post.creationDate.toJSON(),
        editingDate: post.editingDate?.toJSON() ?? null
    }
}

export async function get(app: FastifyInstance, id: number) {
    const post = await app.prisma.post.findFirst({
        where: { id },
        include: { author: { include: { role: true } } }
    })
    if (!post) throw new BadRequest("Post with such ID was not found")
    return post
}
