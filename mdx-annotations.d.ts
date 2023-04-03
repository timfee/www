declare module "mdx-annotations" {
  import { Plugin } from "unified"
  import { Node } from "unist"

  interface MdXAnnotations {
    remark(): Plugin
    rehype(): Plugin
    recma(): Plugin
  }

  export function setAnnotation(node: Node, annotation: string): void

  const mdxAnnotations: MdXAnnotations
  export default mdxAnnotations
}
