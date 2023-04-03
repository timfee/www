"use client"

import { notFound } from "next/navigation"

import { PropsWithChildren } from "react"
import { ArrowUturnUpIcon } from "@heroicons/react/24/outline"
import Header from "./header"
import { usePostContext, withPostContext } from "./context"
import { allPosts } from "@/.contentlayer/generated"

function PostLayout({
  params,
  children,
}: PropsWithChildren<{ params: { slug: string } }>) {
  const { articleRef } = usePostContext()

  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `posts/${params.slug}`
  )

  if (!post) {
    return notFound()
  }

  return (
    <>
      <Header date={post.date.toString()}>{post.title}</Header>
      <article ref={articleRef} className="prose mx-auto mt-4 max-w-2xl  px-3">
        {children}
      </article>
      <a
        href="#top"
        className="hocus:text-blue-500 block py-14 text-center text-blue-700">
        <ArrowUturnUpIcon className="mx-auto h-5 w-5" />
        <p>Back to the top</p>
      </a>
    </>
  )
}

export default withPostContext(PostLayout)
