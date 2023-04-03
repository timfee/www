import { clsx } from "clsx"
import { PropsWithChildren } from "react"
import { usePostContext } from "../context"

type StickyBoxProps = {
  className?: string
}

export default function StickyBox({
  className,
  children,
}: PropsWithChildren<StickyBoxProps>) {
  const { headerVisible } = usePostContext()
  return (
    <div
      className={clsx(
        "sticky top-0 z-10 bg-opacity-90 backdrop-blur",
        className,
        {
          "bg-white": headerVisible !== false,
          "bg-slate-200 pt-4": headerVisible === false,
        }
      )}>
      {children}
    </div>
  )
}
