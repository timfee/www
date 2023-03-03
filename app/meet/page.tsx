import { add } from "date-fns"

import ScheduleCanvas from "@/components/Schedule/Canvas"
import { ScheduleProvider } from "@/components/Schedule/Context"
import getAvailability from "@/utils/scheduler"
import { mapDatesToStrings } from "@/utils/scheduler/helpers"

const Meet = async (): Promise<JSX.Element> => {
  const start = new Date()
  const end = add(start, { days: 7 })

  const times = await getAvailability({
    start,
    end,
    duration: 30,
  })

  return (
    <div>
      <ScheduleProvider availability={mapDatesToStrings(times)}>
        <ScheduleCanvas />
      </ScheduleProvider>
    </div>
  )
}

export default Meet
