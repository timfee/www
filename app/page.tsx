import { notFound } from "next/navigation"
import { Metadata } from "next"
import { allPages } from "contentlayer/generated"

import Content from "@/components/content"

export function generateMetadata(): Metadata {
  const page = allPages.find((page) => page.url === "/")
  return { title: page?.title }
}

const PageLayout = () => {
  const page = allPages.find((page) => page.url === "/")

  if (!page) {
    return notFound()
  }

  return (
    <section className="prose mx-auto mt-12 max-w-2xl px-4">
      <Content animated>{page.body.code}</Content>
    </section>
  )
}

export default PageLayout
