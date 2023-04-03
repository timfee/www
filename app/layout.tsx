import { clsx } from "clsx"
import "./globals.css"
import localFont from "next/font/local"
import { Metadata } from "next"
import PlausibleProvider from "next-plausible"
import { Analytics } from "@vercel/analytics/react"
import Navbar from "./navbar"
import { GithubSvg, LinkedInSvg, TwitterSvg } from "@/components/logos"
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
        <a id="top" />
        <Navbar />
        {children}
        <Analytics />
        <footer className="mx-auto pb-36 text-center">
          <p className="mb-6 mt-20 text-slate-500">
            <span className="mr-2 font-serif">✌️</span> Thanks for visiting{" "}
          </p>
          <SocialIcons />
        </footer>
      </body>
    </html>
  )
}
export const metadata: Metadata = {
  description:
    "Hi, I’m Tim Feeley, a people-centric Product Manager from San Francisco.",
  themeColor: "#E6E2C1",

  openGraph: {
    description:
      "Hi, I’m Tim Feeley, a people-centric Product Manager from San Francisco.",
    url: "https://timfeeley.com",
    siteName: "Tim Feeley",
    images: [
      {
        url: "https://timfeeley.com/opengraph.png",
        width: 1920,
        height: 1080,
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

function SocialIcons() {
  const ICONS = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/timfeeley",

      svg: LinkedInSvg,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/timfee",

      svg: TwitterSvg,
    },
    {
      name: "GitHub",
      href: "https://github.com/timfee",

      svg: GithubSvg,
    },
  ]

  return (
    <section className="inline-flex space-x-6 text-slate-400">
      {ICONS.map(({ name, href, svg: Svg }) => (
        <a key={name} href={href} rel="noopener noreferrer" target="_blank">
          <Svg width="18" height="18" />
        </a>
      ))}
      <a
        className="text-xs text-slate-800 underline"
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/timfee/www">
        view source
      </a>
    </section>
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
