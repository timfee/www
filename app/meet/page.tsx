import SchedulePicker from "./picker"
import { END_DATE, START_DATE } from "@/utils/scheduler"
import getFreeBusyData from "@/utils/scheduler/getFreeBusyData"
import { mapDatesToStrings } from "@/utils/scheduler/helpers"

export default async function Meet() {
  const start = START_DATE
  const end = END_DATE

  const busy = await getFreeBusyData({
    start,
    end,
  })

  return (
    <SchedulePicker
      busy={mapDatesToStrings(busy)}
      start={start.toDateString()}
      end={end.toDateString()}
    />
  )
}
