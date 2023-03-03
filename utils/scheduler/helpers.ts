import type { DateAsStringInterval, DateInterval } from "./types"

export function mapStringsToDates(
  slots: DateAsStringInterval[]
): DateInterval[] {
  return slots.map(({ start, end }) => ({
    start: new Date(start),
    end: new Date(end),
  }))
}

export function mapDatesToStrings(
  slots: DateInterval[]
): DateAsStringInterval[] {
  return slots.map(({ start, end }) => ({
    start: start.toISOString(),
    end: end.toISOString(),
  }))
}
