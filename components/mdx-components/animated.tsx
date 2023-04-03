"use client"

import { motion } from "framer-motion"
import { FC } from "react"

const animatedProperties = {
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

type AnimatedElements = Record<string, FC>

const elements: AnimatedElements = {
  h1: (properties) => (
    <motion.h1 className="sticky" {...properties} {...animatedProperties} />
  ),
  h2: (properties) => <motion.h2 {...properties} {...animatedProperties} />,
  h3: (properties) => <motion.h3 {...properties} {...animatedProperties} />,
  p: (properties) => <motion.p {...properties} {...animatedProperties} />,
  li: (properties) => <motion.li {...properties} {...animatedProperties} />,
}

export { elements }
