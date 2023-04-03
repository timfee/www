import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import Content from "@/components/content"

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: `${post._raw.flattenedPath.slice("posts/".length)}`,
  }))
}

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `posts/${params.slug}`
  )
  return { title: post?.title }
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `posts/${params.slug}`
  )

  if (!post) {
    return notFound()
  }

  return <Content>{post.body.code}</Content>
}
