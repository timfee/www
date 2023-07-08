import { visit } from "unist-util-visit"
import { getHighlighter, renderToHtml } from "shiki"

function rehypeParseCodeBlocks() {
  return (tree) => {
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
  return async (tree) => {
    const highlighter = await getHighlighter({ theme: "css-variables" })

    visit(tree, "element", (node) => {
      if (
        node.tagName === "pre" &&
        node.children[0].type == "element" &&
        node.children[0].tagName === "code"
      ) {
        const codeNode = node.children[0]
        const textNode = codeNode.children[0]

        if (!node.properties) {
          node.properties = {}
        }
        node.properties.code = textNode.value

        if (node.properties.language) {
          const tokens = highlighter.codeToThemedTokens(
            textNode.value,
            node.properties.language.toString(),
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
