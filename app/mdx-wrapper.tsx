import { useMDXComponent } from "next-contentlayer/hooks"
import Image from "next/image"
import { ReactNode } from "react"
import Selfie from "./selfie"
import Timeline from "./timeline"

type CodeProps = {
  children?: ReactNode
}

function Code({ children, ...props }: CodeProps) {
  return (
    <code {...props} dangerouslySetInnerHTML={{ __html: children ?? "" }} />
  )
}

export default function Mdx({ children }: { children: string }) {
  const Mdx = useMDXComponent(children)
  return <Mdx components={{ Image, Selfie, Timeline, code: Code }} />
}
