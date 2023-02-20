import { calendar_v3, google } from "googleapis"
import { DateTime } from "luxon"

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CALENDAR_CLIENT_ID,
  process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  process.env.GOOGLE_CALENDAR_REDIRECT_URL
)

export interface GetEventsParams {
  from: DateTime
  to: DateTime
  calendar?: calendar_v3.Calendar
  calendarId?: string
}
type GetSlotsParams = {
  slotDuration: number
  padding: number
  daysAllowed: number[]
  daily: {
    timezone: string
    fromHour: number
    toHour: number
  }
}
export interface Slot {
  start: DateTime
  end: DateTime
}

export default async function main({
  to,
  from,
  slotDuration,
  padding,
  daily: { fromHour, toHour },
  daysAllowed,
}: {
  to: DateTime
  from: DateTime
  slotDuration: number
  padding: number
  daysAllowed: number[]
  daily: {
    timezone: string
    fromHour: number
    toHour: number
  }
}) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CALENDAR_CLIENT_ID,
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
    process.env.GOOGLE_CALENDAR_REDIRECT_URL
  )
  auth.setCredentials({
    access_token: process.env.GOOGLE_CALENDAR_ACCESS,
    refresh_token: process.env.GOOGLE_CALENDAR_REFRESH,
  })

  const calendar = google.calendar({ version: "v3", auth })
  const calendars = await calendar.calendarList.list({ auth })

  const allCalendars: string[] =
    calendars.data.items
      ?.map((cal) => cal.id ?? "")
      .filter(
        (cal) =>
          cal !== "" &&
          cal !== "addressbook#contacts@group.v.calendar.google.com"
      ) ?? []

  const events = (
    await Promise.all(
      allCalendars.map(
        async (calendarId) =>
          (
            await calendar.events.list({
              calendarId,
              timeMin: DateTime.now().toISO(),
              timeMax: DateTime.now().plus({ days: 7 }).toISO(),
              maxResults: 2500,
              singleEvents: true,
              orderBy: "startTime",
            })
          ).data.items ?? []
      )
    )
  ).flat()

  const allPotentialSlots: Slot[] = []
  let endDate = from.set({ hour: 0, minute: 0, second: 0 })

  const now = DateTime.now()

  while (endDate < to) {
    const start = endDate
    const end = start.plus({ minutes: slotDuration })

    if (
      daysAllowed.includes(start.weekday) &&
      daysAllowed.includes(end.weekday) &&
      start > from.set({ hour: fromHour, minute: 0, second: 0 }) &&
      end <= to.set({ hour: toHour, minute: 0, second: 0 }) &&
      start > now
    ) {
      let startTime = start,
        endTime = end,
        dailyConditionsMet = true

      if (endTime.day > startTime.day) {
        console.log("WARN")
      }

      console.log(
        `
        
Looking at slot: ${startTime.toLocaleString(
          DateTime.DATETIME_SHORT
        )} - ${endTime.toLocaleString(DateTime.DATETIME_SHORT)}
        ${startTime.toLocaleString(DateTime.DATETIME_SHORT)} < ${startTime
          .set({
            hour: fromHour,
            minute: 0,
            second: 0,
          })
          .toLocaleString(DateTime.DATETIME_SHORT)} = ${
          startTime < startTime.set({ hour: fromHour, minute: 0, second: 0 })
        }
        ${startTime.toLocaleString(DateTime.DATETIME_SHORT)} > ${startTime
          .set({
            hour: toHour,
            minute: 0,
            second: 0,
          })
          .toLocaleString(DateTime.DATETIME_SHORT)} = ${
          startTime > startTime.set({ hour: toHour, minute: 0, second: 0 })
        }`
      )

      if (
        startTime < startTime.set({ hour: fromHour, minute: 0, second: 0 }) ||
        endTime > startTime.set({ hour: toHour, minute: 0, second: 0 })
      ) {
        dailyConditionsMet = false
      }

      if (dailyConditionsMet)
        allPotentialSlots.push({
          start: startTime,
          end: endTime,
        })
    }
    endDate = end
  }

  const calendarEvents = events

  let recommendedSlots = allPotentialSlots.filter((slot) => {
    let conflict = false

    calendarEvents.forEach((event) => {
      if (event.start && event.end) {
        const eventStart = DateTime.fromISO(event.start.dateTime ?? "").minus({
          minutes: padding ?? 0,
        })
        const eventEnd = DateTime.fromISO(event.end.dateTime ?? "").plus({
          minutes: padding ?? 0,
        })

        if (
          // Slot starts in event
          (eventStart <= slot.start && slot.start <= eventEnd) ||
          // Slot ends in event
          (eventStart <= slot.end && slot.end <= eventEnd) ||
          // Event is in slot
          (slot.start < eventStart && eventEnd < slot.end)
        )
          conflict = true
      }
    })
    return !conflict
  })

  return recommendedSlots
}

/**
 * Find a user's events from a single calendar
 * Defaults to their primary calendar
 */
export const getEventsFromSingleCalendar = async ({
  from,
  to,
  calendar,
  calendarId,
}: GetEventsParams) => {
  oauth2Client.setCredentials({
    access_token: process.env.GOOGLE_CALENDAR_ACCESS,
    refresh_token: process.env.GOOGLE_CALENDAR_REFRESH,
  })
  if (!calendar) {
    throw new Error("Calendar is not defined")
  }
  const vals =
    (
      await calendar.events.list({
        timeMin: from ? from.toISO() : undefined,
        timeMax: to ? to.toISO() : undefined,
        auth: oauth2Client,
        calendarId,
        maxResults: 2500,
        singleEvents: true,
      })
    ).data.items || []

  console.log("Results from calendar", calendarId, vals)
  return vals
}

/**
 * Get a list of user's events from all calendars
 */
export const getEventsFromAllCalendars = async ({
  from,
  to,
  calendar,
}: GetEventsParams) => {
  oauth2Client.setCredentials({
    access_token: process.env.GOOGLE_CALENDAR_ACCESS,
    refresh_token: process.env.GOOGLE_CALENDAR_REFRESH,
  })
  const auth = oauth2Client
  if (!calendar) {
    throw new Error("Calendar is not defined")
  }
  const calendars = await calendar.calendarList.list({ auth })
  if (!calendars.data || !calendars.data.items) {
    return []
  }

  const newEvents = await Promise.all(
    calendars.data.items.map(async (cal) => {
      console.log("waiting on calendar", cal.id)
      if (cal.id) {
        const events = await getEventsFromSingleCalendar({
          from,
          to,
          calendar,
          calendarId: cal.id,
        })

        return events
      } else {
        return []
      }
    })
  )

  return newEvents.flat()
}

/**
 * List all free slots for a user
 */
export const getSlots = async ({
  from,
  to,
  padding,
  slotDuration,
  daysAllowed,
  calendar,
  daily: { fromHour, toHour },
}: GetEventsParams & GetSlotsParams): Promise<Slot[]> => {
  const allPotentialSlots: Slot[] = []
  let endDate = from.set({ hour: 0, minute: 0, second: 0 })

  const now = DateTime.now()

  while (endDate < to) {
    const start = endDate
    const end = start.plus({ minutes: slotDuration })

    if (
      daysAllowed.includes(start.weekday) &&
      daysAllowed.includes(end.weekday) &&
      start > from.set({ hour: fromHour, minute: 0, second: 0 }) &&
      end <= to.set({ hour: toHour, minute: 0, second: 0 }) &&
      start > now
    ) {
      let startTime = start,
        endTime = end,
        dailyConditionsMet = true

      if (endTime.day > startTime.day) {
        console.log("WARN")
      }

      console.log(
        `
        
Looking at slot: ${startTime.toLocaleString(
          DateTime.DATETIME_SHORT
        )} - ${endTime.toLocaleString(DateTime.DATETIME_SHORT)}
        ${startTime.toLocaleString(DateTime.DATETIME_SHORT)} < ${startTime
          .set({
            hour: fromHour,
            minute: 0,
            second: 0,
          })
          .toLocaleString(DateTime.DATETIME_SHORT)} = ${
          startTime < startTime.set({ hour: fromHour, minute: 0, second: 0 })
        }
        ${startTime.toLocaleString(DateTime.DATETIME_SHORT)} > ${startTime
          .set({
            hour: toHour,
            minute: 0,
            second: 0,
          })
          .toLocaleString(DateTime.DATETIME_SHORT)} = ${
          startTime > startTime.set({ hour: toHour, minute: 0, second: 0 })
        }`
      )

      if (
        startTime < startTime.set({ hour: fromHour, minute: 0, second: 0 }) ||
        endTime > startTime.set({ hour: toHour, minute: 0, second: 0 })
      ) {
        dailyConditionsMet = false
      }

      if (dailyConditionsMet)
        allPotentialSlots.push({
          start: startTime,
          end: endTime,
        })
    }
    endDate = end
  }

  const calendarEvents = await getEventsFromAllCalendars({
    from,
    to,
    calendar,
  })

  let recommendedSlots = allPotentialSlots.filter((slot) => {
    let conflict = false

    calendarEvents.forEach((event) => {
      if (event.start && event.end) {
        const eventStart = DateTime.fromISO(event.start.dateTime ?? "").minus({
          minutes: padding ?? 0,
        })
        const eventEnd = DateTime.fromISO(event.end.dateTime ?? "").plus({
          minutes: padding ?? 0,
        })

        if (
          // Slot starts in event
          (eventStart <= slot.start && slot.start <= eventEnd) ||
          // Slot ends in event
          (eventStart <= slot.end && slot.end <= eventEnd) ||
          // Event is in slot
          (slot.start < eventStart && eventEnd < slot.end)
        )
          conflict = true
      }
    })
    return !conflict
  })

  return recommendedSlots
}
