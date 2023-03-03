"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import type { FC } from "react"

const AnimatedText: FC = () => {
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

  return (
    <motion.div
      animate='show'
      initial='hidden'
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.25 } },
      }}>
      <motion.h1 {...animatedProps}>
        Hi friend<em>,</em>{" "}
        <span className='whitespace-nowrap'>
          I<em>’</em>m Tim<span className='sr-only'> Feeley</span>
          <em>!</em>
        </span>
      </motion.h1>
      <motion.h2 {...animatedProps}>I believe in technology </motion.h2>
      <motion.p {...animatedProps}>
        And its potential to amplify what humans are capable of accomplishing.
        It makes the world a little smaller—and our place in it a little larger.
      </motion.p>
      <motion.h2 {...animatedProps}>I believe in people</motion.h2>
      <motion.p {...animatedProps}>
        Each app and every device we use is created by people, for people. Not
        merely <em>users</em>, but humans of all backgrounds, abilities and
        dreams.
      </motion.p>
      <motion.h2 {...animatedProps}>I believe in you</motion.h2>
      <motion.p {...animatedProps}>
        Nobody’s perfect. But together, we can make better mistakes tomorrow.
      </motion.p>
    </motion.div>
  )
}

export default AnimatedText
