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

async function returnAllCalendars() {
  const calendarResponse = await calendar.calendarList.list({ auth })
  if (!calendarResponse.data.items) {
    return []
  }
  return calendarResponse.data.items.map((cal) => cal.id ?? "")
}

async function returnEventsInCalendar(calendarId: string) {
  const calendarResponse = await calendar.events.list({
    calendarId,
    timeMin: DateTime.now().toISO(),
    timeMax: DateTime.now().plus({ days: 7 }).toISO(),
    maxResults: 2500,
    singleEvents: true,
    orderBy: "startTime",
  })

  return calendarResponse.data.items ?? []
}

async function returnEventsInAllCalendars() {
  const allCalendars: string[] = await returnAllCalendars()
  return (
    await Promise.all(
      allCalendars.map(
        async (calendarId) => await returnEventsInCalendar(calendarId)
      )
    )
  ).flat()
}

function groupEvents(calendarEvents: calendar_v3.Schema$Event[]) {
  return calendarEvents.reduce((events, event) => {
    if (!event.start || !event.end) {
      return events
    }
    const startDateTime = DateTime.fromISO(event.start.dateTime ?? "")

    const date = startDateTime.toISODate()
    if (!events[date]) {
      events[date] = []
    }
    events[date].push(event)
    return events
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

// function groupEventsByDate(
//   calendarEvents: {
//     start?: calendar_v3.Schema$EventDateTime | DateTime
//     end?: calendar_v3.Schema$EventDateTime | DateTime
//   }[]
// ) {
//   return calendarEvents
//     .filter((event) => event.start && event.end)
//     .reduce((events, event) => {
//       let startDateTime: DateTime, endDateTime: DateTime

//       if (!event.start) {
//         throw new Error("event.start is undefined")
//       } else if (event.start instanceof DateTime) {
//         startDateTime = event.start as DateTime
//       } else if ("dateTime" in event.start) {
//         startDateTime = DateTime.fromISO(event.start.dateTime ?? "")
//       } else if ("date" in event.start) {
//         startDateTime = DateTime.fromISO(event.start.date ?? "").set({
//           hour: 0,
//           minute: 0,
//           second: 0,
//         })
//       } else {
//         throw new Error(
//           "event.start is not a string or DateTime - it’s : " +
//             JSON.stringify(event.start)
//         )
//       }
//       if (!event.end) {
//         throw new Error("event.end is undefined")
//       } else if (typeof event.end === "string") {
//         endDateTime = DateTime.fromISO(event.end ?? "")
//       } else if (event.end instanceof DateTime) {
//         endDateTime = event.end as DateTime
//       } else if ("dateTime" in event.end) {
//         endDateTime = DateTime.fromISO(event.end.dateTime ?? "")
//       } else if ("date" in event.end) {
//         endDateTime = DateTime.fromISO(event.end.date ?? "").set({
//           hour: 23,
//           minute: 59,
//           second: 59,
//         })
//       } else {
//         throw new Error("event.end is not a string or DateTime")
//       }

//       const date = startDateTime.toISODate()
//       if (!events[date]) {
//         events[date] = []
//       }
//       events[date].push({ start: startDateTime, end: endDateTime })
//       return events
//     }, {} as { [key: string]: LookupReturn[] })
// }

function removeUnavailableSlots({
  allPotentialSlots,
  calendarEvents,
  padding,
}: {
  allPotentialSlots: LookupReturn[]
  calendarEvents?: calendar_v3.Schema$Event[]
  padding: number
}) {
  console.log(calendarEvents, allPotentialSlots)
  return allPotentialSlots.filter((slot) => {
    let conflict = false

    calendarEvents &&
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
    return !conflict
  })
}

export default async function LookupTimes({
  to,
  from,
  slotDuration,
  padding,
  daily: { fromHour, toHour },
  daysAllowed,
}: LookupProps) {
  const calendarEvents = await returnEventsInAllCalendars()

  const allPotentialSlots: LookupReturn[] = []
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

  // console.log(
  //   JSON.stringify(
  //     Object.entries(dailySlots).map(([date, slots]) => {
  //       return {
  //         [date]: slots.map((slot) => {
  //           return {
  //             start: slot.start.toISO(),
  //             end: slot.end.toISO(),
  //           }
  //         }),
  //       }
  //     }),
  //     null,
  //     2
  //   )
  // )

  // console.log(
  //   JSON.stringify(
  //     Object.entries(recSlots).map(([date, slots]) => {
  //       return {
  //         [date]: slots.map((slot) => {
  //           return {
  //             start: slot.start,
  //             end: slot.end,
  //           }
  //         }),
  //       }
  //     }),
  //     null,
  //     2
  //   )
  // )

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

  // Object.entries(recommendedSlots).map(([date, slotsV]) => {
  //   console.log(date, slotsV)
  // })

  console.log(
    JSON.stringify(
      Object.entries(recommendedSlots).map(([date, slotsV]) => {
        return {
          [date]: slotsV.map((slotV) => {
            return {
              start: slotV.start.toISO(),
              end: slotV.end.toISO(),
            }
          }),
        }
      }),
      null,
      2
    )
  )

  console.log(recommendedSlots)

  // let recommendedSlots = await removeUnavailableSlots({
  //   padding,
  //   calendarEvents,
  //   allPotentialSlots,
  // })

  return {
    dailySlots: recommendedSlots,
    contiguousChunks: getContiguousChunks(recommendedSlots),
  }
}

export function getContiguousChunks(availableTimes: {
  [key: string]: LookupReturn[]
}) {
  const timeslots = Object.values(availableTimes).flatMap((slots) => slots)

  const results = timeslots.reduce((chunks, timeslot) => {
    const currentChunk = chunks[chunks.length - 1]
    if (!currentChunk || currentChunk.end !== timeslot.start) {
      chunks.push(timeslot)
    } else {
      currentChunk.end = timeslot.end
    }
    return chunks
  }, [] as LookupReturn[])
  return results
}

type DailyBucketsReturn = { [key: string]: LookupReturn[] }
export function createDailyBuckets(availableTimes: LookupReturn[]) {
  const foo = availableTimes.map((time) => ({ ...time }))

  const results = foo.reduce((acc, time) => {
    const day = time.start.toISODate()
    if (!acc[day]) {
      acc[day] = []
    }
    acc[day].push(time)
    return acc
  }, {} as DailyBucketsReturn)

  return results
}
