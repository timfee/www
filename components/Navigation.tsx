"use client"

import {
  HomeIcon as HomeIconInactive,
  UserCircleIcon as BioIconInactive,
  DocumentTextIcon as PostsIconInactive,
} from "@heroicons/react/24/outline"
import {
  HomeIcon as HomeIconActive,
  UserCircleIcon as BioIconActive,
  DocumentTextIcon as PostsIconActive,
} from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"

import Container from "./Container"
import cx from "@/utils/clsx"

const NAVBAR_ITEMS = [
  {
    title: "home",
    path: "/",
    href: "/",
    icons: {
      active: HomeIconActive,
      inactive: HomeIconInactive,
    },
  },
  {
    title: "bio",
    path: "bio",
    href: "/bio",
    icons: {
      active: BioIconActive,
      inactive: BioIconInactive,
    },
  },
  {
    title: "posts",
    path: "posts",
    href: "/posts",
    icons: {
      active: PostsIconActive,
      inactive: PostsIconInactive,
    },
  },
]

const ICON_PROPERTIES = {
  className: "w-6 h-6 mr-2",
}

export default function Navigation() {
  const pathName = usePathname()
  const layoutSegment = useSelectedLayoutSegment()

  const active = layoutSegment ?? pathName

  return (
    <Container
      as='header'
      className='bg-schist-100 mt-4 rounded-2xl shadow-sm shadow-schist-200'>
      <nav className='mx-auto flex grow space-x-6 justify-center'>
        {NAVBAR_ITEMS.map(
          ({
            href,
            path,
            title,
            icons: { active: Active, inactive: Inactive },
          }) => (
            <Link
              className={cx(
                "pl-3 pr-4 py-2 my-4 font-semibold rounded-full flex items-center",
                "aria-current:bg-schist-600 aria-current:text-white",
                "hover:bg-schist-100 hover:ring-1 hover:ring-schist-200"
              )}
              key={href + title}
              href={href}
              {...(active === path && { "aria-current": "page" })}>
              {active === path ? (
                <Active {...ICON_PROPERTIES} />
              ) : (
                <Inactive {...ICON_PROPERTIES} />
              )}
              <span>{title}</span>
            </Link>
          )
        )}
      </nav>
    </Container>
  )
}
