import './global.css'

import clsx from 'clsx'
import type { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'

import AnalyticsWrapper from '@/components/Analytics'
import { Soehne, Tiempos } from '@/lib/fonts'

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
          <a
            className="text-husk-800 text-xs underline"
            href="https://github.com/timfee/www">
            view source
          </a>
        </footer>
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
