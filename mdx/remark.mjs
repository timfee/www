import { mdxAnnotations } from "mdx-annotations"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
export const remarkPlugins = [
  mdxAnnotations.remark,
  remarkGfm,
  remarkSmartypants,
]
