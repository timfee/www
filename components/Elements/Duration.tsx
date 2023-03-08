import { RadioGroup } from "@headlessui/react"
import { useAtom } from "jotai"

import { durationAtom } from "@/app/meet/store"
import cx from "@/utils/clsx"

const durations = [15, 30, 45, 60]

export default function Duration() {
  const [duration, setDuration] = useAtom(durationAtom)

  return (
    <RadioGroup
      value={duration}
      onChange={(value) => {
        setDuration(value)
      }}>
      <RadioGroup.Label className='block text-sm font-medium leading-6 text-slate-900'>
        Duration
      </RadioGroup.Label>
      <div className='flex space-x-2'>
        {durations.map((option) => (
          <RadioGroup.Option
            key={option}
            value={option}
            className={({ active, checked }) =>
              cx(
                "cursor-pointer flex items-center justify-center rounded-md py-2 px-3 text-sm font-semibold uppercase sm:flex-1",
                {
                  "ring-2 ring-astronaut-600 ring-offset-2": active,

                  "bg-astronaut-600 text-white hover:bg-astronaut-500": checked,
                  "ring-1 ring-inset ring-slate-300 bg-white text-slate-900 hover:bg-slate-50":
                    !checked,
                }
              )
            }>
            <RadioGroup.Label as='span'>{option}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
