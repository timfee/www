import { useAtom } from "jotai"
import TimezoneSelect from "react-timezone-select"

import { timeZoneAtom } from "@/app/meet/store"
import { astronaut } from "@/tailwind.colors"

export default function Timezone() {
  const [timeZone, setTimeZone] = useAtom(timeZoneAtom)

  return (
    <div className='flex-grow'>
      <p className='block text-sm font-medium leading-6 text-slate-900'>
        Timezone
      </p>
      <TimezoneSelect
        labelStyle='abbrev'
        value={timeZone ?? ""}
        theme={(base) => ({
          ...base,
          colors: {
            ...base.colors,
            primary25: astronaut[100],
            primary: astronaut[600],
            primary50: astronaut[200],
            primary75: astronaut[400],
          },
        })}
        styles={{
          control: (base) => ({
            ...base,
            fontSize: "0.875rem",
          }),
          input: (base) => ({
            ...base,

            "input:focus": {
              boxShadow: "none",
            },
          }),
        }}
        onChange={({ value }) => {
          setTimeZone(value)
        }}
      />
    </div>
  )
}
