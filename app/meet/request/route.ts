/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createHash } from "crypto"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import sendMail from "@/utils/email/send"
import { LOCAL_TIMEZONE } from "@/utils/scheduler"
import createAppointment from "@/utils/scheduler/createCalendarAppointment"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const data = searchParams.get("data")
  if (!data) {
    return new NextResponse()
  }
  const hash = getHash(decodeURIComponent(data))
  if (hash !== searchParams.get("key")) {
    return new NextResponse()
  }
  const object = JSON.parse(decodeURIComponent(data))

  if (!object.name) {
    throw new Error("No name")
  }
  if (!object.email) {
    throw new Error("No email")
  }
  if (!object.start) {
    throw new Error("No start")
  }
  if (!object.end) {
    throw new Error("No end")
  }
  if (!object.timeZone) {
    throw new Error("No timeZone")
  }
  if (!object.location) {
    throw new Error("No location")
  }
  if (!object.duration) {
    throw new Error("No duration")
  }

  const response = await createAppointment({
    name: object.name,
    email: object.email,
    start: object.start,
    timeZone: object.timeZone,
    requestId: hash,
    end: object.end,
    location: object.location,
    summary: `${object.duration} minute meeting with Tim`,
  })

  return NextResponse.json(response)
}
export async function POST(request: NextRequest) {
  const data = await request.json()
  const { origin } = new URL(request.url)

  if (!data) {
    return new NextResponse()
  }
  if (!data.name) {
    return new NextResponse()
  }
  const start = new Date(data.start)
  const end = new Date(data.end)

  const body = `${data.name} would like to meet on ${new Date(
    start
  ).toLocaleString([], {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
    timeZone: LOCAL_TIMEZONE,
  })} - ${new Date(end).toLocaleString([], {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: LOCAL_TIMEZONE,
  })} (${data.duration} minutes) via ${data.location} their timezone is ${
    data.timeZone
  }.

To accept it, visit  ${origin}/meet/request/?data=${encodeURIComponent(
    JSON.stringify(data)
  )}&key=${getHash(JSON.stringify(data))}`

  await sendMail({
    to: process.env.GOOGLE_CALENDAR_OWNER ?? "",
    subject: "Meeting request",
    body,
  })

  await sendMail({
    to: data.email,
    subject: "Got your meeting request",
    body: `Hi there,

Just confirming that your meeting request for ${new Date(start).toLocaleString(
      [],
      {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        weekday: "long",
        timeZone: data.timeZone,
      }
    )} - ${new Date(end).toLocaleString([], {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "shortGeneric",
      timeZone: data.timeZone,
    })} went through. I'll get back to you shortly to confirm!

Thanks,
—Tim`,
  })

  return NextResponse.json({ success: true })
}

const getHash = (data: string) =>
  createHash("sha256")
    .update(data + (process.env.GOOGLE_CALENDAR_CLIENT_SECRET ?? ""))
    .digest("hex")
