import { PrismaClient } from "@prisma/client"
import argon2 from "argon2"

const client = new PrismaClient()

client.$connect().then(async () => {
    await client.role.createMany({
        data: [
            { name: "user", protected: true },
            { name: "admin", protected: true }
        ]
    })

    const password = await argon2.hash("12345678")
    await client.user.create({
        data: {
            email: "admin@example.com",
            username: "Admin",
            password,
            roleId: 2,
            confirmedEmail: true,
            registrationDate: new Date()
        }
    })
})
