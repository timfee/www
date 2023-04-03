import { ArrowSmallUpIcon } from "@heroicons/react/20/solid"
import { clsx } from "clsx"
import Link from "next/link"
import { forwardRef } from "react"

type DateLineType = {
  isoDateString: string
  className?: string
}

const dateLineFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
}

const DateLine = forwardRef<HTMLParagraphElement, DateLineType>(
  function DateLine({ isoDateString, className }, ref) {
    return (
      <div className="mx-auto mb-4 mt-8 flex max-w-3xl items-center justify-between px-3">
        <Link
          href="/posts"
          className="hocus:underline hocus:text-blue-500 flex space-x-1   text-blue-800">
          <ArrowSmallUpIcon className="h-5 w-5" />
          <span className="text-sm">Back to posts</span>
        </Link>

        <p
          ref={ref}
          className={clsx(
            " text-right font-serif text-base italic text-gray-700",
            className
          )}>
          {new Date(isoDateString).toLocaleDateString([], dateLineFormat)}
        </p>
      </div>
    )
  }
)
export default DateLine
