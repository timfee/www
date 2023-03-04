import { utcToZonedTime } from "date-fns-tz"

import type { DateAsStringInterval, DateInterval } from "./types"

export const mapStringsToDates = (
  slots: DateAsStringInterval[]
): DateInterval[] => {
  return slots.map(({ start, end }) => ({
    start: new Date(start),
    end: new Date(end),
  }))
}

export const mapDatesToStrings = (
  slots: DateInterval[]
): DateAsStringInterval[] => {
  return slots.map(({ start, end }) => ({
    start: start.toISOString(),
    end: end.toISOString(),
  }))
}

export const availabilityByDate = ({
  availability,
  timeZone,
}: {
  availability: DateInterval[]
  timeZone: string
}): Record<string, DateInterval[]> =>
  availability?.reduce<Record<string, DateInterval[]>>((acc, curr) => {
    const start = utcToZonedTime(curr.start, timeZone)
    const end = utcToZonedTime(curr.end, timeZone)
    const date = start.toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push({ start, end })
    return acc
  }, {}) ?? {}
