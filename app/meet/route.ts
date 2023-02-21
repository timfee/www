import { DateTime } from "luxon"

import { default as main } from "@/lib/calendar"

export const dynamic = "force-dynamic"
export const revalidate = false

export async function GET() {
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

  const availability = Object.entries(slots.contiguousChunks)
    .map(([date, slotsInDate]) => ({
      date: DateTime.fromISO(date),
      slotsInDate: slotsInDate,
    }))
    .flat()

  let textResponse = `<p>My availability for the next week:</p>`

  for (const { date, slotsInDate } of availability) {
    textResponse += `<p><strong>${date.toLocaleString({
      day: "numeric",
      month: "long",
      weekday: "long",
      year: "numeric",
    })}:</strong></p><ul>`
    for (const slot of slotsInDate) {
      textResponse += `<li>${slot.start.toLocaleString(
        DateTime.TIME_SIMPLE
      )} - ${slot.end.toLocaleString(DateTime.TIME_SIMPLE)}</li>`
    }
    textResponse += `</ul>`
  }

  // NextResponse extends the Web Response API
  return new Response(
    `<html><head></head><body style="font-family:arial,sans;">${textResponse}</body></html>`,
    {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
  )
}
