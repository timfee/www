import { index } from "@/.contentlayer/generated"
import Mdx from "@/app/mdx-wrapper"

export default function Homepage() {
  const { code } = index.body
  return (
    <>
      <Mdx>{code}</Mdx>
    </>
  )
}
