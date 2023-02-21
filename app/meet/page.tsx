import { DateTime } from "luxon"

import { default as main } from "@/lib/calendar"

export default async function Page() {
  const today = DateTime.now()

  const tomorrow = today
    .plus({ days: 2 })
    .set({ hour: 17, minute: 0, second: 0 })

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
    JSON.stringify(
      Object.entries(slots.dailySlots).map(([date, slotsInDate]) => ({
        date,
        slotsInDate: slotsInDate.map(({ start, end }) => ({
          start: start.toISO(),
          end: end.toISO(),
        })),
      })),
      null,
      2
    )
  )

  console.log(
    JSON.stringify(
      slots.contiguousChunks.map(({ start, end }) => ({
        start: start.toISO(),
        end: end.toISO(),
      }))
    )
  )

  return (
    <>
      {Object.entries(slots.dailySlots).map(([date, slotsInDate]) => (
        <div key={date}>
          <div>{date}</div>
          <>
            {slotsInDate.map(({ start, end }) => (
              <span key={start.toISO()}>
                {start.toLocaleString(DateTime.TIME_SIMPLE)} -{" "}
                {end.toLocaleString(DateTime.TIME_SIMPLE)}
              </span>
            ))}
          </>
        </div>
      ))}
    </>
  )
}
