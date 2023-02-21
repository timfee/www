import colors from "tailwindcss/colors"

export const STYLES: {
  [key: string]: {
    font: string
    size: number
    color: string
    lineGap?: number
  }
} = {
  name: {
    font: "black",
    size: 36,
    color: colors.slate["900"],
  },
  summary: {
    font: "bold",
    size: 13,
    color: colors.slate["800"],
  },
  summaryemphasis: {
    font: "bold",
    size: 13,
    color: colors.slate["500"],
  },
  company: {
    font: "bold",
    size: 17,
    color: colors.slate["500"],
  },
  date: {
    font: "medium",
    size: 9,
    color: colors.slate["400"],
  },
  jobsummary: {
    font: "medium",
    size: 12,
    lineGap: 2,
    color: colors.slate["700"],
  },
  highlight: {
    font: "standard",
    size: 10,
    lineGap: 3,
    color: colors.slate["800"],
  },
  education: {
    font: "bold",
    size: 10,
    color: colors.slate["500"],
  },
  mantraintro: {
    font: "bold",
    size: 9,
    color: colors.slate["600"],
  },
  mantra: {
    font: "black",
    size: 14,
    color: colors.slate["700"],
  },
  mantradetails: {
    font: "standard",
    size: 9,
    color: colors.slate["800"],
  },
}

export const OT_FEATURES: PDFKit.Mixins.OpenTypeFeatures[] = [
  "ss01",
  "ss02",
  "ss09",
  "ss10",
  "kern",
  "calt",
  "liga",
]

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

type formatEmphasisBlocksProps = {
  doc: PDFKit.PDFDocument
  textInput: string[]
  textFormat: Exclude<keyof typeof STYLES, number>
  textOptions: PDFKit.Mixins.TextOptions
  textXY?: { x?: number; y?: number }
  emphasis:
    | {
        type: "highlight"
        color: string
      }
    | {
        type: "format"
        format: Exclude<keyof typeof STYLES, number>
      }
}

export function formatEmphasisBlocks({
  doc,
  emphasis,
  textInput,
  textFormat,
  textOptions,
  textXY,
}: formatEmphasisBlocksProps) {
  let y = textXY && textXY.y ? textXY.y : doc.y
  if (emphasis.type === "highlight") {
    for (const [k, line] of textInput.entries()) {
      const matchRegex = /_.*?_/g
      // There should be either 0 _s, or an even number of _s.
      // If there are an odd number of _s, then the text is malformed.
      const numUnderscores = line.match(/_/g)
      if (Array.isArray(numUnderscores) && numUnderscores.length % 2 !== 0) {
        throw new Error(
          `Malformed text: ${line}. There should be either 0 _s, or an even number of _s.`
        )
      }

      let match

      const x =
        textXY && textXY.x
          ? textXY.x
          : applyStyle(doc, textFormat).page.margins.left

      // Find and draw the highlights
      while ((match = matchRegex.exec(line)) !== null) {
        const matchStartIndex = match.index + 1
        const matchText = match[0].replaceAll("_", " ")

        const matchTextWidth = doc.widthOfString(matchText, textOptions)
        const matchTextX =
          x +
          doc.widthOfString(
            line.replaceAll("_", " ").substring(0, matchStartIndex - 1),
            textOptions
          )

        const height = doc.heightOfString(matchText)
        const rectY = y + 0.5
        doc
          .roundedRect(matchTextX, rectY, matchTextWidth, height, 4)
          .fill(emphasis.color)
      }

      applyStyle(doc, textFormat).text(
        line.replaceAll("_", " "),
        x,
        y,
        textOptions
      )

      y += STYLES[textFormat].size + (STYLES[textFormat].lineGap ?? 0)
    }
  } else if (emphasis.type === "format") {
    const linesOfText = textInput.length
    for (const [i, line] of textInput.entries()) {
      const textFragments = line.split("_")
      const fragmentsOfText = textFragments.length
      for (const [j, fragment] of textFragments.entries()) {
        applyStyle(doc, j % 2 === 0 ? textFormat : emphasis.format).text(
          fragment,
          {
            ...textOptions,
            continued: i < linesOfText - 1 || j < fragmentsOfText - 1,
          }
        )
      }
    }
  }

  return doc
}

export function splitStringIntoLines(
  input: string,
  charsPerLine: number
): string[] {
  const words = input.split(/\s+/)
  const lines = []
  let line = ""

  for (const word of words) {
    if (line.length + word.length + 1 <= charsPerLine) {
      line += word + " "
    } else {
      lines.push(line.trim())
      line = word + " "
    }
  }

  if (line.length > 0) {
    lines.push(line.trim())
  }

  for (let i = 0; i < lines.length; i++) {
    // calculate how many _s are in the line.
    const underscores = (lines[i].match(/_/g) || []).length
    if (underscores % 2 === 1) {
      lines[i] += "_"
      lines[i + 1] = "_" + lines[i + 1]
    }
  }

  return lines
}

export function docFormat({
  doc,
  font,
  size,
  color,
}: {
  doc: PDFKit.PDFDocument
  font: string
  size: number
  color: string
}) {
  return doc.font(font).fontSize(size).fillColor(color)
}

export function applyStyle(doc: PDFKit.PDFDocument, style: string) {
  const { font, size, color } = STYLES[style]

  return docFormat({ doc, font, size, color })
}
