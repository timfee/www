import { DateTime } from "luxon"

import { default as main } from "@/lib/calendar"

export default async function Page() {
  const today = DateTime.now().setZone("America/Los_Angeles")

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
      timeZone: "America/Los_Angeles",
    },
    calendarAllowList: ["primary"],
  })

  const availability = Object.entries(slots.dailySlots)
    .map(([date, slotsInDate]) => ({
      date: DateTime.fromISO(date),
      slotsInDate: slotsInDate,
    }))
    .flat()

  return (
    <div
      style={{
        fontFamily: "arial,sans-serif",
        lineHeight: "revert",
        padding: "revert",
      }}></div>
  )
}

export const dynamic = "force-dynamic"
export const revalidate = false
