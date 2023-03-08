import { Dialog } from "@headlessui/react"

import {
  useAtom,
  durationAtom,
  modalStatusAtom,
  selectedTimeAtom,
  timeZoneAtom,
} from "../store"
import { Input, Modal, Options } from "@/components/Elements"
import SpinnerSvg from "@/components/Elements/SpinnerSvg"
import { formatLocalDate, formatLocalTime } from "@/utils/scheduler/helpers"

export default function RequestForm() {
  const [selectedTime] = useAtom(selectedTimeAtom)
  const [timeZone] = useAtom(timeZoneAtom)
  const [duration] = useAtom(durationAtom)

  const [modal, setModal] = useAtom(modalStatusAtom)

  if (!selectedTime || !timeZone) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>
  }

  const dateString = formatLocalDate(selectedTime.start, { timeZone })
  const startString = formatLocalTime(selectedTime.start, { timeZone })
  const endString = formatLocalTime(selectedTime.end, {
    timeZone,
    timeZoneName: "short",
  })

  return (
    <Modal
      open={modal !== "closed"}
      setOpen={(value) => {
        setModal(value ? "open" : "closed")
      }}
      submitButton={
        modal === "open" || modal === "busy"
          ? {
              action: (event) => {
                event.preventDefault()
                setModal("busy")
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
                    if (json.success) {
                      setModal("finished")
                    } else {
                      setModal("error")
                    }
                  })
                  .catch(() => {
                    setModal("error")
                  })
              },
              caption: "Confirm",
            }
          : {
              action: () => {
                setModal("closed")
              },
              caption: "Close",
            }
      }
      cancelButton={
        modal === "open"
          ? {
              caption: "Cancel",
            }
          : undefined
      }>
      {(modal === "busy" && (
        <SpinnerSvg
          height={48}
          width={48}
          className='mx-auto mt-12 fill-casal-300  text-slate-100'
        />
      )) ||
        (modal === "error" && (
          <>
            <h1 className='font-semibold text-lg mb-3'>Sorry!</h1>
            <p>There was an error booking an appointment.</p>
            <p>
              Please send me an email and we can schedule it the old fashioned
              way!
            </p>
          </>
        )) ||
        (modal === "finished" && (
          <>
            {" "}
            <h1 className='font-semibold text-lg mb-3'>Thanks!</h1>
            <p>I’ll confirm your appointment ASAP.</p>
          </>
        )) ||
        (modal === "open" && (
          <>
            <Dialog.Title
              as='h3'
              className='text-lg font-semibold text-slate-900'>
              Confirm your appointment
            </Dialog.Title>
            <div className='mt-4 bg-astronaut-50 rounded-md p-4 text-sm sm:text-base'>
              {Object.entries(selectedTime).map(([key, value]) => (
                <input
                  key={key}
                  type='hidden'
                  name={key}
                  value={value.toISOString()}
                />
              ))}
              <input type='hidden' name='duration' value={duration} />
              <input type='hidden' name='timeZone' value={timeZone} />
              <p className='text-slate-800 font-bold'>{dateString}</p>
              <p className='text-slate-800'>
                {startString} - {endString}
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
                  },
                  {
                    id: "phone",
                    title: "Phone",
                  },
                ]}
              />
            </div>
          </>
        ))}
    </Modal>
  )
}
