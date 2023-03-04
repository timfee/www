"use client"

import type { Dispatch, PropsWithChildren } from "react"
import { useContext, createContext, useReducer } from "react"

import { createAvailability } from "@/utils/scheduler/availability"
import { mapStringsToDates } from "@/utils/scheduler/helpers"
import type {
  DateAsStringInterval,
  DateInterval,
} from "@/utils/scheduler/types"

const INITIAL_STATE = {
  start: new Date(),
  end: new Date(),
  timeZone: "",
  modalOpen: false,
  duration: 30,
}

type ScheduleState = {
  // user settings
  modalOpen: boolean
  duration: number
  timeZone: string
  selectedDate?: Date
  selectedSlot?: DateInterval
  // internal storage
  start: Date
  end: Date
  busy?: DateInterval[]
  availability?: DateInterval[]
}
type ScheduleAction =
  | {
      type: "setTimeZone"
      payload: string
    }
  | {
      type: "setModalOpen"
      payload: boolean
    }
  | {
      type: "setSelectedSlot"
      payload: DateInterval
    }
  | {
      type: "setSelectedDate"
      payload: Date
    }
  | {
      type: "setDuration"
      payload: number
    }

const ScheduleContext = createContext<ScheduleState>(INITIAL_STATE)
const ScheduleDispatchContext = createContext<Dispatch<ScheduleAction>>(
  () => null
)

export default function ScheduleProvider({
  children,
  busy,
  duration,
  start: _startString,
  end: _endString,
}: PropsWithChildren<{
  duration: number
  busy: DateAsStringInterval[]
  start: string
  end: string
}>) {
  // eslint-disable-next-line new-cap
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()
  const start = new Date(_startString)
  const end = new Date(_endString)
  const availability = createAvailability({
    start,
    end,
    duration,
  })
  const [state, dispatch] = useReducer(scheduleReducer, {
    // immutable
    start,
    end,
    busy: mapStringsToDates(busy),
    // default
    duration,
    timeZone,
    modalOpen: false,
    // derived
    selectedDate: new Date(availability.at(0)?.start ?? ""),
    availability,
  })

  return (
    <ScheduleContext.Provider value={state}>
      <ScheduleDispatchContext.Provider value={dispatch}>
        {children}
      </ScheduleDispatchContext.Provider>
    </ScheduleContext.Provider>
  )
}

export function useScheduleContext(): ScheduleState {
  if (!useContext(ScheduleContext)) {
    throw new Error(
      "ScheduleContext is not defined. Did you forget to wrap your component in ScheduleContextProvider?"
    )
  }
  return useContext(ScheduleContext)
}
export function useScheduleDispatchContext(): Dispatch<ScheduleAction> {
  if (!useContext(ScheduleDispatchContext)) {
    throw new Error(
      "ScheduleDispatchContext is not defined. Did you forget to wrap your component in ScheduleDispatchContextProvider?"
    )
  }
  return useContext(ScheduleDispatchContext)
}

function scheduleReducer(
  state: ScheduleState,
  action: ScheduleAction
): ScheduleState {
  switch (action.type) {
    case "setTimeZone": {
      return { ...state, timeZone: action.payload }
    }
    case "setModalOpen": {
      return { ...state, modalOpen: action.payload }
    }
    case "setDuration": {
      return {
        ...state,
        availability: createAvailability({
          start: state.start,
          end: state.end,
          duration: action.payload,
        }),
        duration: action.payload,
      }
    }
    case "setSelectedSlot": {
      return { ...state, selectedSlot: action.payload }
    }
    case "setSelectedDate": {
      return { ...state, selectedDate: action.payload }
    }
    default: {
      return state
    }
  }
}
