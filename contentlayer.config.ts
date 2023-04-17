import { type Root, type ElementContent, Element } from "hast"

import { defineDocumentType, makeSource } from "contentlayer/source-files"
import { visit } from "unist-util-visit"
import { getHighlighter, renderToHtml } from "shiki"
import { Text } from "hast"

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
    excerpt: {
      type: "string",
      description: "The excerpt of the post",
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
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (document_) =>
        `/${document_._raw.flattenedPath.slice("/pages".length)}`,
    },
  },
}))

const Index = defineDocumentType(() => ({
  name: "Index",
  filePathPattern: `index.mdx`,
  contentType: "mdx",
  isSingleton: true,
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
}))

function rehypeParseCodeBlocks() {
  return (tree: Element) => {
    visit(tree, "element", (node, _nodeIndex, parentNode) => {
      if (parentNode && node.tagName === "code" && node.properties?.className) {
        if (!parentNode.properties) {
          parentNode.properties = {}
        }
        const classes = node.properties.className

        if (!Array.isArray(classes)) return

        parentNode.properties.language = classes[0]
          .toString()
          .replace(/^language-/, "")
      }
    })
  }
}

function rehypeShiki() {
  return async (tree: Element) => {
    const highlighter = await getHighlighter({ theme: "css-variables" })

    visit(tree, "element", (node) => {
      if (
        node.tagName === "pre" &&
        node.children[0].type == "element" &&
        node.children[0].tagName === "code"
      ) {
        const codeNode = node.children[0]
        const textNode = codeNode.children[0] as Text

        if (!node.properties) {
          node.properties = {}
        }
        node.properties.code = textNode.value

        if (node.properties.language) {
          const tokens = highlighter.codeToThemedTokens(
            textNode.value,
            node.properties.language.toString()
          )

          textNode.value = renderToHtml(tokens, {
            elements: {
              pre: ({ children }) => children,
              code: ({ children }) => children,
              line: ({ children }) => `<span>${children}</span>`,
            },
          })
        }
      }
    })
  }
}

export const rehypePlugins = [rehypeParseCodeBlocks, rehypeShiki]

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Page, Index],
  mdx: {
    rehypePlugins,
  },
})
