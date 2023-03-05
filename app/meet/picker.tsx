"use client"

import { useEffect } from "react"

import Calendar from "./calendar"
import RequestModal from "./request/form"
import TimeButtons from "./request/time"
import {
  useAtom,
  busyTimesAtom,
  endDateAtom,
  startDateAtom,
  timeZoneAtom,
} from "./store"
import Container from "@/components/Container"
import { Duration, Timezone } from "@/components/Elements"
import type { DateAsStringInterval } from "@/utils/scheduler"
import { mapStringsToDates } from "@/utils/scheduler/helpers"

export default function SchedulePicker({
  start,
  end,
  busy,
}: DateAsStringInterval & {
  busy: DateAsStringInterval[]
}) {
  const [, setBusyTimes] = useAtom(busyTimesAtom)
  const [, setStartDate] = useAtom(startDateAtom)
  const [, setEndDate] = useAtom(endDateAtom)
  const [, setTimeZone] = useAtom(timeZoneAtom)

  // useHydrateAtoms([
  //   [busyTimesAtom, mapStringsToDates(busy)],
  //   [startDateAtom, new Date(start)],
  //   [endDateAtom, new Date(end)],
  //   [timeZoneAtom, Intl.DateTimeFormat().resolvedOptions().timeZone],
  // ])

  useEffect(() => {
    setStartDate(new Date(start))
    setEndDate(new Date(end))
    setBusyTimes(mapStringsToDates(busy))
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    // intentional; we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <RequestModal />
      <section className='mb-8 mt-4'>
        <Calendar />
      </section>
      <section className='flex justify-between space-x-8 mx-auto '>
        <Timezone />
        <Duration />
      </section>
      <section suppressHydrationWarning>
        <TimeButtons />
      </section>
    </Container>
  )
}
