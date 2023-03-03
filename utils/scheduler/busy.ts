import "server-only"
import { type Auth, google } from "googleapis"

import type { DateInterval } from "./types"

export type GetFreeBusyProps = {
  start: Date
  end: Date
}

export const getFreeBusyData = async ({
  start,
  end,
}: DateInterval): Promise<DateInterval[]> => {
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

  // get busyData in UTC time,
  // see https://developers.google.com/calendar/v3/reference/freebusy/query
  const busyData = await calendar.freebusy.query({
    requestBody: {
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      items: [{ id: "primary" }],
    },
  })

  const busySlots: DateInterval[] = Object.values(
    busyData.data?.calendars ?? {}
  )
    .flatMap((calendar) => calendar.busy ?? [])
    .sort((a, b) => {
      const aStart = new Date(a.start ?? "")
      const bStart = new Date(b.start ?? "")
      const aEnd = new Date(a.end ?? "")
      const bEnd = new Date(b.end ?? "")

      if (aStart < bStart) {
        return -1
      }
      if (aStart > bStart) {
        return 1
      }
      if (aEnd < bEnd) {
        return -1
      }
      if (aEnd > bEnd) {
        return 1
      }
      return 0
    })
    .map((busy) => ({
      start: new Date(busy.start ?? ""),
      end: new Date(busy.end ?? ""),
    }))

  return busySlots
}
