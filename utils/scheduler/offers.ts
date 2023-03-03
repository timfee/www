/* eslint-disable @typescript-eslint/prefer-for-of */

import { add, areIntervalsOverlapping, sub } from "date-fns"

import type { DateInterval } from "./types"

export function returnAvailableSlots({
  allSlots,
  busySlots,
  padding,
}: {
  allSlots: DateInterval[]
  busySlots: DateInterval[]
  padding: number
}): DateInterval[] {
  // Our final array of available slots
  const openSlots: DateInterval[] = []

  // Make a deep copy of the allSlots array
  const remainingSlots = [...allSlots]

  for (let i = 0; i < allSlots.length; i++) {
    const freeSlot = allSlots[i]

    // Check if the free slot overlaps with any busy slot
    let isFree = true
    for (let j = 0; j < busySlots.length; j++) {
      const busySlot = busySlots[j]
      const busyStart = sub(busySlot.start, { minutes: padding })
      const busyEnd = add(busySlot.end, { minutes: padding })
      if (
        areIntervalsOverlapping(freeSlot, { start: busyStart, end: busyEnd })
      ) {
        isFree = false
        break
      }
    }

    // If the free slot is not booked, add it to the result
    if (isFree) {
      openSlots.push(freeSlot)
    }

    // Remove the free slot from the remainingSlots array
    const index = remainingSlots.indexOf(freeSlot)
    if (index !== -1) {
      remainingSlots.splice(index, 1)
    }
  }

  return openSlots
}
