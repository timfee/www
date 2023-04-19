import { bio } from ".contentlayer/generated"
import Mdx from "@/app/mdx-wrapper"

export const metadata = {
  title: bio.title,
}

export default function Page() {
  const { code } = bio.body

  return <Mdx>{code}</Mdx>
}
