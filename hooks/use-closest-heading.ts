import { useEffect, useMemo, useState } from "react"

type UseClosestHeadingProps = {
  articleRef: React.RefObject<HTMLElement>
}

export default function useClosestHeading({
  articleRef,
}: UseClosestHeadingProps) {
  const [closestHeading, setClosestHeading] = useState<HTMLElement>()

  useEffect(() => {
    if (!articleRef.current) {
      return
    }
    const articleRefCurrent = articleRef.current

    const observer = new IntersectionObserver((entries) => {
      let closest: HTMLElement | undefined

      for (const entry of entries) {
        if (entry.boundingClientRect.y < 0) {
          closest = entry.target as HTMLElement
        }
      }

      if (closest) setClosestHeading(closest)
    })

    const headings = articleRefCurrent.querySelectorAll("h1, h2, h3, h4")
    for (const heading of headings) {
      observer.observe(heading)
    }

    return () => {
      for (const heading of headings) {
        observer.unobserve(heading)
      }
    }
  }, [articleRef])

  return useMemo(() => {
    console.log(closestHeading)
    return closestHeading
  }, [closestHeading])
}
