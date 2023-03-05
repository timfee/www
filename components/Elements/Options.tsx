import { RadioGroup } from "@headlessui/react"
import { useState } from "react"

import cx from "@/utils/clsx"

export default function Options({
  options,
  name,
  title,
}: {
  name: string
  title: string
  options: {
    id: string
    title: string
  }[]
}) {
  const [selected, setSelected] = useState(options[0].id)

  return (
    <RadioGroup name={name} value={selected} onChange={setSelected}>
      <RadioGroup.Label className='text-sm md:text-base font-semibold'>
        {title}
      </RadioGroup.Label>
      <div className='-space-y-px rounded-md bg-white mt-2'>
        {options.map((option, optionIdx) => (
          <RadioGroup.Option
            key={option.id}
            value={option.id}
            className={({ checked }) =>
              cx("relative flex cursor-pointer border p-4 focus:outline-none", {
                "rounded-tl-md rounded-tr-md": optionIdx === 0,
                "rounded-bl-md rounded-br-md": optionIdx === options.length - 1,
                "z-10 border-astronaut-200 bg-astronaut-50": checked,
                "border-slate-200": !checked,
              })
            }>
            {({ active, checked }) => (
              <>
                <span
                  className={cx(
                    "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center",
                    {
                      "bg-astronaut-600 border-transparent": checked,
                      "bg-white border-slate-300": !checked,
                      "ring-2 ring-offset-2 ring-astronaut-600": active,
                    }
                  )}
                  aria-hidden='true'>
                  <span className='rounded-full bg-white w-1.5 h-1.5' />
                </span>
                <span className='ml-3 flex flex-col'>
                  <RadioGroup.Label
                    as='span'
                    className={cx("block text-sm font-medium", {
                      "text-astronaut-900": checked,
                      "text-slate-900": !checked,
                    })}>
                    {option.title}
                  </RadioGroup.Label>
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
