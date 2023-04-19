import { index } from ".contentlayer/generated"
import { MotionMdx } from "@/app/mdx-wrapper"

export const metadata = {
  title: index.title,
}

export default function Page() {
  const { code } = index.body

  return <MotionMdx>{code}</MotionMdx>
}
