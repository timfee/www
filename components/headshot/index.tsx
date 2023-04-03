import Image from "next/image"
import type { HTMLProps } from "react"

import Link from "next/link"
import source from "./image.png"

export default function Headshot({
  height: _height,
  width: _width,
  className,
}: HTMLProps<HTMLImageElement>) {
  const ASPECT_RATIO = 640 / 647

  let height = _height ? Number.parseInt(_height.toString()) : undefined
  let width = _width ? Number.parseInt(_width.toString()) : undefined

  if (height) {
    width = Math.round(height * ASPECT_RATIO)
  } else if (width) {
    height = Math.round(width / ASPECT_RATIO)
  } else {
    throw new Error("Headshot must have either a height or width")
  }

  return (
    <Link href="/" className={className} style={{ width, height }}>
      <Image
        priority
        height={height}
        width={width}
        src={source}
        alt="Tim Feeley"
      />
    </Link>
  )
}
