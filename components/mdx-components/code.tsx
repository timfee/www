import { HTMLProps } from "react"

export function Code({ children, ...properties }: HTMLProps<HTMLElement>) {
  return (
    <code
      {...properties}
      dangerouslySetInnerHTML={{ __html: children?.toString() ?? "" }}
    />
  )
}
