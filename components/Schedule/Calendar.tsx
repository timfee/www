"use client"
import {
  add,
  differenceInDays,
  getDate,
  getDay,
  isSameDay,
  isWeekend,
  sub,
} from "date-fns"

import { useScheduleContext, useScheduleDispatchContext } from "./Context"
import cx from "@/lib/classes"
import { availabilityByDate } from "@/utils/scheduler/helpers"
import { returnAvailableSlots } from "@/utils/scheduler/offers"
import type { DateInterval } from "@/utils/scheduler/types"

export default function Calendar({ start, end }: DateInterval) {
  const days = []
  const { busy, availability, timeZone, selectedDate } = useScheduleContext()
  const dispatch = useScheduleDispatchContext()
  const offers = availabilityByDate({
    timeZone,
    availability: returnAvailableSlots({
      allSlots: availability,
      busySlots: busy,
    }),
  })

  if (start && end) {
    // Pad starting days
    const daysToStart = getDay(start)
    for (let i = 1; i <= daysToStart; i++) {
      days.unshift({
        date: sub(start, { days: i }),
      })
    }

    // Loop through actual days
    for (let i = 0; i <= differenceInDays(end, start); i++) {
      days.push({
        date: add(start, { days: i }),
      })
    }

    // Add extra days
    const daysToFinish = 6 - getDay(end)
    for (let i = 1; i <= daysToFinish; i++) {
      days.push({
        date: add(end, { days: i }),
      })
    }
  }

  const now = new Date()

  return (
    <>
      <div className='mt-6 grid grid-cols-7 text-center text-xs leading-6 text-slate-500'>
        <div className='opacity-20'>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div className='opacity-20'>S</div>
      </div>
      <div className='isolate mt-2 grid grid-cols-7 gap-px rounded-lg  text-sm '>
        {days.map(({ date }, dayIdx) => {
          const slotsLeft =
            offers && offers[date.toDateString()]
              ? offers[date.toDateString()].length
              : 0
          return (
            <button
              key={date.toString()}
              onClick={(e) => {
                e.preventDefault()
                dispatch({
                  type: "setSelectedDate",
                  payload: date,
                })
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
