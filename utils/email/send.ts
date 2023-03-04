import type { SendMailOptions } from "nodemailer"
import { createTransport } from "nodemailer"

const sendMail = async ({
  to,
  subject,
  body,
}: {
  to: string
  subject: string
  body: string
}) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
    },
  })

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return transporter.sendMail({
    from: process.env.GOOGLE_CALENDAR_OWNER,
    to,
    subject,
    text: body,
    auth: {
      user: process.env.GOOGLE_CALENDAR_OWNER,
      refreshToken: process.env.GOOGLE_CALENDAR_REFRESH,
      accessToken: process.env.GOOGLE_CALENDAR_ACCESS,
    },
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  } as SendMailOptions & { auth: { user: string; refreshToken: string; accessToken: string } })
}

export default sendMail
