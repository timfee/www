import { clsx } from "clsx"
import Image from "next/image"

export default function Timeline() {
  const gigs = [
    {
      employer: "Google",
      title: "Sr. Product Manager, Data Protection",
      logo: "/images/logos/google.png",
    },
    {
      employer: "Goldman Sachs Marcus",
      title: "VP, Account Opening and Identity",
      logo: "/images/logos/goldmansachs.png",
    },
    {
      employer: "Google",
      title: "Sr. Product Manager, Identity",
      logo: "/images/logos/google.png",
    },
    {
      employer: "Meta",
      title: "Product Manager, Facebook Design System",
      logo: "/images/logos/meta.png",
    },
    {
      employer: "Tripadvisor",
      title: "Product Manager, Facebook Design System",
      logo: "/images/logos/tripadvisor.png",
    },
  ].reverse()

  return (
    <aside className="not-prose relative mx-3.5">
      <div
        className="absolute inset-0 -z-10 flex items-center"
        aria-hidden="true">
        <div className="h-0.5 w-full bg-slate-200" />
      </div>
      <ol className="not-prose relative flex select-none list-none items-center justify-between">
        {gigs.map(({ title, employer, logo }) => (
          <li key={title} className={clsx("group relative flex h-16 w-16")}>
            <Image
              src={logo}
              fill
              alt={employer}
              className="rounded-full border bg-white object-contain"
            />
            <Popup>
              <p className="mb-1 text-xs font-semibold">{employer}</p>
              <p className="text-[0.7em]">{title}</p>
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
        "absolute -inset-x-10 top-16 z-10 h-fit",
        "rounded p-2 text-center font-sans  leading-tight",
        "bg-slate-900 text-white",
        "before:absolute before:-top-4 before:left-[calc(50%-8px)] before:z-20",
        "before:border-8 before:border-transparent",
        "before:border-b-slate-900",
        "transform-gpu transition-all duration-200 ease-in-out",
        "invisible group-hover:visible",
        "opacity-0 group-hover:opacity-100",
        "translate-y-2 group-hover:translate-y-0"
      )}>
      {children}
    </div>
  )
}
