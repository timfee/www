"use client"

import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { usePathname, useSearchParams } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
    api_host:
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_POSTHOG_HOST
        : "https://timfeeley.com/in",
  })
}

export default function PHProvider({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const searchParameters = useSearchParams()
  // Track pageviews
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParameters.toString()) {
        url = url + `?${searchParameters.toString()}`
      }
      posthog.capture("$pageview", {
        $current_url: url,
      })
    }
  }, [pathname, searchParameters])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
