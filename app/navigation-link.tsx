"use client"

import { clsx } from "clsx"
import Link, { LinkProps } from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"
import { HTMLProps } from "react"

export function NavLink({
  children,
  href,
}: LinkProps & HTMLProps<HTMLAnchorElement>) {
  const segments = useSelectedLayoutSegments()
  const currentUrl =
    !segments || segments.length === 0 ? "/" : "/" + segments[0]

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative flex origin-center underline underline-offset-2 ring-0 transition hover:scale-110 hover:font-bold hover:text-slate-900 hover:decoration-blue-500",
          {
            "font-bold text-black decoration-red-500": href === currentUrl,
            "text-slate-800 decoration-slate-500/40": href !== currentUrl,
          }
        )}>
        {children}
      </Link>
    </li>
  )
}
