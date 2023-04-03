import { clsx } from "clsx"
import { PropsWithChildren } from "react"
import { usePostContext } from "../context"

type TitleProps = {
  className?: string
}

export default function Title({
  className,
  children,
}: PropsWithChildren<TitleProps>) {
  const { headerVisible } = usePostContext()
  return (
    <h1
      className={clsx(
        "transform-gpu font-bold transition-all duration-300 ease-in-out",
        className,
        {
          "text-4xl": headerVisible !== false,
          "text-xl mr-14": headerVisible === false,
        }
      )}>
      {children}
    </h1>
  )
}
