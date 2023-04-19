"use client"

import { useMDXComponent } from "next-contentlayer/hooks"
import Image from "next/image"
import { FC, ReactNode } from "react"
import { HTMLMotionProps, motion } from "framer-motion"
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

export function MotionMdx({ children }: { children: string }) {
  const Mdx = useMDXComponent(children)
  return (
    <motion.div
      animate="show"
      initial="hidden"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}>
      <Mdx
        components={{
          Image,
          Selfie,
          Timeline,
          code: Code,
          h1: H1,
          h2: H2,
          p: P,
        }}
      />
    </motion.div>
  )
}

const animatedProps: HTMLMotionProps<"div"> = {
  variants: {
    hidden: { opacity: 0, y: 10 },
    show: {
      transition: {
        duration: 0.5,
      },
      opacity: 1,
      y: 0,
    },
  },
}

const H1: FC = (props) => <motion.h1 {...props} {...animatedProps} />
const H2: FC = (props) => <motion.h2 {...props} {...animatedProps} />
const P: FC = (props) => <motion.p {...props} {...animatedProps} />
