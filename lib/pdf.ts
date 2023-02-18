/* eslint-disable import/extensions */

import { createWriteStream } from 'fs'
import { resolve } from 'path'
import { cwd } from 'process'

import pdf from 'pdfkit'
import colors from 'tailwindcss/colors'

import resume from '@/resume.json'

export function generatePdf() {
  const doc = new pdf({
    margin: 75,
  })

  doc.registerFont('standard', resolve(cwd(), 'fonts', 'soehne-buch.ttf'))
  doc.registerFont('medium', resolve(cwd(), 'fonts', 'soehne-kraftig.ttf'))
  doc.registerFont('bold', resolve(cwd(), 'fonts', 'soehne-halbfett.ttf'))
  doc.registerFont('black', resolve(cwd(), 'fonts', 'fett.ttf'))

  nameBlock(doc)
  workBlock(doc)

  doc.pipe(createWriteStream('/Users/timfee/Desktop/resume.pdf')) // write to PDF
  doc.end()
}

function nameBlock(doc: PDFKit.PDFDocument) {
  applyStyle(doc, 'name').text(resume.basics.name, {
    characterSpacing: -1,
  })

  applyStyle(doc, 'summary').text(resume.basics.summary, {})

  doc.moveDown(0.5)
}

function workBlock(doc: PDFKit.PDFDocument) {
  const jobs = resume.work.entries()
  for (const [i, job] of jobs) {
    const dateRange = `${formatDate(job.startDate)} - ${formatDate(
      job.endDate
    )}`

    if (doc.y > doc.page.height * 0.75) {
      doc.addPage()
    }
    doc.moveDown(0.4)

    // --!-- Company name
    const y = doc.y
    applyStyle(doc, 'company').text(job.name, {
      characterSpacing: -0.25,
    })

    // --!-- Dates of Service
    applyStyle(doc, 'date')

    doc.text(
      dateRange,
      doc.page.width -
        doc.page.margins.right -
        doc.widthOfString(dateRange, {
          characterSpacing: -0.25,
        }),
      y + 7,
      {
        characterSpacing: -0.25,
        paragraphGap: 4,
      }
    )

    doc.moveDown(0.2)
    // --!-- Summary

    parseHighlights({
      doc,
      textInput: splitStringIntoLines(job.summary, 85),
      textFormat: {
        width: doc.page.width - 3.5 * doc.page.margins.right,
        characterSpacing: -0.25,
      },
    })

    // applyStyle(doc, 'jobsummary').text(
    //   job.summary,
    //   doc.page.margins.left,
    //   doc.y,
    //   {
    //     width: doc.page.width - 3.5 * doc.page.margins.right,
    //     characterSpacing: -0.25,
    //   }
    // )

    doc.moveDown(0.4)

    // --!-- Highlights
    for (const [j, highlight] of job.highlights.entries()) {
      parseHighlights({
        doc,
        textInput: splitStringIntoLines(highlight, 85),
        textFormat: {
          width: doc.page.width - 3.5 * doc.page.margins.right,
          characterSpacing: -0.25,
        },
      })
      doc.moveDown(0.4)
    }
    doc.moveDown(0.8)
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

type ParseHighlightsProps = {
  doc: PDFKit.PDFDocument
  textInput: string[]
  textFormat: PDFKit.Mixins.TextOptions
}
function parseHighlights({ doc, textInput, textFormat }: ParseHighlightsProps) {
  const HIGHLIGHT_COLOR = colors.yellow[100]
  const LINE_HEIGHT = 11

  let y = doc.y

  for (const [k, line] of textInput.entries()) {
    const underlineRegex = /_.*?_/g
    let match

    // Draw the entire line of text without highlights
    const lineX = applyStyle(doc, 'highlight').page.margins.left

    // Find and draw the highlights
    while ((match = underlineRegex.exec(line)) !== null) {
      const matchStartIndex = match.index + 1

      // Calculate the x position and width of the highlight
      const matchText = match[0].replaceAll('_', ' ')

      const matchTextWidth = doc.widthOfString(matchText)
      const matchTextX =
        lineX + doc.widthOfString(line.substring(0, matchStartIndex - 1))

      // Draw the highlight
      const height = LINE_HEIGHT + 2
      const rectY = y
      doc
        .roundedRect(matchTextX, rectY, matchTextWidth, height, 4)
        .fill(HIGHLIGHT_COLOR)
    }

    applyStyle(doc, 'highlight').text(
      line.replaceAll('_', ' '),
      lineX,
      y,
      textFormat
    )

    // Move the y position down to the next line
    y += LINE_HEIGHT + 2
  }
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

type DocFormatProps = {
  doc: PDFKit.PDFDocument
  font: string
  size: number
  color: string
}
function docFormat({ doc, font, size, color }: DocFormatProps) {
  return doc.font(font).fontSize(size).fillColor(color)
}

function applyStyle(doc: PDFKit.PDFDocument, style: string) {
  switch (style) {
    case 'name': {
      return docFormat({
        doc,
        font: 'black',
        size: 36,
        color: colors.slate['800'],
      })
    }
    case 'summary':
      return docFormat({
        doc,
        font: 'medium',
        size: 16,
        color: colors.slate['700'],
      })

    case 'company':
      return docFormat({
        doc,
        font: 'bold',
        size: 18,
        color: colors.slate['500'],
      })
    case 'date':
      return docFormat({
        doc,
        font: 'medium',
        size: 9,
        color: colors.slate['500'],
      })
    case 'jobsummary':
      return docFormat({
        doc,
        font: 'medium',
        size: 13,
        color: colors.slate['600'],
      })
    case 'highlight':
      return docFormat({
        doc,
        font: 'standard',
        size: 10,
        color: colors.slate['800'],
      })
    default:
      return doc
  }
}
