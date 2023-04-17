import Link from "next/link"
import { allPosts } from "@/.contentlayer/generated"

export const metadata = {
  title: "Writing",
}
export default function Post() {
  return (
    <>
      <h1>Writing</h1>
      <p>I don’t do it often, but when I do, you can find it here:</p>
      <section className="divide-y divide-slate-300">
        {allPosts.map((post) => (
          <article
            key={post._id}
            className="flex flex-col items-start justify-between py-6">
            <time
              dateTime={post.date}
              className="font-sans text-xs text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </time>
            <Link className="group relative no-underline" href={post.url}>
              <h3 className="mt-px text-lg font-semibold leading-6 text-blue-700 underline">
                {post.title}
              </h3>
              <div className="mb-0 mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                {post.excerpt.replaceAll("\n", " ")}
              </div>
            </Link>
          </article>
        ))}
      </section>
    </>
  )
}
