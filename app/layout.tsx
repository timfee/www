import localFont from "next/font/local"
import { clsx } from "clsx"
import "./globals.css"
import PlausibleProvider from "next-plausible"
import { Analytics } from "@vercel/analytics/react"

import Navigation from "./navigation"

export const metadata = {
  title: {
    default: "Tim Feeley — Product manager. Friend.",
    template: "Tim Feeley — %s",
  },
  description:
    "Hi, I’m Tim Feeley, a people-centric Product Manager from San Francisco.",
  themeColor: "#e2e8f0",

  openGraph: {
    description:
      "Hi, I’m Tim Feeley, a people-centric Product Manager from San Francisco.",
    url: "https://timfeeley.com",
    siteName: "Tim Feeley",
    images: [
      {
        url: "https://timfeeley.com/opengraph.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    title: "Tim Feeley",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.svg",
  },

  viewport: "width=device-width, initial-scale=1",
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx("h-full", Sans.variable, Serif.variable)}>
      <head>
        <PlausibleProvider
          domain="timfeeley.com"
          trackFileDownloads
          trackOutboundLinks
        />
      </head>
      <body>
        <Navigation />
        <main className="prose mx-auto max-w-3xl px-3">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}

const Sans = localFont({
  display: "swap",
  preload: true,
  variable: "--font-sans",
  src: [
    {
      path: "../public/fonts/sans-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sans-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/sans-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/sans-medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/sans-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/sans-semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/sans-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/sans-bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/sans-black.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/sans-black-italic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
})
const Serif = localFont({
  display: "swap",
  preload: true,
  variable: "--font-serif",
  src: [
    {
      path: "../public/fonts/serif-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/serif-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/serif-bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/serif-bold-italic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
})
