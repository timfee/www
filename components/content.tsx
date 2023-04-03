"use client"

import { useMDXComponent } from "next-contentlayer/hooks"
import { PropsWithChildren } from "react"

import { motion } from "framer-motion"
import Components from "@/components/mdx-components"

export default function Content({
  children,
  className,
  animated,
}: PropsWithChildren<{ className?: string; animated?: boolean }>) {
  const Content = useMDXComponent(children?.toString() ?? "")

  const { animated: animatedComponents, ...commonComponents } = Components
  if (animated) {
    return (
      <motion.div
        animate="show"
        initial="hidden"
        className={className}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}>
        <Content components={{ ...animatedComponents, ...commonComponents }} />
      </motion.div>
    )
  }

  return <Content components={{ ...animatedComponents, ...commonComponents }} />
}
