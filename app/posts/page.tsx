import Link from "next/link"
import { compareDesc, format, parseISO } from "date-fns"
import { Metadata } from "next"
import { allPosts, Post } from "contentlayer/generated"

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mt-12 px-4 text-3xl font-bold">Posts</h1>
      <div className="mt-4 px-4">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  )
}

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <h2 className="text-xl">
        <Link
          href={post.url}
          className="hocus:text-blue-500 hocus:underline font-serif text-blue-600">
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Tim Feeley’s Writing",
}
