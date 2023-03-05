"use client"

import { Provider } from "jotai"
import type { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>
}
