import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { getTimezoneOffset } from "date-fns-tz"
import { useState } from "react"

import { useScheduleContext, useScheduleDispatchContext } from "./Context"
import cx from "@/lib/classes"

export default function Timezone() {
  const [query, setQuery] = useState("")

  const timeZones = Intl.supportedValuesOf("timeZone")

  const { timeZone } = useScheduleContext()
  const dispatch = useScheduleDispatchContext()

  const filteredTimeZones =
    query === ""
      ? timeZones
      : timeZones.filter((timeZone) => {
          return timeZone.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox
      as='div'
      value={timeZone}
      onChange={(payload) => {
        dispatch({
          type: "setTimeZone",
          payload,
        })
      }}>
      <Combobox.Label className='block text-sm font-medium leading-6 text-slate-900'>
        Timezone
      </Combobox.Label>
      <div className='relative'>
        <Combobox.Input
          className='w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-astronaut-600 sm:text-sm sm:leading-6'
          onChange={(event) => {
            setQuery(event.target.value)
          }}
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
          <ChevronUpDownIcon
            className='h-5 w-5 text-slate-700'
            aria-hidden='true'
          />
        </Combobox.Button>
        <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
          {filteredTimeZones?.map((timeZone) => (
            <Combobox.Option
              key={timeZone}
              value={timeZone}
              className={({ active }) =>
                cx("relative cursor-default select-none py-2 pl-3 pr-9", {
                  "bg-astronaut-600 text-white": active,
                  "text-slate-900": !active,
                })
              }>
              {({ active, selected }) => (
                <>
                  <div className='flex'>
                    <span
                      className={cx("truncate", { "font-semibold": selected })}>
                      {timeZone}
                    </span>
                    <span
                      className={cx("ml-2 truncate text-slate-500", {
                        "text-astronaut-200": active,
                        "text-slate-500": !active,
                      })}>
                      {convertFractionalOffsetToHHMM(timeZone)}
                    </span>
                  </div>

                  {selected && (
                    <span
                      className={cx(
                        "absolute inset-y-0 right-0 flex items-center pr-4",
                        {
                          "text-white": active,
                          "text-astronaut-600": !active,
                        }
                      )}>
                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace Intl {
  type Key =
    | "calendar"
    | "collation"
    | "currency"
    | "numberingSystem"
    | "timeZone"
    | "unit"

  function supportedValuesOf(input: Key): string[]
}

const convertFractionalOffsetToHHMM = (timeZone: string) => {
  const offset = getTimezoneOffset(timeZone) / (60 * 60 * 1000)
  const sign = offset < 0 ? "-" : "+"
  const absOffset = Math.abs(offset)
  const hours = Math.floor(absOffset)
  const minutes = Math.floor((absOffset - hours) * 60)
  return `(GMT ${sign}${hours}:${String(minutes).padStart(2, "0")})`
}
