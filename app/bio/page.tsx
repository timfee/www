import { Metadata } from "next"
import Image from "next/image"
import resume from "@/resume.json"
import { ArrowDownIcon, BriefcaseIcon } from "@heroicons/react/24/outline"

import { formatDate } from "@/lib/pdfutils"
import { Button } from "@/components/Button"
import { Container } from "@/components/Container"

export default function ResumePage() {
  return (
    <Container className="prose prose-lg prose-bio mt-24">
      <h1 className="text-punch-700">
        <span className="whitespace-nowrap">
          Hi there<em>,</em>
        </span>{" "}
        <span className="whitespace-nowrap">
          I<em>’</em>m Tim
          <span className="sr-only"> Feeley</span>
          <em>!</em>
        </span>
      </h1>
      <p>
        I’m originally from the East Coast, and when Silicon Valley came calling
        in 2016, I answered and have been living in the Bay Area ever since.
      </p>
      <p>
        From coast to coast and over the past 20 years, I’ve worked alongside
        talented teams to bring our best ideas to life and deliver outcomes that
        make a real impact.
      </p>
      <p>Some of my most recent experience:</p>
      <Resume />
      <p>
        In my free time, I love spending time with my two hairless cats, Boolean
        and Felix, catching a BroadwaySF show, and brushing up on my React and
        web development skills.
      </p>
      <p>
        I’m constantly inspired by the fast-paced and ever-changing nature of
        the tech industry. I believe that we can make a positive impact on the
        world by leveraging technology to solve real-world problems and create
        products that people love to use.
      </p>
      <p>
        I’m always looking for new opportunities to learn, grow, and make a
        difference in the world. None of us have it all figured out, but
        together, we can make better mistakes tomorrow.
      </p>
    </Container>
  )
}

function Resume() {
  return (
    <aside className="not-prose mx-auto max-w-lg space-y-4 rounded-2xl border border-slate-100 bg-white p-6">
      {resume.work.slice(0, -1).map((company, companyIndex) => (
        <div key={companyIndex} className="flex items-center gap-4">
          <div className="relative mt-1 flex h-12 w-12 flex-none rounded-full shadow-md shadow-slate-800/5 ring-1 ring-slate-900/5 ">
            <Image
              src={`/${company.name.replaceAll(" ", "").toLowerCase()}.png`}
              className="rounded-full"
              alt={company.name}
              fill
            />
          </div>
          <div className="flex grow flex-col">
            <div className="flex items-center justify-between">
              <div className="grow font-semibold leading-none">
                {company.name}
              </div>
              <div
                className="text-xs text-slate-400"
                aria-label={`${company.startDate ?? company.startDate} until ${
                  formatDate(company.endDate) ?? formatDate(company.endDate)
                }`}>
                <time dateTime={company.startDate}>
                  {formatDate(company.startDate)}
                </time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time dateTime={company.endDate}>
                  {formatDate(company.endDate)}
                </time>
              </div>
            </div>
            <div className="mt-1 text-sm leading-none text-slate-500">
              {company.position}
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center gap-4 border-t border-slate-200">
        <a
          href="#"
          className="mt-4 flex items-center space-x-2 text-sm text-astronaut-500 underline">
          <ArrowDownIcon className="h-4 w-4 text-astronaut-300" />
          <span>Download Resume (PDF)</span>
        </a>
      </div>
    </aside>
  )
}

export const metadata: Metadata = {
  title: "Tim Feeley’s Bio",
  openGraph: {
    title: "Tim Feeley’s Bio",
  },
}
