import { add } from "date-fns"

import ScheduleProvider from "@/components/Schedule/Context"
import SchedulePicker from "@/components/Schedule/Picker"
import { getFreeBusyData } from "@/utils/scheduler/busy"
import { mapDatesToStrings } from "@/utils/scheduler/helpers"

export default async function Meet() {
  const start = new Date()
  const end = add(start, { days: 14 })
  const duration = 30

  const busy = await getFreeBusyData({
    start,
    end,
  })

  return (
    <ScheduleProvider
      duration={duration}
      busy={mapDatesToStrings(busy)}
      start={start.toDateString()}
      end={end.toDateString()}>
      <SchedulePicker />
    </ScheduleProvider>
  )
}
