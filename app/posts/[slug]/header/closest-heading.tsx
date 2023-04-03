import { clsx } from "clsx"
import { usePostContext } from "../context"

export default function ClosestHeading() {
  const { headerVisible, closestHeading } = usePostContext()

  return (
    <div
      className={clsx(
        "mt-2 text-[0.9rem] font-semibold text-slate-600 transition-all duration-300 ease-in-out",
        {
          "text-2xl": headerVisible !== false,
          "text-lg": headerVisible === false,
        }
      )}>
      {!headerVisible && closestHeading && (
        <>
          <a
            className="mr-1.5 select-none text-blue-600/60"
            href={`#${closestHeading.id}`}>
            #
          </a>
          <span
            dangerouslySetInnerHTML={{ __html: closestHeading.innerHTML }}
          />
        </>
      )}
    </div>
  )
}
