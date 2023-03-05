"use client"

import { addBusinessDays } from "date-fns"
import { atom } from "jotai"

import type { DateInterval } from "@/utils/scheduler"
import {
  availabilityByDate,
  createAvailability,
  getAvailableSlots,
  END_DATE,
  START_DATE,
} from "@/utils/scheduler"

export { useAtom } from "jotai"

export const startDateAtom = atom<Date>(START_DATE)
export const endDateAtom = atom<Date>(END_DATE)

export const durationAtom = atom(30)
export const timeZoneAtom = atom<string | null>(null)

export const modalStatusAtom = atom<
  "open" | "busy" | "error" | "finished" | "closed"
>("closed")

export const potentialTimesAtom = atom((get) => {
  const start = get(startDateAtom)
  const end = get(endDateAtom)
  if (!start || !end) {
    return null
  }

  return createAvailability({
    start,
    end,
    duration: get(durationAtom),
  })
})

export const busyTimesAtom = atom<DateInterval[] | null>(null)

export const availabileTimesAtom = atom((get) => {
  const allSlots = get(potentialTimesAtom)
  const busySlots = get(busyTimesAtom)

  if (!allSlots || !busySlots) {
    return null
  }

  return availabilityByDate({
    availability: getAvailableSlots({
      allSlots,
      busySlots,
    }),
  })
})

export const selectedDateAtom = atom(addBusinessDays(new Date(), 1))
export const selectedTimeAtom = atom<DateInterval | null>(null)

export const selectedDateAvailabilityAtom = atom((get) => {
  if (!get(selectedDateAtom)) {
    return null
  }
  const allTimes = get(availabileTimesAtom)
  if (!allTimes) {
    return null
  }
  const selectedDateTimes = allTimes[get(selectedDateAtom).toDateString()]
  if (!selectedDateTimes) {
    return null
  }
  return selectedDateTimes
})
