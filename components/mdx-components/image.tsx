import { ImageProps, default as Img } from "next/image"

export function Image({ alt, ...properties }: ImageProps) {
  return <Img alt={alt} className="rounded-lg" {...properties} />
}
