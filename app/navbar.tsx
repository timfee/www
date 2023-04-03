"use client"

import { useSelectedLayoutSegment } from "next/navigation"
import Link from "next/link"
import { clsx } from "clsx"
import Headshot from "@/components/headshot"
import { allPages } from "@/.contentlayer/generated"

export default function Navbar() {
  const segment = useSelectedLayoutSegment()

  return (
    <nav
      className="mx-auto mt-12 flex max-w-3xl items-end justify-between"
      aria-label="Global">
      <Headshot className="flex !w-28 items-end sm:!w-auto" width="150" />
      <div className="flex items-end gap-6 px-3 sm:px-0">
        {allPages
          .sort((a, b) => (a.order > b.order ? 1 : -1))
          .map((item) => (
            <Link
              aria-current={
                item.url.slice("/".length) === (segment ?? "")
                  ? "page"
                  : undefined
              }
              key={item._id}
              href={item.url}
              className={clsx("rounded-xl border-2 transition-all", {
                "border-b-4 border-slate-700 text-slate-700 px-4 py-2 font-semibold underline hocus:border-b-8 hocus:ring-4":
                  item.url.slice("/".length) !== (segment ?? ""),
                "border-slate-950 bg-slate-700 shadow-inner shadow-slate-950 px-4 py-2.5 text-slate-100 font-semibold":
                  item.url.slice("/".length) === (segment ?? ""),
              })}>
              {item.navTitle}
            </Link>
          ))}
      </div>
    </nav>
  )
}
