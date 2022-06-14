import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { PrismaClient, Prisma, Permission, Role } from "@prisma/client"

declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

const actionsWithOne: Array<Prisma.PrismaAction> = [
    "findFirst",
    "findUnique",
    "create",
    "update",
    "upsert",
    "delete"
]
const actionsWithMany: Array<Prisma.PrismaAction> = [
    "findMany",
    "createMany",
    "updateMany",
    "deleteMany"
]

function setAllPermissionsForAdmin(role?: Role) {
    if (role?.name === "admin") {
        role.permissions = Object.keys(Permission) as Array<Permission>
    }
}

export const prisma: FastifyPluginCallback = (app, options, done) => {
    const client = new PrismaClient()

    client.$use(async (params, next) => {
        const result = await next(params)

        if (params.model === Prisma.ModelName.Role) {
            if (actionsWithOne.includes(params.action)) {
                const role = result
                setAllPermissionsForAdmin(role)
            } else if (actionsWithMany.includes(params.action)) {
                const roles = result

                for (const role of roles) {
                    setAllPermissionsForAdmin(role)
                }
            }
        } else if (params.model === Prisma.ModelName.User) {
            if (actionsWithOne.includes(params.action)) {
                const user = result
                setAllPermissionsForAdmin(user?.role)
            } else if (actionsWithMany.includes(params.action)) {
                const users = result

                for (const user of users) {
                    setAllPermissionsForAdmin(user?.role)
                }
            }
        } else if (params.model === Prisma.ModelName.Post) {
            if (actionsWithOne.includes(params.action)) {
                const post = result
                setAllPermissionsForAdmin(post?.author?.role)
            } else if (actionsWithMany.includes(params.action)) {
                const posts = result

                for (const post of posts) {
                    setAllPermissionsForAdmin(post?.author?.role)
                }
            }
        }

        return result
    })

    client.$connect().then(() => {
        app.decorate<FastifyInstance["prisma"]>("prisma", client)

        done()
    })
}
