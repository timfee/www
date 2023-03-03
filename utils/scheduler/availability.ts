import {
  add,
  eachMinuteOfInterval,
  endOfHour,
  startOfHour,
  isFuture,
} from "date-fns"
import { utcToZonedTime } from "date-fns-tz"

import type { AvailabilitySlot, DateInterval } from "./types"
import { LOCAL_TIMEZONE } from "./types"

export type AvailabilityType = Record<number, AvailabilitySlot[]>

export type CreateAvailabilityProps = {
  start: Date
  end: Date
  duration: number
}

export function createAvailability({
  start,
  end,
  duration,
}: CreateAvailabilityProps): DateInterval[] {
  // Use to keep track of all potential availability slots
  const dailyAvailability: AvailabilityType = {}

  for (let day = 1 /* Monday */; day <= 5 /* Friday */; day++) {
    dailyAvailability[day] = [
      { start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 } },
    ]
  }

  const intervals: DateInterval[] = eachMinuteOfInterval(
    { start: startOfHour(start), end: endOfHour(end) },
    {
      step: duration,
    }
  )
    // Filter out any slots that are in the past
    .filter((date) => isFuture(date))
    // Filter out any slots that are not in our availability
    .filter((utcDate) => {
      // Look at the day through the lens of the calendar owner's timezone.
      const date = utcToZonedTime(utcDate, LOCAL_TIMEZONE)
      const day = date.getDay()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const slots = dailyAvailability[day]

      if (!slots) {
        return false
      }
      for (const slot of slots) {
        if (hour < slot.start.hour || hour > slot.end.hour) {
          continue
        }

        // Apply the same before and after logic for minutes
        // when the hour is the same.
        if (
          (hour === slot.start.hour && minute < slot.start.minute) ||
          (hour === slot.end.hour && minute >= slot.end.minute)
        ) {
          continue
        }

        return true
      }
      return false
    })
    .map((date) => ({
      start: date,
      end: add(date, { minutes: duration }),
    }))

  return intervals
}
