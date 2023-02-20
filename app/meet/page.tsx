import { BlockLike, ScopeTime, getFree } from "@kamiazya/freebusy"
import { google, type calendar_v3 } from "googleapis"
import { DateTime } from "luxon"

import { default as main } from "@/lib/calendar"

export default async function Page() {
  const today = DateTime.now()

  const tomorrow = today
    .plus({ days: 2 })
    .set({ hour: 17, minute: 0, second: 0 })

  const calendar = google.calendar("v3")
  if (!calendar) {
    throw new Error("calendar is null")
  }

  const slots = await main({
    from: today,
    padding: 0,
    to: tomorrow,
    daysAllowed: [0, 1, 2, 3, 4],
    slotDuration: 30,
    daily: {
      fromHour: 9,
      toHour: 17,
      timezone: "America/Los_Angeles",
    },
  })

  console.log(
    slots.map((slot) => {
      return {
        start: slot.start.toLocaleString(DateTime.DATETIME_SHORT),
        startend: slot.end.toLocaleString(DateTime.DATETIME_SHORT),
      }
    })
  )

  return <>hey</>
}

async function getAvailableTimeSlots() {
  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_API_CLIENT_ID,
    clientSecret: process.env.GOOGLE_API_SECRET,
    redirectUri: "https://developers.google.com/oauthplayground",
  })

  auth.setCredentials({
    access_token: process.env.GOOGLE_ACCESS_TOKEN,
    scope: "https://www.googleapis.com/auth/calendar",
    token_type: "Bearer",
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })

  const calendar = google.calendar({ version: "v3", auth })

  // Define the time range to check for free slots
  const start = new Date()
  start.setDate(start.getDate() + 1)
  start.setHours(0, 0, 0)

  const end = new Date()
  end.setDate(end.getDate() + 2)
  end.setHours(23, 59, 59)

  // Define the request parameters for the freebusy query
  const requestBody: calendar_v3.Schema$FreeBusyRequest = {
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    timeZone: "America/Los_Angeles",
    items: [{ id: "primary" }],
  }

  // Send the freebusy query to the Google Calendar API
  const freeBusyResponse = (await calendar.freebusy.query({ requestBody })).data

  // Create an array of events from all calendars.
  const events = []
  for (const calendarId in freeBusyResponse.calendars) {
    const calendar = freeBusyResponse.calendars[calendarId]
    if (calendar.errors) {
      throw new Error(calendar.errors.join(", "))
    }
    if (calendar.busy) {
      console.log("Raw events", calendar.busy)
      events.push(
        ...calendar.busy.map((busy) => ({
          start: busy.start ?? "",
          end: busy.end ?? "",
        }))
      )
    }
  }

  return getFree({
    scope: {
      start,
      end,
      time: new ScopeTime({
        defaultStart: 9,
        defaultEnd: 17,
      }),
    },
    events,
  }).blocks.map((block) => ({
    start: block.start,
    end: block.end,
  }))
}

function intervalsBetweenDateTimes({
  start,
  end,
  intervalInMinutes,
}: {
  start: DateTime
  end: DateTime
  intervalInMinutes: number
}) {
  const intervals = []
  let current = start
  while (current <= end) {
    console.log(
      "Requested intervals between: ",
      current.toLocaleString(DateTime.DATETIME_SHORT),
      end.toLocaleString(DateTime.DATETIME_SHORT)
    )
    intervals.push({
      start: current,
      end: current.plus({ minutes: intervalInMinutes }),
    })
    current = current.plus({ minutes: intervalInMinutes })
  }
  return intervals
}
