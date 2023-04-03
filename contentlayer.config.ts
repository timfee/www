import { defineDocumentType, makeSource } from "contentlayer/source-files"
import { remarkPlugins } from "./mdx/remark.mjs"
import { rehypePlugins } from "./mdx/rehype.mjs"
import { recmaPlugins } from "./mdx/recma.mjs"

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (document_) => `/${document_._raw.flattenedPath}`,
    },
  },
}))

const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the page",
      required: true,
    },
    order: {
      type: "number",
      description: "The order in the navbar",
      required: true,
    },
    navTitle: {
      type: "string",
      description: "The title in the navbar",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (document_) =>
        `/${document_._raw.flattenedPath.slice("/pages".length)}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Page],

  mdx: {
    rehypePlugins,
    remarkPlugins,
    mdxOptions: (opt) => ({
      recmaPlugins,
      ...opt,
    }),
  },
})
