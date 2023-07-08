import Link from "next/link"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link
        href="/posts"
        className="mb-2 flex items-center font-sans text-sm text-red-600 no-underline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className="mr-1 h-4 w-4"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5 11 7-8m0 0 8 8m-8-8v18"
          />
        </svg>

        <u>All Posts</u>
      </Link>
      {children}
    </>
  )
}
