import { add } from "date-fns"

export { createAvailability } from "./createAvailability"
export { getAvailableSlots } from "./getAvailableSlots"
export * from "./helpers"

export const SLOT_PADDING = 0
export const LOCAL_TIMEZONE = "America/Los_Angeles"
export const START_DATE = new Date()
export const END_DATE = add(START_DATE, { days: 14 })

export const LOCAL_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
}

export const LOCAL_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
}

export type DateInterval = {
  start: Date
  end: Date
}
export type DateAsStringInterval = {
  start: string
  end: string
}

export type AvailabilityByDay = Record<string, DateInterval[]>

export type AvailabilitySlot = {
  start: { hour: number; minute: number }
  end: { hour: number; minute: number }
}
