"use client"

import { motion, useScroll } from "framer-motion"
import { PropsWithChildren } from "react"

import { usePostContext } from "../context"
import DateLine from "./dateline"
import Title from "./title"
import StickyBox from "./stickybox"
import ToTop from "./to-top"
import ClosestHeading from "./closest-heading"

type HeaderProps = {
  date: string
}

export default function Header({
  children,
  date,
}: PropsWithChildren<HeaderProps>) {
  const { headerVisible, breakpointRef } = usePostContext()

  const { scrollYProgress } = useScroll()

  return (
    <>
      <DateLine isoDateString={date} ref={breakpointRef} />
      <StickyBox className="mb-2">
        <header className="mx-auto max-w-2xl px-3">
          <div className="relative">
            <Title>{children}</Title>
            <ToTop />
          </div>
          <ClosestHeading />
        </header>
        <motion.div
          className="my-1 h-1 origin-top-left bg-blue-500 transition-all ease-in-out"
          style={{
            scaleX: scrollYProgress,
            display: headerVisible ? "none" : "block",
          }}
        />
      </StickyBox>
    </>
  )
}
