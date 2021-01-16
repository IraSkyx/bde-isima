import nodemailer from "nodemailer"

import { compileView } from "./views"

type MailParams = {
  subject: string
  to: string
  view: string
  variables: object
}

export const mail = {
  send: async ({ subject, to, view, variables }: MailParams) => {
    const params = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    }
    console.log(params)
    const mailTransport = nodemailer.createTransport(params)

    try {
      return mailTransport.sendMail({
        to,
        from: process.env.SMTP_FROM,
        subject,
        html: compileView({
          subject,
          view,
          variables,
        }),
      })
    } catch (e) {
      console.error(e?.response?.body || e)
    }
  },
}