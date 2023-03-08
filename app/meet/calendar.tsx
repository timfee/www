"use client"

import {
  getDate,
  isSameDay,
  isWeekend,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addBusinessDays,
} from "date-fns"

import {
  useAtom,
  startDateAtom,
  endDateAtom,
  availabileTimesAtom,
  selectedDateAtom,
} from "./store"
import SpinnerSvg from "@/components/Elements/SpinnerSvg"
import cx from "@/utils/clsx"

export default function Calendar() {
  const [start] = useAtom(startDateAtom)
  const [end] = useAtom(endDateAtom)
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const [availability] = useAtom(availabileTimesAtom)

  if (!start || !end) {
    return (
      <SpinnerSvg
        height={24}
        width={24}
        className='mx-auto mt-12 fill-casal-300  text-slate-100'
      />
    )
  }

  const days = eachDayOfInterval({
    start: isWeekend(start)
      ? startOfWeek(addBusinessDays(start, 1))
      : startOfWeek(start),
    end: isWeekend(end) ? endOfWeek(addBusinessDays(end, -1)) : endOfWeek(end),
  })

  const now = new Date()

  return (
    <>
      <div className='mt-6 grid grid-cols-7 text-center text-xs leading-6 text-slate-500'>
        <div className='opacity-30'>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div className='opacity-30'>S</div>
      </div>
      <div className='isolate mt-2 grid grid-cols-7 gap-px rounded-lg  text-sm '>
        {days.map((date, dayIdx) => {
          const slotsLeft =
            availability && availability[date.toDateString()]
              ? availability[date.toDateString()].length
              : 0
          return (
            <button
              suppressHydrationWarning
              key={date.toString()}
              onClick={() => {
                setSelectedDate(date)
              }}
              type='button'
              className={cx("py-1.5 focus:z-10", {
                "opacity-20 cursor-not-allowed":
                  isWeekend(date) || date < now || date > end || date < start,
                "bg-slate-300": !isWeekend(date),
                "rounded-tl-lg": dayIdx === 1,
                "rounded-tr-lg": dayIdx === 5,
                "rounded-bl-lg": dayIdx === days.length - 6,
                "rounded-br-lg": dayIdx === days.length - 2,
                "text-astronaut-600": isSameDay(date, now),
                "font-semibold":
                  isSameDay(date, selectedDate ?? 0) || isSameDay(date, now),
                "text-white": isSameDay(date, selectedDate ?? 0),
              })}>
              <time
                suppressHydrationWarning
                title={`${slotsLeft} slots`}
                dateTime={date.toISOString()}
                className={cx(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                  {
                    "bg-astronaut-600":
                      isSameDay(date, selectedDate ?? 0) &&
                      isSameDay(date, now),
                    "bg-astronaut-900":
                      isSameDay(date, selectedDate ?? 0) &&
                      !isSameDay(date, now),
                  }
                )}>
                {getDate(date)}
              </time>
            </button>
          )
        })}
      </div>
    </>
  )
}
