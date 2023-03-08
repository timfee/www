import "server-only"
import type { Auth, calendar_v3 } from "googleapis"
import { google } from "googleapis"

export default function createCalendarAppointment({
  start,
  end,
  summary,
  email,
  location,
  timeZone,
  requestId,
  name,
}: {
  start: string
  end: string
  summary: string
  email: string
  location: string
  timeZone: string
  requestId: string
  name: string
}): Promise<calendar_v3.Schema$Event | null> {
  return new Promise((resolve, reject) => {
    const auth: Auth.OAuth2Client = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET ?? "",
      redirectUri: process.env.GOOGLE_CALENDAR_REDIRECT_URL ?? "",
    })

    auth.setCredentials({
      access_token: process.env.GOOGLE_CALENDAR_ACCESS ?? "",
      refresh_token: process.env.GOOGLE_CALENDAR_REFRESH ?? "",
    })

    const calendar = google.calendar({ version: "v3", auth })

    calendar.events.insert(
      {
        calendarId: "primary",
        conferenceDataVersion: 1,
        sendNotifications: true,
        requestBody: {
          conferenceData: {
            createRequest: {
              requestId,
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
            },
          },
          start: {
            dateTime: start,
            timeZone,
          },
          end: {
            dateTime: end,
            timeZone,
          },
          summary,
          description: "Hello!",
          location,
          attendees: [
            {
              email,
              displayName: name,
            },
          ],
        },
      },
      (err, res) => {
        if (err) {
          reject(err)
          return
        }
        resolve(res?.data ?? null)
      }
    )
  })
}
