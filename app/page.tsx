import { index } from "@/.contentlayer/generated"
import Mdx from "@/app/mdx-wrapper"

export default function Homepage() {
  const { code } = index.body
  return (
    <main className="prose mx-auto max-w-3xl px-3">
      <Mdx>{code}</Mdx>
    </main>
  )
}
