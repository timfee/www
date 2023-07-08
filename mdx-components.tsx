import type { MDXComponents } from "mdx/types"
import Image from "next/image"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Image: ({ src, alt, ...props }) => (
      <Image alt={alt ?? ""} src={src ?? ""} {...props} />
    ),
    code: ({ children, ...props }) => (
      <code {...props} dangerouslySetInnerHTML={{ __html: children ?? "" }} />
    ),
    ...components,
  }
}
