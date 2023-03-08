import { Dialog, Transition } from "@headlessui/react"
import type { FormEvent, PropsWithChildren } from "react"
import { Fragment } from "react"

export default function Modal({
  children,
  open,
  setOpen,
  submitButton: { caption: submitCaption, action: submitAction },
  cancelButton,
}: PropsWithChildren<{
  open: boolean
  setOpen: (open: boolean) => void
  submitButton: {
    caption: string
    action: (event: FormEvent<HTMLFormElement>) => void
  }
  cancelButton?: {
    caption: string
  }
}>) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <form onSubmit={submitAction}>
                  {children}
                  <div className='mt-5 sm:mt-4 sm:flex sm:justify-start sm:flex-row-reverse'>
                    <button
                      type='submit'
                      className='inline-flex w-full justify-center rounded-md bg-astronaut-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-astronaut-500 sm:w-auto'>
                      {submitCaption}
                    </button>
                    {cancelButton && (
                      <button
                        type='button'
                        className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mr-3 sm:mt-0 sm:w-auto'
                        onClick={() => {
                          setOpen(false)
                        }}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
