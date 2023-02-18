import type { Metadata } from 'next'

import AnimatedText from '@/components/AnimatedText'
import { Container } from '@/components/Container'
import Headshot from '@/components/Headshot'
import { generatePdf } from '@/lib/pdf'

export const revalidate = 0

export default function Home() {
  generatePdf()
  return (
    <>
      <Headshot
        className="absolute inset-x-0 top-0 z-10 mx-auto mt-12 inline-block w-fit"
        width={300}
      />
      <Container as="section" className="mt-64">
        <div className="prose prose-homehero card px-10 pb-6 pt-20 font-serif font-thin sm:px-[5rem]">
          <AnimatedText />
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  title: {
    absolute: 'Tim Feeley — Product manager. Friend.',
  },
  description:
    'Hi, I’m Tim Feeley, a people-centric Product Manager from San Francisco.',
  themeColor: '#E6E2C1',
  openGraph: {
    title: {
      absolute: 'Tim Feeley — Product manager. Friend.',
    },
    description:
      'Hi, I’m Tim Feeley, a people-centric Product Manager from San Francisco.',
    url: 'https://timfeeley.com',
    siteName: 'Tim Feeley',
    images: [
      {
        url: 'https://timfeeley.com/opengraph.jpg',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
}
