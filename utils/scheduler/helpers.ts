import type { DateAsStringInterval, DateInterval } from "."
import { LOCAL_DATE_OPTIONS, LOCAL_TIME_OPTIONS } from "."

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
}: {
  availability: DateInterval[]
}): Record<string, DateInterval[]> =>
  availability?.reduce<Record<string, DateInterval[]>>((acc, curr) => {
    const { start } = curr
    const { end } = curr
    const date = start.toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push({ start, end })
    return acc
  }, {}) ?? {}

export const formatLocalDate = (
  date: Date,
  extraOptions: Intl.DateTimeFormatOptions
) => {
  return date.toLocaleDateString([], { ...LOCAL_DATE_OPTIONS, ...extraOptions })
}

export const formatLocalTime = (
  date: Date,
  extraOptions: Intl.DateTimeFormatOptions
) => {
  return date.toLocaleTimeString([], { ...LOCAL_TIME_OPTIONS, ...extraOptions })
}
