import Document, { Head, Html, Main, NextScript } from 'next/document'

import { getCssText } from '../stitches.config'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <meta charSet="utf-8" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />

          <meta
            name="description"
            content="Hi, I’m Tim Feeley, a people-centric Product Manager from San Francisco."
          />
          <meta name="author" content="Tim Feeley" />
          <meta name="robots" content="index, follow" />
          <meta name="rating" content="safe for kids" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Tim Feeley" />
          <meta property="og:url" content="https://timfeeley.com/" />
          <meta
            property="og:image"
            content="https://timfeeley.com/opengraph.png"
          />
          <meta
            property="og:description"
            content="Hi, I’m Tim Feeley, a people-centric Product Manager from San Francisco."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Tim Feeley" />
          <meta name="twitter:site" content="@timfee" />
          <meta
            name="twitter:description"
            content="Hi, I’m Tim Feeley, a people-centric Product Manager from San Francisco."
          />
          <meta
            name="twitter:image"
            content="https://timfeeley.com/opengraph.png"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org/',
                '@type': 'Person',
                name: 'Tim Feeley',
                image: 'https://timfeeley.com/timfeeley.png',
                url: 'https://timfeeley.com/',
                jobTitle: 'Product Manager',
                worksFor: {
                  '@type': 'Organization',
                  name: 'Okta'
                },
                sameAs: [
                  'https://linkedin.com/in/timfeeley',
                  'https://twitter.com/timfee'
                ]
              })
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
