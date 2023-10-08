import { clsx } from "clsx"

import { Fragment, SVGProps } from "react"

export default function Timeline() {
  const gigs = [
    {
      employer: "Personio",
      title: "Sr. Group Product Manager\n(2023-present)",
      Logo: Personio,
    },
    {
      employer: "Goldman Sachs Marcus",
      title: "VP, Account Opening and Identity\n(2022)",
      Logo: Goldman,
    },
    {
      employer: "Google",
      title:
        "Sr. Product Manager\nIdentity (2017-21)\nData Protection (2022-23)",
      Logo: Google,
    },
    {
      employer: "Meta",
      title: "Product Manager, Facebook Design System\n(2016-2017)",
      Logo: Meta,
    },
    {
      employer: "Tripadvisor",
      title: "Director, Site Experience\n(2013-2016)",
      Logo: TripAdvisor,
    },
  ].reverse()

  return (
    <aside className="not-prose relative px-3.5">
      <div
        className="absolute inset-0 -z-10 flex items-center"
        aria-hidden="true">
        <div className="h-0.5 w-full bg-slate-200" />
      </div>
      <ol className="not-prose relative flex select-none list-none items-center justify-between">
        {gigs.map(({ title, employer, Logo }) => (
          <li
            key={title}
            className={clsx(
              "group flex h-10 w-10 sm:relative sm:h-16 sm:w-16",
            )}>
            <div className="relative h-full w-full">
              <Logo className="rounded-full border bg-white object-contain" />
            </div>
            <Popup>
              <p className="mb-1 text-[0.75em] font-semibold">{employer}</p>
              <p className="text-[0.6em]">
                {title.split("\n").map((line, i) => (
                  <Fragment key={i}>
                    {i !== 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </p>
            </Popup>
          </li>
        ))}
      </ol>
    </aside>
  )
}

function Popup({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        "absolute inset-x-0 top-14 z-10 h-fit sm:-inset-x-10 sm:top-[5rem]",
        "rounded p-2 text-center font-sans leading-tight",
        "bg-slate-900 text-white",
        "sm:before:absolute sm:before:-top-4 sm:before:left-[calc(50%-8px)] sm:before:z-20",
        "sm:before:border-8 sm:before:border-transparent",
        "sm:before:border-b-slate-900",
        "transform-gpu transition-all duration-200 ease-in-out",
        "invisible group-hover:visible",
        "opacity-0 group-hover:opacity-100",
        "translate-y-2 group-hover:translate-y-0",
      )}>
      {children}
    </div>
  )
}

function TripAdvisor(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403 403" {...props}>
      <g fill="none" fill-rule="evenodd">
        <path fill="#34E0A1" d="M0 0h403v403H0z" />
        <path
          fill="#000"
          d="m326 162 24-26h-54a167 167 0 0 0-189 0H53l24 26a74 74 0 1 0 101 110l23 26 24-26c14 12 31 19 51 19a74 74 0 0 0 50-129ZM127 267a50 50 0 1 1 0-100 50 50 0 0 1 0 100Zm75-51c0-33-25-62-56-74a144 144 0 0 1 111 0c-31 12-55 41-55 74Zm74 51a50 50 0 1 1 0-100 50 50 0 0 1 0 100Zm0-76a26 26 0 1 0 0 52 26 26 0 0 0 0-52Zm-122 26a26 26 0 1 1-53 0 26 26 0 0 1 53 0Z"
        />
      </g>
    </svg>
  )
}

function Personio(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403 403" {...props}>
      <g fill="none" fill-rule="evenodd">
        <path fill="#FFF" d="M0 0h403v403H0z" />
        <g transform="translate(65 65)">
          <path d="M0 0h272v272H0z" />
          <path
            fill="#000"
            fill-rule="nonzero"
            d="m131 144-16 61c-1 9-15 8-15-2l14-50c-10 5-19 8-24 9-7 1-12-3-12-9a7 7 0 0 1 11-6c4-1 15-5 30-13l19-66c3-9 16-5 14 4l-15 52 20-12c36-24 61-47 66-61 2-5 1-8-2-10-6-5-26-6-62 8-54 19-112 58-117 78 2 0 5 0 7 2a7 7 0 0 1-2 12c-8 3-23-3-20-16 4-17 27-36 46-49 26-17 53-31 81-41 26-10 60-18 76-6 8 6 11 15 8 24-3 13-18 35-69 69l-38 22ZM43 235h194v13H43z"
          />
          <ellipse
            cx="173.5"
            cy="201"
            fill="#000"
            fill-rule="nonzero"
            rx="10"
            ry="9"
            transform="rotate(-75 174 201)"
          />
        </g>
      </g>
    </svg>
  )
}

function Google(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403 403" {...props}>
      <g fill="none" fill-rule="evenodd">
        <path fill="#FFF" d="M0 0h403v403H0z" />
        <g fill-rule="nonzero">
          <path
            fill="#4285F4"
            d="M205 174v58h81c-4 19-14 35-30 45l48 38c29-26 45-65 45-110 0-11-1-21-3-31H205Z"
          />
          <path
            fill="#34A853"
            d="m121 230-11 8-39 31c25 48 75 82 134 82 40 0 74-13 99-36l-49-38a89 89 0 0 1-134-47Z"
          />
          <path
            fill="#FBBC05"
            d="M71 134a147 147 0 0 0 0 134l50-39a89 89 0 0 1 0-56l-50-39Z"
          />
          <path
            fill="#EA4335"
            d="M205 111c22 0 41 8 57 22l43-43a149 149 0 0 0-234 44l50 39c12-36 45-62 84-62Z"
          />
        </g>
      </g>
    </svg>
  )
}

function Meta(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403 403" {...props}>
      <defs>
        <linearGradient id="a" x1="13.9%" x2="89.1%" y1="55.9%" y2="58.7%">
          <stop offset="0%" stop-color="#0064E1" />
          <stop offset="40%" stop-color="#0064E1" />
          <stop offset="80%" stop-color="#0073EE" />
          <stop offset="100%" stop-color="#0082FB" />
        </linearGradient>
        <linearGradient id="b" x1="54.3%" x2="54.3%" y1="82.8%" y2="39.3%">
          <stop offset="0%" stop-color="#0082FB" />
          <stop offset="100%" stop-color="#0064E0" />
        </linearGradient>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <path fill="#FFF" d="M0 0h403v403H0z" />
        <g fill-rule="nonzero">
          <path
            fill="#0081FB"
            d="M85 233c0 11 3 20 6 25 4 7 11 10 17 10 9 0 16-2 31-23 12-16 26-39 35-54l16-24c11-17 24-36 39-49 12-10 25-16 38-16 21 0 42 13 58 36 18 26 26 59 26 93 0 20-4 35-11 46-6 12-19 23-40 23v-32c18 0 23-17 23-36 0-28-7-58-21-80-10-15-23-24-37-24-15 0-28 11-42 32l-23 39-10 17c-18 33-23 41-33 54-16 22-30 30-49 30-22 0-36-10-44-24-8-12-11-27-11-45l32 2Z"
          />
          <path
            fill="url(#a)"
            d="M26 39C41 16 62 0 87 0c14 0 28 4 43 16 16 13 33 35 54 70l8 13c18 31 29 47 35 54 8 10 14 13 21 13 18 0 23-17 23-36l28-1c0 20-4 35-11 46-6 12-19 23-40 23-14 0-25-3-38-15-10-10-22-26-31-41l-27-45c-13-22-26-39-33-47s-17-18-33-18c-13 0-23 9-33 23L26 39Z"
            transform="translate(52 102)"
          />
          <path
            fill="url(#b)"
            d="M85 32c-12 0-23 9-32 23-13 19-21 48-21 76 0 11 3 20 6 25l-27 18c-8-12-11-27-11-45 0-31 9-65 25-90C40 16 62 0 86 0l-1 32Z"
            transform="translate(52 102)"
          />
        </g>
      </g>
    </svg>
  )
}

function Goldman(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403 403" {...props}>
      <g fill="none" fill-rule="evenodd">
        <path fill="#7399C6" d="M0 0h403v403H0z" />
        <path
          fill="#FFF"
          fill-rule="nonzero"
          d="M336 198h-13v-46h12v6c1-3 5-6 10-7 8 0 13 5 13 14v33h-13v-34c0-4 0-8-3-8-1-1-2 0-4 1s-2 3-2 7v34Zm-214-23-1 19-5 2-4-2c-2-4-2-10-2-19 0-8 0-15 2-18 0-2 2-3 4-3s3 1 5 3l1 18m5-19c-3-3-7-5-11-5s-8 2-11 5c-5 4-8 11-8 19 0 9 3 16 8 20 3 2 7 4 11 4s8-2 11-4c5-4 8-11 8-20 0-8-3-15-8-19m126 59v12h-3c-1-5-3-9-9-10-4 0-7 2-7 5-1 3 0 6 7 9 8 5 15 7 15 16 0 10-9 14-17 14h-14v-17h2c2 9 5 15 12 15 4 0 7-2 7-7 0-4-3-7-9-11-8-4-13-7-13-13 0-8 6-13 16-13h13Zm16-17v-33c0-9-6-14-14-14-5 1-8 4-10 7-2-5-6-7-11-7-5 1-9 4-10 7v-6h-11v46h12v-34c0-4 0-6 3-7 1-1 2-2 4-1 2 0 2 4 2 8v34h13v-35c0-3 0-5 2-6s3-2 4-1c3 0 3 4 3 8v34h13Zm-126 0h13v-55h-13v55Zm43-42c2 4 2 12 2 18 0 7 1 16-2 19-1 2-2 2-4 2-3 0-4-2-5-7v-14c0-9 1-19 5-19l4 1Zm15 42v-55h-13v13c-1-3-3-4-7-4-9 0-16 9-17 22 0 9 3 24 16 24 5 0 8-2 9-5v5h12Zm98-27-4 2c-4 2-5 6-5 9v9c0 4 3 4 5 4 3-1 4-6 4-10v-14Zm7-17c4 2 6 4 6 10v34h-12v-5c-2 3-6 6-11 6-4 0-12-2-12-13 0-10 7-12 15-15 6-2 7-3 7-5v-8c0-3-2-4-5-4-2 0-4 1-4 3-1 2 2 2 2 5 1 4-3 6-7 6-3 0-5-2-6-5 0-6 7-12 17-12 5 0 8 1 10 3Zm-186 80-4 2c-4 3-4 6-5 9v9c0 4 3 5 5 4 3-1 4-5 4-10v-14Zm7-17c4 2 5 4 5 11v33h-11v-5c-2 4-5 6-11 6-5 0-12-2-12-12s7-12 14-15 8-3 8-6v-7c0-4-2-5-5-5-2 0-4 1-4 3-1 2 2 2 2 5 1 5-3 6-7 6-2 0-5-1-6-5 0-6 7-11 17-11l10 2Zm88 12c0-10-6-15-13-14-4 0-8 2-10 4v-13h-12v31c0 12-8 23-17 22-6 0-8-4-8-9-2-7-2-14-1-23 1-5 2-10 7-10 3 0 3 2 2 4-2 1-4 3-3 7s8 5 12 2c2-3 2-8 0-10-2-4-6-5-11-5-7 0-20 6-20 24 0 20 13 23 21 23s16-7 18-13v12h12v-34c0-3 1-5 3-7l4-1c3 1 3 4 3 8v34h13v-32ZM88 142v19h-2c-2-9-7-16-14-17-4 0-6 2-9 6a112 112 0 0 0-2 44c1 2 3 6 8 6l5-2c2-2 2-6 2-9v-9l-2-6-5-1v-3h20v49h-2l-4-10c-2-3-5-6-11-6-5 0-10 3-10 8 0 7 5 8 13 12 7 5 17 8 17 20 0 11-10 18-22 18H50v-23h3c3 18 11 21 17 21s10-4 10-10c-1-8-6-10-14-14-10-6-16-8-16-18 1-8 8-13 15-15-16-2-20-15-20-30 0-14 9-30 27-30h16Z"
        />
      </g>
    </svg>
  )
}
