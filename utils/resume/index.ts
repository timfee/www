/* eslint-disable unicorn/consistent-destructuring */

import { createWriteStream } from "fs"
import { resolve } from "path"
import Pdf from "pdfkit"
import { cwd } from "process"
import colors from "tailwindcss/colors"

import {
  OT_FEATURES,
  STYLES,
  applyStyle,
  formatDate,
  formatEmphasisBlocks,
  splitStringIntoLines,
} from "./helpers"
import resume from "@/resume.json"

export const generatePdf = (): void => {
  // #region  Create new PDF and register fonts
  const doc = new Pdf({
    bufferPages: true,
    compress: true,
    margins: {
      top: 100,
      bottom: 50,
      left: 75,
      right: 100,
    },
  })

  doc.registerFont("standard", resolve(cwd(), "fonts", "sans-regular.ttf"))
  doc.registerFont("medium", resolve(cwd(), "fonts", "sans-medium.ttf"))
  doc.registerFont("bold", resolve(cwd(), "fonts", "sans-bold.ttf"))
  doc.registerFont("black", resolve(cwd(), "fonts", "sans-black.ttf"))
  // #endregion

  // Background
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.slate["100"])

  // #region  Name
  applyStyle(doc, "mantraintro")
    .text(resume.basics.email, {
      characterSpacing: -0.5,
      features: OT_FEATURES,
    })
    .moveDown(0.1)

  applyStyle(doc, "name")
    .text(resume.basics.name, {
      characterSpacing: -1.5,
      features: OT_FEATURES,
    })
    .moveDown(0.1)

  // #endregion

  // #region  Summary
  formatEmphasisBlocks({
    doc,
    textInput: splitStringIntoLines(
      resume.basics.summary,
      resume.basics.summary.length + 1
    ),
    textFormat: "summary",
    emphasis: {
      type: "format",
      format: "summaryemphasis",
    },
    textOptions: {
      characterSpacing: -0.5,
      features: OT_FEATURES,
    },
  }).moveDown(1)
  // #endregion

  // #region  Work experience
  const jobs = resume.work.entries()
  for (const [, job] of jobs) {
    // #region Page or section break
    if (doc.y > doc.page.height * 0.75) {
      doc.addPage({
        margins: {
          top: 100,
          bottom: 50,
          left: 75,
          right: 75,
        },
      })
      // Background
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.slate["100"])
    } else {
      doc.moveDown(1.25)
    }
    // #endregion

    // #region Company name
    const { y } = doc
    applyStyle(doc, "company").text(job.name, {
      characterSpacing: -0.5,
      features: OT_FEATURES,
    })
    // #endregion

    // #region Date range
    const dateRange = `${formatDate(job.startDate)} - ${formatDate(
      job.endDate
    )}`

    applyStyle(doc, "date").text(
      dateRange,
      doc.page.width -
        doc.page.margins.right -
        doc.widthOfString(dateRange, {
          characterSpacing: -0.25,
          features: OT_FEATURES,
        }),
      y + (STYLES.company.size - STYLES.date.size),
      {
        characterSpacing: -0.25,
        features: OT_FEATURES,
      }
    )
    // #endregion
    doc.moveDown(0.5)

    // #region Job summary
    formatEmphasisBlocks({
      doc,
      textInput: splitStringIntoLines(job.summary, 70),
      textFormat: "jobsummary",
      emphasis: {
        type: "highlight",
        color: colors.yellow[100],
      },
      textOptions: {
        characterSpacing: -0.33,
        features: OT_FEATURES,
      },
    })
    // #endregion

    doc.moveDown(0.6)

    // #region Highlights
    for (const [, highlight] of job.highlights.entries()) {
      formatEmphasisBlocks({
        doc,
        textInput: splitStringIntoLines(highlight, 80),
        textFormat: "highlight",
        emphasis: {
          type: "highlight",
          color: colors.yellow[100],
        },
        textOptions: {
          features: OT_FEATURES,
          characterSpacing: -0.2,
        },
      })

      doc.moveDown(0.5)
    }
    // #endregion
  }
  // #endregion
  doc.moveDown(1)

  // #region Education
  const { y } = doc
  applyStyle(doc, "education").text(
    `${resume.education[0].studyType}, ${resume.education[0].area}`,
    {
      characterSpacing: -0.25,
      features: OT_FEATURES,
    }
  )
  applyStyle(doc, "highlight").text(
    `${resume.education[0].institution} (${new Date(
      resume.education[0].endDate
    ).getFullYear()})`,
    {
      characterSpacing: -0.2,
      features: OT_FEATURES,
    }
  )
  // #endregion

  // #region Endorsement
  const MOM_QUOTE = "“Pretty good with computers”"
  const MOM_BYLINE = "—Tim’s mom"

  applyStyle(doc, "education").text(
    MOM_QUOTE,
    doc.page.width -
      doc.page.margins.right -
      doc.widthOfString(MOM_QUOTE, {
        characterSpacing: -0.25,
        features: OT_FEATURES,
      }),
    y,

    {
      width: doc.widthOfString(MOM_QUOTE, {
        characterSpacing: -0.25,
        features: OT_FEATURES,
      }),
      characterSpacing: -0.25,
      features: OT_FEATURES,
    }
  )
  applyStyle(doc, "highlight").text(
    MOM_BYLINE,
    doc.page.width -
      doc.page.margins.right -
      doc.widthOfString(MOM_BYLINE, {
        characterSpacing: -0.1,
        features: OT_FEATURES,
      }),
    doc.y,
    {
      characterSpacing: -0.2,
      features: OT_FEATURES,
    }
  )
  // #endregion
  doc.moveDown(1.5)

  // #region Mantra
  const MANTRA_INTRO = "Three words I live by"
  const MANTRA = "“Clarity over comfort”"
  const MANTRA_DETAILS = `Sometimes it can be hard to speak up, especially when the pressure is on or anxieties are high. These are precisely the times to take a deep breath and push through the discomfort to make yourself heard.
Like most things in life, this is a learned practice—one I strive to develop in myself and bring to the teams I support.`

  applyStyle(doc, "mantraintro")
    .text(MANTRA_INTRO, doc.page.margins.left, doc.y, {
      characterSpacing: -0.25,
      features: OT_FEATURES,
    })
    .moveDown(0.25)

  applyStyle(doc, "mantra")
    .roundedRect(
      doc.x,
      doc.y,
      doc.widthOfString(MANTRA, {
        characterSpacing: -0.25,
        features: OT_FEATURES,
      }),
      doc.heightOfString(MANTRA, {
        characterSpacing: -0.25,
        features: OT_FEATURES,
      }),
      4
    )
    .fill(colors.yellow[100])

  applyStyle(doc, "mantra")
    .text(MANTRA, { characterSpacing: -0.2, features: OT_FEATURES })
    .moveDown(0.25)

  applyStyle(doc, "mantradetails").text(MANTRA_DETAILS, {
    characterSpacing: -0.2,
    features: OT_FEATURES,
    paragraphGap: 8,
    lineGap: 1,
    width: doc.page.width - 4 * doc.page.margins.right,
  })

  // #endregion

  // #region Pagination
  const pages = doc.bufferedPageRange()
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i)

    const oldTopMargin = doc.page.margins.top
    doc.page.margins.top = 0

    const headerString = `page ${i + 1} of ${pages.count}`

    doc
      .fillColor(colors.slate["400"])
      .fontSize(7)
      .text(
        headerString,
        doc.page.width / 2 - doc.widthOfString(headerString) / 2,
        20,
        {
          features: OT_FEATURES,
          characterSpacing: -0.1,
          width: doc.widthOfString(headerString),
        }
      )
    doc.page.margins.top = oldTopMargin // ReProtect bottom margin
  }

  doc.pipe(createWriteStream(resolve(cwd(), "public", "resume.pdf")))
  doc.end()
}
