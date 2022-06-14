import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

export const getPostsQuery = Type.Strict(
    Type.Object(
        {
            ...schemas.pagination().properties,
            ...schemas.sorting("title", "creationDate").properties,
            title: Type.Optional(schemas.models.post.title())
        },
        { additionalProperties: false }
    )
)

export type GetPostsQuery = Static<typeof getPostsQuery>

export const createPostBody = Type.Strict(
    Type.Object(
        {
            title: schemas.models.post.title(),
            content: schemas.models.post.content()
        },
        { additionalProperties: false }
    )
)

export type CreatePostBody = Static<typeof createPostBody>

export const getPostParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type GetPostParams = Static<typeof getPostParams>

export const updatePostParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type UpdatePostParams = Static<typeof updatePostParams>

export const updatePostBody = Type.Strict(
    Type.Object(
        {
            title: Type.Optional(schemas.models.post.title()),
            content: Type.Optional(schemas.models.post.content())
        },
        { additionalProperties: false, minProperties: 1 }
    )
)

export type UpdatePostBody = Static<typeof updatePostBody>

export const deletePostParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type DeletePostParams = Static<typeof deletePostParams>
