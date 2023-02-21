import { DateTime } from "luxon"

import { default as main } from "@/lib/calendar"

export default async function Page() {
  const today = DateTime.now()

  const tomorrow = today
    .plus({ days: 7 })
    .set({ hour: 17, minute: 0, second: 0 })

  const slots = await main({
    from: today,
    padding: 0,
    to: tomorrow,
    daysAllowed: [1, 2, 3, 4, 5],
    slotDuration: 30,
    daily: {
      fromHour: 9,
      toHour: 17,
      timezone: "America/Los_Angeles",
    },
    calendarAllowList: ["primary"],
  })

  const availability = Object.entries(slots.contiguousChunks)
    .map(([date, slotsInDate]) => ({
      date: DateTime.fromISO(date),
      slotsInDate: slotsInDate,
    }))
    .flat()

  console.log(availability)

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
      <div>
        {availability.map(({ date, slotsInDate }) => (
          <>
            <p key={date.toISO()} style={{ fontFamily: "arial,sans-serif" }}>
              On{" "}
              {date.toLocaleString({
                weekday: "long",
                month: "short",
                day: "2-digit",
              })}
              :
            </p>
            <ul
              style={{
                listStyle: "revert",
                padding: "revert",
                margin: "revert",
                fontFamily: "arial,sans-serif",
              }}>
              {slotsInDate.map(({ start, end }) => (
                <li
                  style={{
                    listStyle: "revert",
                  }}>
                  {start.toLocaleString({
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  -{" "}
                  {end.toLocaleString({
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    timeZoneName: "short",
                  })}
                </li>
              ))}
            </ul>
          </>
        ))}
      </div>
    </>
  )
}
