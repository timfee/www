export const SLOT_PADDING = 0
export const LOCAL_TIMEZONE = "America/Los_Angeles"

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
