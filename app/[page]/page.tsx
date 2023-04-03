import { notFound } from "next/navigation"
import Content from "@/components/content"
import { allPages } from "contentlayer/generated"

export const generateStaticParams = async () =>
  allPages.map((page) => ({
    slug: page._raw.flattenedPath.slice(`/pages`.length),
  }))

export const generateMetadata = ({ params }: { params: { page: string } }) => {
  const page = allPages.find(
    (page) => page._raw.flattenedPath === `pages/${params.page}`
  )
  return { title: page?.title }
}

const PageLayout = ({ params }: { params: { page: string } }) => {
  const page = allPages.find(
    (page) => page._raw.flattenedPath === `pages/${params.page}`
  )

  if (!page) {
    return notFound()
  }

  return (
    <article className="prose mx-auto mt-12 max-w-2xl px-4">
      <Content animated>{page.body.code}</Content>
    </article>
  )
}

export default PageLayout
