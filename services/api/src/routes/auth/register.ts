import { FastifyPluginCallback } from "fastify"
import argon2 from "argon2"
import { User } from "$/db/entities"

interface RegistrationData {
    email: string
    username: string
    password: string
}

const route = ((app, opts, done) => {
    const usersRepository = app.orm.getRepository(User)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: RegistrationData }>("/", async (req, reply) => {
        const { email, username, password } = req.body

        const trimmedEmail = email.trim().toLowerCase()
        const trimmedUsername = username.trim()

        const userByEmail = await usersRepository.findOne({ email: trimmedEmail })

        if (userByEmail) {
            reply.code(400).send(new Error("A user with this email already exists"))
            return
        }

        const userByUsername = await usersRepository.findOne({ username: trimmedUsername })

        if (userByUsername) {
            reply.code(400).send(new Error("A user with this username already exists"))
            return
        }

        const passwordHash = await argon2.hash(password)

        const user = usersRepository.create({
            email: trimmedEmail,
            username: trimmedUsername,
            password: passwordHash
        })

        await usersRepository.save(user)

        reply.send()
    })

    done()
}) as FastifyPluginCallback

export default route
