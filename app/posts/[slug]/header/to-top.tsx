import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline"
import { clsx } from "clsx"
import { usePostContext } from "../context"

export default function ToTop() {
  const { headerVisible } = usePostContext()
  return (
    <a
      href="#top"
      className={clsx(
        "hocus:ring-4 absolute bottom-0 right-0 overflow-hidden rounded-full bg-blue-700 transition-[width,height,padding]",
        {
          "h-0 w-0 p-0 delay-0": headerVisible !== false,
          "h-8 w-8 p-2 ml-4 delay-300": headerVisible === false,
        }
      )}>
      <ChevronDoubleUpIcon className="mx-auto h-4 w-4 stroke-2 text-white" />
    </a>
  )
}
