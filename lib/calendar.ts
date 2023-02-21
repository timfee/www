import { calendar_v3, google } from "googleapis"
import { DateTime } from "luxon"

type LookupProps = {
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
  calendarAllowList: string[]
}

type LookupReturn = { start: DateTime; end: DateTime }

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

export default async function LookupTimes({
  to,
  from,
  slotDuration,
  padding,
  daily: { fromHour, toHour },
  daysAllowed,
  calendarAllowList,
}: LookupProps) {
  const calendarEvents = await returnEventsInAllCalendars({
    to,
    from,
    calendarAllowList,
  })

  const allPotentialSlots: LookupReturn[] = []
  let endDate = from.set({ hour: 0, minute: 0, second: 0 })

  const now = DateTime.now().setZone("America/Los_Angeles")

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
      if (
        start >= start.set({ hour: fromHour, minute: 0, second: 0 }) &&
        end <= start.set({ hour: toHour, minute: 0, second: 0 })
      )
        allPotentialSlots.push({
          start,
          end,
        })
    }
    endDate = end
  }

  let dailySlots = groupAvailability(allPotentialSlots)
  let recSlots = groupEvents(calendarEvents)

  const recommendedSlots = Object.entries(dailySlots).reduce(
    (acc, [date, slots]) => {
      acc[date] = removeUnavailableSlots({
        allPotentialSlots: slots,
        calendarEvents: recSlots[date],
        padding,
      })
        .filter((slot) => slot !== null)
        .map(({ start, end }) => ({ start, end }))
      return acc
    },
    {} as { [key: string]: LookupReturn[] }
  )

  return {
    dailySlots: recommendedSlots,
    contiguousChunks: getContiguousChunks(recommendedSlots),
  }
}

function getContiguousChunks(availableTimes: {
  [key: string]: LookupReturn[]
}) {
  const timeslots = Object.values(availableTimes).flatMap((slots) => slots)

  const results = timeslots.reduce((groups, timeslot) => {
    const date = timeslot.start.toISODate()
    const currentGroup = groups[date] ?? []
    const lastTimeslot = currentGroup[currentGroup.length - 1]

    if (!lastTimeslot || lastTimeslot.end !== timeslot.start) {
      currentGroup.push(timeslot)
    } else {
      lastTimeslot.end = timeslot.end
    }

    groups[date] = currentGroup
    return groups
  }, {} as { [key: string]: LookupReturn[] })

  return results
}

async function returnAllCalendars({
  calendarAllowList,
}: {
  calendarAllowList?: string[]
}) {
  if (calendarAllowList) {
    return calendarAllowList
  }
  const calendarResponse = await calendar.calendarList.list({ auth })
  if (!calendarResponse.data.items) {
    return []
  }

  return calendarResponse.data.items.map((cal) => cal.id ?? "")
}

async function returnEventsInCalendar({
  calendarId,
  to,
  from,
}: {
  calendarId: string
  to: DateTime
  from: DateTime
}) {
  const calendarResponse = await calendar.events.list({
    calendarId,
    timeMin: from.toISO(),
    timeMax: to.toISO(),
    maxResults: 2500,
    singleEvents: true,
    orderBy: "startTime",
  })
  console.log(calendarResponse.data.items ?? [])
  return calendarResponse.data.items ?? []
}

async function returnEventsInAllCalendars({
  to,
  from,
  calendarAllowList,
}: {
  to: DateTime
  from: DateTime
  calendarAllowList?: string[]
}) {
  const allCalendars: string[] = await returnAllCalendars({ calendarAllowList })
  return (
    await Promise.all(
      allCalendars.map(
        async (calendarId) =>
          await returnEventsInCalendar({ calendarId, to, from })
      )
    )
  ).flat()
}

function groupEvents(calendarEvents: calendar_v3.Schema$Event[]) {
  return calendarEvents.reduce((eventsByDay, event) => {
    let startDateTime = null,
      endDateTime = null

    if (!event.start || !event.end) {
      throw new Error("Event has no start or end time")
    }
    if (event.start.date && event.end.date) {
      console.log("\n\n\nmulti day mode", event)
      startDateTime = DateTime.fromISO(event.start.date).startOf("day")
      endDateTime = DateTime.fromISO(event.end.date).startOf("day")

      // Handle the event for all-day events
      const numDays = endDateTime.diff(startDateTime, "days").days
      console.log(numDays)
      for (let i = 0; i < numDays; i++) {
        const currDate = startDateTime.plus({ days: i })
        const isoDate = currDate.toISODate()
        console.log("*** Adding to ", currDate.toISO())
        eventsByDay[isoDate] = eventsByDay[isoDate] || []
        eventsByDay[isoDate].push({
          ...event,
          start: { dateTime: currDate.toISO() },
          end: { dateTime: currDate.plus({ days: 1 }).toISO() },
        })
      }
    } else if (event.start.dateTime && event.end.dateTime) {
      // Event with start and end date/time
      startDateTime = DateTime.fromISO(event.start.dateTime)
      endDateTime = DateTime.fromISO(event.end.dateTime)

      // Handle the event for non-all-day events
      const startISODate = startDateTime.toISODate()
      eventsByDay[startISODate] = eventsByDay[startISODate] || []
      eventsByDay[startISODate].push(event)
    } else {
      return eventsByDay
    }

    // Group the events by day
    return eventsByDay
  }, {} as { [key: string]: calendar_v3.Schema$Event[] })
}

function groupAvailability(
  availabilities: { start: DateTime; end: DateTime }[]
) {
  return availabilities.reduce((events, event) => {
    const startDateTime = event.start

    const date = startDateTime.toISODate()
    if (!events[date]) {
      events[date] = []
    }
    events[date].push(event)
    return events
  }, {} as { [key: string]: { start: DateTime; end: DateTime }[] })
}

function removeUnavailableSlots({
  allPotentialSlots,
  calendarEvents,
  padding,
}: {
  allPotentialSlots: LookupReturn[]
  calendarEvents?: calendar_v3.Schema$Event[]
  padding: number
}) {
  console.log(
    "Checking on ",
    allPotentialSlots[0].start.toISO(),
    " slots ",
    allPotentialSlots.length,
    " events ",
    calendarEvents?.length ?? "0"
  )
  return allPotentialSlots.filter((slot) => {
    let conflict = false

    if (calendarEvents) {
      calendarEvents.forEach((event) => {
        if (event.start && event.end && event.transparency !== "transparent") {
          const eventStart = DateTime.fromISO(event.start.dateTime ?? "").minus(
            {
              minutes: padding ?? 0,
            }
          )
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
    }
    return !conflict
  })
}
