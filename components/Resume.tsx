"use client"

import { ArrowDownIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import type { FC, HTMLProps } from "react"

import cx from "@/lib/classes"
import { formatDate } from "@/lib/pdfutils"
import resume from "@/resume.json"

export const Resume: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
  return (
    <aside
      className={cx(
        "not-prose mx-auto max-w-lg space-y-4 rounded-2xl border border-slate-100 bg-white p-6",
        className
      )}>
      {resume.work.slice(0, -1).map((company) => (
        <div
          key={`${company.name}-${company.startDate}`}
          className='flex items-center gap-4'>
          <div className='relative mt-1 flex h-12 w-12 flex-none rounded-full shadow-md shadow-slate-800/5 ring-1 ring-slate-900/5 '>
            <Image
              src={`/${company.name.replaceAll(" ", "").toLowerCase()}.png`}
              className='rounded-full'
              alt={company.name}
              sizes='319px'
              fill
            />
          </div>
          <div className='flex grow flex-col'>
            <div className='flex items-center justify-between'>
              <div className='grow font-semibold leading-none'>
                {company.name}
              </div>
              <div
                className='text-xs text-slate-400'
                aria-label={`${company.startDate ?? company.startDate} until ${
                  formatDate(company.endDate) ?? formatDate(company.endDate)
                }`}>
                <time dateTime={company.startDate}>
                  {formatDate(company.startDate)}
                </time>{" "}
                <span aria-hidden='true'>—</span>{" "}
                <time dateTime={company.endDate}>
                  {formatDate(company.endDate)}
                </time>
              </div>
            </div>
            <div className='mt-1 text-sm leading-none text-slate-500'>
              {company.position}
            </div>
          </div>
        </div>
      ))}
      <div className='flex items-center justify-center gap-4 border-t border-slate-200'>
        <button
          type='button'
          className='mt-4 flex items-center space-x-2 text-sm text-astronaut-500 underline'>
          <ArrowDownIcon className='h-4 w-4 text-astronaut-300' />
          <span>Download Resume (PDF)</span>
        </button>
      </div>
    </aside>
  )
}
