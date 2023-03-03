"use client"

import type { Dispatch, FC, PropsWithChildren } from "react"
import { useContext } from "react"
import { createContext, useReducer } from "react"

import Modal from "./Modal"
import { mapStringsToDates } from "@/utils/scheduler/helpers"
import type {
  DateAsStringInterval,
  DateInterval,
} from "@/utils/scheduler/types"

const INITIAL_STATE = {
  timeZone: "",
  modalOpen: false,
}

type ScheduleState = {
  timeZone: string
  modalOpen: boolean
  name?: string
  email?: string
  availability?: DateInterval[]
  selectedSlot?: DateInterval
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
      type: "setName"
      payload: string
    }
  | {
      type: "setEmail"
      payload: string
    }
  | {
      type: "setAvailability"
      payload: DateAsStringInterval[]
    }
  | {
      type: "setSelectedSlot"
      payload: DateInterval
    }

const ScheduleContext = createContext<ScheduleState>(INITIAL_STATE)
const ScheduleDispatchContext = createContext<Dispatch<ScheduleAction>>(
  () => null
)

const scheduleReducer = (
  state: ScheduleState,
  action: ScheduleAction
): ScheduleState => {
  switch (action.type) {
    case "setTimeZone": {
      return { ...state, timeZone: action.payload }
    }
    case "setModalOpen": {
      return { ...state, modalOpen: action.payload }
    }
    case "setName": {
      return { ...state, name: action.payload }
    }
    case "setEmail": {
      return { ...state, email: action.payload }
    }
    case "setAvailability": {
      return { ...state, availability: mapStringsToDates(action.payload) }
    }
    case "setSelectedSlot": {
      return { ...state, selectedSlot: action.payload }
    }
    default: {
      return state
    }
  }
}

export const ScheduleProvider: FC<
  PropsWithChildren<{ availability: DateAsStringInterval[] }>
> = ({ children, availability }) => {
  const [state, dispatch] = useReducer(scheduleReducer, {
    ...INITIAL_STATE,
    // eslint-disable-next-line new-cap
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    availability: mapStringsToDates(availability),
  })

  return (
    <ScheduleContext.Provider value={state}>
      <ScheduleDispatchContext.Provider value={dispatch}>
        <Modal
          open={state.modalOpen}
          setOpen={(open) => {
            dispatch({
              type: "setModalOpen",
              payload: open,
            })
          }}
        />
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
