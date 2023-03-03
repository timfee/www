import "./global.css"
import clsx from "clsx"
import type { Metadata } from "next"
import PlausibleProvider from "next-plausible"
import { headers } from "next/headers"
import { NextRequest } from "next/server"
import type { FC, PropsWithChildren } from "react"

import AnalyticsWrapper from "@/components/Analytics"
import Navigation from "@/components/Navigation"
import { Sans, Serif } from "@/lib/fonts"
import GithubSvg from "@/public/github.svg"
import LinkedinSvg from "@/public/linkedin.svg"
import TwitterSvg from "@/public/twitter.svg"

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en' className={clsx("h-full", Sans.variable, Serif.variable)}>
      <head>
        <PlausibleProvider domain='timfeeley.com' trackOutboundLinks />
      </head>
      <body className='m-0 h-full scroll-smooth bg-gradient-to-br from-yuma-50 to-casal-50 bg-fixed bg-no-repeat antialiased'>
        <Navigation />
        {children}
        <footer className='py-12 text-center'>
          <SocialIcons />
        </footer>
        <AnalyticsWrapper />
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
        url: "https://timfeeley.com/opengraph.jpg",
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

const SocialIcons = () => {
  const ICONS = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/timfeeley",

      svg: LinkedinSvg,
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
    <section className='inline-flex space-x-6 text-slate-600'>
      {ICONS.map(({ name, href, svg: Svg }) => (
        <a key={name} href={href} rel='noopener noreferrer' target='_blank'>
          <Svg alt={name} width='18' height='18' />
        </a>
      ))}
      <a
        className='text-xs text-slate-800 underline'
        rel='noopener noreferrer'
        target='_blank'
        href='https://github.com/timfee/www'>
        view source
      </a>
    </section>
  )
}

export default RootLayout
