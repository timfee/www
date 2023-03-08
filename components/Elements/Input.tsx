import type { HTMLProps } from "react"

export default function Input({
  name,
  type,
  title,
  ...props
}: HTMLProps<HTMLInputElement>) {
  if (!name) {
    throw new Error("Input component requires a name prop")
  }

  return (
    <div>
      <label
        id={`label-${name}`}
        htmlFor={`field-${name}`}
        className='block text-sm sm:text-base font-semibold text-slate-900'>
        {title}
      </label>
      <div className='mt-1.5'>
        <input
          type={type}
          name={name}
          aria-labelledby={`label-${name}`}
          id={`field-${name}`}
          className='block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-astronaut-600 sm:text-sm sm:leading-6'
          {...props}
        />
      </div>
    </div>
  )
}
