import Image from "next/image"
import type { HTMLProps } from "react"

import source from "./selfie.png"

export default function Selfie({
  height: _height,
  width: _width,
}: HTMLProps<HTMLImageElement>) {
  const ASPECT_RATIO = 612 / 760

  let height = _height ? Number.parseInt(_height.toString()) : undefined
  let width = _width ? Number.parseInt(_width.toString()) : undefined

  if (height) {
    width = Math.round(height * ASPECT_RATIO)
  } else if (width) {
    height = Math.round(width / ASPECT_RATIO)
  } else {
    throw new Error("<Selfie /> must have either a height or width")
  }

  return (
    <Image
      priority
      height={height}
      width={width}
      src={source}
      alt="Tim Feeley"
    />
  )
}
