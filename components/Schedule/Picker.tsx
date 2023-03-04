"use client"

import { utcToZonedTime } from "date-fns-tz"

import { Container } from "../Container"
import { useScheduleContext, useScheduleDispatchContext } from "./Context"
import { availabilityByDate } from "@/utils/scheduler/helpers"
import { returnAvailableSlots } from "@/utils/scheduler/offers"

import { Confirmer, Calendar, Duration, Timezone } from "./"

export default function SchedulePicker() {
  const { busy, availability, timeZone, selectedDate } = useScheduleContext()
  const dispatch = useScheduleDispatchContext()
  const offers = availabilityByDate({
    timeZone,
    availability: returnAvailableSlots({
      allSlots: availability,
      busySlots: busy,
    }),
  })

  const dateKeys = Object.keys(offers ?? {})

  const start =
    dateKeys.length > 0 ? utcToZonedTime(new Date(dateKeys[0]), timeZone) : null

  const end =
    dateKeys.length > 0
      ? utcToZonedTime(new Date(dateKeys[dateKeys.length - 1]), timeZone)
      : null

  return (
    <Container>
      <Confirmer />
      <div className='flex justify-between max-w-md mx-auto'>
        <Timezone />
        <Duration />
      </div>

      {start && end && <Calendar start={start} end={end} />}

      <section className='flex flex-col space-y-4 w-[12rem] mx-auto'>
        {selectedDate &&
          offers &&
          offers[selectedDate.toDateString()]?.map((slot) => {
            return <TimeButton key={slot.start.toISOString()} slot={slot} />
          })}
      </section>
    </Container>
  )

  function TimeButton({
    slot: { start: _zonedStart, end: _zonedEnd },
    ...props
  }: {
    slot: {
      start: Date
      end: Date
    }
  }) {
    const start = utcToZonedTime(_zonedStart, timeZone)
    const end = utcToZonedTime(_zonedEnd, timeZone)
    return (
      <button
        {...props}
        suppressHydrationWarning
        type='button'
        className='rounded-md bg-astronaut-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-astronaut-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-astronaut-600'
        onClick={() => {
          dispatch({
            type: "setSelectedSlot",
            payload: {
              start,
              end,
            },
          })
          dispatch({
            type: "setModalOpen",
            payload: true,
          })
        }}>
        {start.toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        })}{" "}
        -{" "}
        {end.toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        })}
      </button>
    )
  }
}
