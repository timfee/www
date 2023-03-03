"use client"
import { utcToZonedTime } from "date-fns-tz"
import type { FC } from "react"

import { useScheduleContext, useScheduleDispatchContext } from "./Context"
import Timezone from "./Timezone"
import type { DateInterval } from "@/utils/scheduler/types"

const SchedulePicker: FC = () => {
  const { availability, timeZone } = useScheduleContext()
  const dispatch = useScheduleDispatchContext()
  const availabilityByDate: Record<string, DateInterval[]> =
    availability?.reduce<Record<string, DateInterval[]>>((acc, curr) => {
      const start = utcToZonedTime(curr.start, timeZone)
      const end = utcToZonedTime(curr.end, timeZone)
      const date = start.toDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push({ start, end })
      return acc
    }, {}) ?? {}

  return (
    <>
      <div className='w-96'>
        <Timezone />
      </div>
      {Object.keys(availabilityByDate).map((date) => {
        return (
          <div key={date}>
            <h2 suppressHydrationWarning>
              {new Date(date).toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <ul>
              {availabilityByDate[date].map((slot) => {
                return (
                  <li key={slot.start.toISOString()}>
                    <button
                      suppressHydrationWarning
                      type='button'
                      onClick={() => {
                        dispatch({
                          type: "setSelectedSlot",
                          payload: slot,
                        })
                        dispatch({
                          type: "setModalOpen",
                          payload: true,
                        })
                      }}>
                      {slot.start.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                      })}{" "}
                      -{" "}
                      {slot.end.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </>
  )
}

export default SchedulePicker
