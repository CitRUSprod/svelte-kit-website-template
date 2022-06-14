import nodemailer from "nodemailer"
import { env } from "./env"

const mailer = nodemailer.createTransport(
    {
        host: env.MAILER_HOST,
        port: env.MAILER_PORT,
        secure: env.MAILER_PORT === 465,
        auth: {
            user: env.MAILER_EMAIL,
            pass: env.MAILER_PASSWORD
        }
    },
    {
        from: `${env.MAILER_NAME} <${env.MAILER_EMAIL}>`
    }
)

export async function sendEmail(to: string, subject: string, message: string) {
    await mailer.sendMail({ to, subject, html: message })
}
