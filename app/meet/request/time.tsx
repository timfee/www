import {
  useAtom,
  modalStatusAtom,
  selectedDateAvailabilityAtom,
  selectedTimeAtom,
  timeZoneAtom,
} from "../store"
import SpinnerSvg from "@/components/Elements/SpinnerSvg"
import { formatLocalTime } from "@/utils/scheduler/helpers"

export default function TimeButtons() {
  const [selectedDateAvailability] = useAtom(selectedDateAvailabilityAtom)
  const [, setModalStatus] = useAtom(modalStatusAtom)
  const [, setSelectedTime] = useAtom(selectedTimeAtom)

  const [timeZone] = useAtom(timeZoneAtom)
  if (!selectedDateAvailability || !timeZone) {
    return (
      <SpinnerSvg
        height={48}
        width={48}
        className='mx-auto mt-12 fill-casal-300  text-slate-100'
      />
    )
  }

  return (
    <div className='mt-2 grid grid-cols-2 gap-2' suppressHydrationWarning>
      {selectedDateAvailability.map(({ start, end }) => {
        const startString = formatLocalTime(start, { timeZone })
        const endString = formatLocalTime(end, { timeZone })

        return (
          <button
            type='button'
            suppressHydrationWarning
            className='rounded-md bg-astronaut-600 py-1.5 px-2.5 font-semibold text-white shadow-sm hover:bg-astronaut-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-astronaut-600'
            onClick={(event) => {
              event.preventDefault()
              setSelectedTime({ start, end })
              setModalStatus("open")
            }}
            key={`${startString}-${endString}`}>
            {startString} - {endString}
          </button>
        )
      })}
    </div>
  )
}
