"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { Container } from "./Container"

const NAVBAR_ITEMS = [
  {
    title: "home",
    path: "/",
    href: "/",
  },
  {
    title: "bio",
    path: "/bio",
    href: "/bio",
  },
  {
    title: "posts",
    path: "/posts",
    href: "/posts",
  },
]

export default function Navigation({ className = "" }) {
  const asPath = useSelectedLayoutSegment()

  return (
    <Container as="header" className="bg-white">
      <nav className="mx-auto flex space-x-8">
        {NAVBAR_ITEMS.map(({ href, title }) => (
          <Link
            key={href + title}
            href={href}
            {...(asPath === href && { "aria-current": "page" })}
          >
            {title}
          </Link>
        ))}
      </nav>
    </Container>
  )
}
