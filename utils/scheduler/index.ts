import { createAvailability } from "./availability"
import { getFreeBusyData } from "./busy"
import { returnAvailableSlots } from "./offers"
import type { DateInterval } from "./types"
import { SLOT_PADDING } from "./types"

export default async function getAvailability({
  start,
  end,
  duration,
}: DateInterval & { duration: number }): Promise<DateInterval[]> {
  const allSlots = createAvailability({
    start,
    end,
    duration,
  })

  const busySlots = await getFreeBusyData({
    start,
    end,
  })

  return returnAvailableSlots({
    allSlots,
    busySlots,
    padding: SLOT_PADDING,
  })
}
