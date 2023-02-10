import './global.css'

import clsx from 'clsx'
import type { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'

import AnalyticsWrapper from '@/components/Analytics'
import { Soehne, Tiempos } from '@/lib/fonts'
import GithubSvg from '@/public/github.svg'
import LinkedinSvg from '@/public/linkedin.svg'
import TwitterSvg from '@/public/twitter.svg'

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    title: 'Tim Feeley',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.svg',
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full', Tiempos.variable, Soehne.variable)}>
      <head>
        <PlausibleProvider domain="hire.timfeeley.com" trackOutboundLinks />
      </head>
      <body className="from-husk-50/70 no-repeat m-0 h-full bg-gradient-to-br to-slate-50 bg-fixed antialiased">
        {children}
        <footer className="py-12 text-center">
          <SocialIcons />
        </footer>
        <AnalyticsWrapper />
      </body>
    </html>
  )
}

function SocialIcons() {
  const ICONS = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/timfee',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      svg: LinkedinSvg,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/timfee',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      svg: TwitterSvg,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/timfee',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      svg: GithubSvg,
    },
  ]

  return (
    <section className="inline-flex space-x-6 text-slate-600">
      {ICONS.map(({ name, href, svg: Svg }) => (
        <a key={name} href={href} rel="noopener noreferrer" target="_blank">
          <Svg alt={name} width="18" height="18" />
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
