import { notFound } from "next/navigation"
import { allPages } from "@/.contentlayer/generated"
import Mdx from "@/app/mdx-wrapper"

export async function generateStaticParams() {
  return allPages.map((page) => ({
    page: page.url.slice("/".length),
  }))
}
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
