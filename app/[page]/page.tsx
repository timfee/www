import { notFound } from "next/navigation"
import Link from "next/link"
import { allPages } from "@/.contentlayer/generated"
import Mdx from "@/app/mdx-wrapper"

export function generateMetadata({ params }: { params: { page: string } }) {
  const page = allPages.find(
    (page) => page.url.slice("/".length) === params.page
  )
  if (!page) {
    return {}
  }

  return {
    title: page.title,
  }
}
export default function Page({ params }: { params: { page: string } }) {
  const page = allPages.find(
    (page) => page.url.slice("/".length) === params.page
  )
  if (!page) {
    return notFound()
  }
  const { code } = page.body

  return <Mdx>{code}</Mdx>
}
