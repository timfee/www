import { createWriteStream } from 'fs'
import { resolve } from 'path'
import { cwd } from 'process'

import pdf from 'pdfkit'
import colors from 'tailwindcss/colors'

import resume from '@/resume.json'

export const STYLES: {
  [key: string]: {
    font: string
    size: number
    color: string
  }
} = {
  name: {
    font: 'black',
    size: 36,
    color: colors.slate['800'],
  },
  summary: {
    font: 'medium',
    size: 15,
    color: colors.slate['700'],
  },
  summaryemphasis: {
    font: 'medium',
    size: 15,
    color: colors.slate['500'],
  },
  company: {
    font: 'bold',
    size: 18,
    color: colors.slate['500'],
  },
  date: {
    font: 'medium',
    size: 9,
    color: colors.slate['500'],
  },
  jobsummary: {
    font: 'medium',
    size: 12,
    color: colors.slate['700'],
  },
  highlight: {
    font: 'medium',
    size: 9,
    color: colors.slate['500'],
  },
}

export function generatePdf() {
  const doc = new pdf({
    margins: {
      top: 125,
      bottom: 75,
      left: 75,
      right: 100,
    },
  })

  doc.registerFont('standard', resolve(cwd(), 'fonts', 'soehne-buch.ttf'))
  doc.registerFont('medium', resolve(cwd(), 'fonts', 'soehne-kraftig.ttf'))
  doc.registerFont('bold', resolve(cwd(), 'fonts', 'soehne-halbfett.ttf'))
  doc.registerFont('black', resolve(cwd(), 'fonts', 'fett.ttf'))

  // * Name
  applyStyle(doc, 'name')
    .text(resume.basics.name, {
      characterSpacing: -1,
    })
    .moveDown(0.1)

  // * Summary
  formatEmphasisBlocks({
    doc,
    textInput: splitStringIntoLines(
      resume.basics.summary,
      resume.basics.summary.length + 1
    ),
    textFormat: 'summary',
    emphasis: {
      type: 'format',
      format: 'summaryemphasis',
    },
    textOptions: {
      characterSpacing: -0.25,
    },
  }).moveDown(1.6)

  // * Employment History
  const jobs = resume.work.entries()
  for (const [i, job] of jobs) {
    const dateRange = `${formatDate(job.startDate)} - ${formatDate(
      job.endDate
    )}`

    if (doc.y > doc.page.height * 0.75) {
      doc.addPage()
    }
    doc.moveDown(0.4)

    // ** Company name
    const y = doc.y
    applyStyle(doc, 'company').text(job.name, {
      characterSpacing: -0.25,
    })

    // ** Dates of service
    applyStyle(doc, 'date').text(
      dateRange,
      doc.page.width -
        doc.page.margins.right -
        doc.widthOfString(dateRange, {
          characterSpacing: -0.25,
        }),
      y + (STYLES['company'].size - STYLES['date'].size),
      {
        characterSpacing: -0.25,
        paragraphGap: 4,
      }
    )

    // ** Role summary
    formatEmphasisBlocks({
      doc,
      textInput: splitStringIntoLines(job.summary, 65),
      textFormat: 'jobsummary',
      emphasis: {
        type: 'highlight',
        color: colors.yellow[100],
      },
      textOptions: {
        // width: doc.page.width - 3.5 * doc.page.margins.right,
        characterSpacing: -0.25,
      },
    })

    doc.moveDown(0.4)

    // ** Highlights
    for (const [j, highlight] of job.highlights.entries()) {
      formatEmphasisBlocks({
        doc,
        textInput: splitStringIntoLines(highlight, 85),
        textFormat: 'highlight',
        emphasis: {
          type: 'highlight',
          color: colors.yellow[100],
        },
        textOptions: {
          // width: doc.page.width - 3.5 * doc.page.margins.right,
          characterSpacing: -0.2,
        },
      })
      doc.moveDown(0.4)
    }
    doc.moveDown(0.8)
  }

  doc.pipe(createWriteStream('/Users/timfee/Desktop/resume.pdf')) // write to PDF
  doc.end()
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
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
        type: 'highlight'
        color: string
      }
    | {
        type: 'format'
        format: Exclude<keyof typeof STYLES, number>
      }
}
function formatEmphasisBlocks({
  doc,
  emphasis,
  textInput,
  textFormat,
  textOptions,
  textXY,
}: formatEmphasisBlocksProps) {
  let y = textXY && textXY.y ? textXY.y : doc.y
  if (emphasis.type === 'highlight') {
    console.log(textInput)
    for (const [k, line] of textInput.entries()) {
      const matchRegex = /_.*?_/g
      let match

      const x =
        textXY && textXY.x
          ? textXY.x
          : applyStyle(doc, textFormat).page.margins.left

      // Find and draw the highlights
      while ((match = matchRegex.exec(line)) !== null) {
        const matchStartIndex = match.index + 1
        const matchText = match[0].replaceAll('_', ' ')

        const matchTextWidth = doc.widthOfString(matchText, textOptions)
        const matchTextX =
          x +
          doc.widthOfString(
            line.replaceAll('_', ' ').substring(0, matchStartIndex - 1),
            textOptions
          )

        const height = doc.heightOfString(matchText)
        const rectY = y + 0.5
        doc
          .roundedRect(matchTextX, rectY, matchTextWidth, height, 4)
          .fill(emphasis.color)
      }

      applyStyle(doc, textFormat).text(
        line.replaceAll('_', ' '),
        x,
        y,
        textOptions
      )

      y += STYLES[textFormat].size + 2
    }
  } else if (emphasis.type === 'format') {
    const linesOfText = textInput.length
    for (const [i, line] of textInput.entries()) {
      const textFragments = line.split('_')
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

function splitStringIntoLines(input: string, charsPerLine: number): string[] {
  const words = input.split(/\s+/)
  const lines = []
  let line = ''

  for (const word of words) {
    if (line.length + word.length + 1 <= charsPerLine) {
      line += word + ' '
    } else {
      lines.push(line.trim())
      line = word + ' '
    }
  }

  if (line.length > 0) {
    lines.push(line.trim())
  }

  for (let i = 0; i < lines.length; i++) {
    // calculate how many _s are in the line.
    const underscores = (lines[i].match(/_/g) || []).length
    if (underscores % 2 === 1) {
      lines[i] += '_'
      lines[i + 1] = '_' + lines[i + 1]
    }
  }

  return lines
}

function docFormat({
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

function applyStyle(doc: PDFKit.PDFDocument, style: string) {
  const { font, size, color } = STYLES[style]

  return docFormat({ doc, font, size, color })
}
