/* eslint-disable promise/prefer-await-to-callbacks */
/* eslint-disable promise/prefer-await-to-then */

import { Dialog } from "@headlessui/react"

import { Input, Modal, Options } from "../Elements"
import { useScheduleContext, useScheduleDispatchContext } from "./Context"

export default function Confirmer() {
  const { selectedSlot, modalOpen, duration, timeZone } = useScheduleContext()
  const dispatch = useScheduleDispatchContext()

  const date = selectedSlot?.start.toLocaleDateString([], {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    timeZone,
  })
  const start = selectedSlot?.start.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    timeZone,
  })
  const end = selectedSlot?.end.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone,
  })

  return (
    <Modal
      open={modalOpen}
      setOpen={(value) => {
        dispatch({
          type: "setModalOpen",
          payload: value,
        })
      }}
      submitButton={{
        action: (event) => {
          event.preventDefault()

          fetch(`/meet/request`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              Object.fromEntries(new FormData(event.currentTarget))
            ),
          })
            .then(async (data) => {
              const json = await data.json()
              console.log(json)
            })
            .catch((error) => {
              // eslint-disable-next-line no-alert
              alert(error)
            })
        },
        caption: "Confirm",
      }}
      cancelButton={{
        caption: "Cancel",
      }}>
      <Dialog.Title as='h3' className='text-lg font-semibold text-slate-900'>
        Confirm your appointment
      </Dialog.Title>
      <div className='mt-4 bg-astronaut-50 rounded-md p-4 text-sm sm:text-base'>
        <input
          type='hidden'
          name='start'
          value={selectedSlot?.start.toISOString()}
        />
        <input
          type='hidden'
          name='end'
          value={selectedSlot?.end.toISOString()}
        />
        <input type='hidden' name='duration' value={duration} />
        <input type='hidden' name='timeZone' value={timeZone} />
        <p className='text-slate-800 font-bold'>{date}</p>
        <p className='text-slate-800'>
          {start} - {end}
        </p>
      </div>
      <div className='mt-4 space-y-4'>
        <Input
          name='name'
          title='Your name'
          required
          autoComplete='name'
          placeholder='Jane Doe'
          type='text'
        />
        <Input
          name='email'
          title='Email address'
          required
          autoComplete='email'
          placeholder='you@example.com'
          type='email'
        />
        <Options
          name='location'
          title='How would you like to meet?'
          options={[
            {
              id: "meet",
              title: "Google Meet",
              description: "I’ll set up a meeting ID",
            },
            {
              id: "phone",
              title: "Phone",
              description: "I’ll add my number to the invite",
            },
          ]}
        />
      </div>
    </Modal>
  )
}
