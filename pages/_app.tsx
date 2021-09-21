import '../styles/fonts.css'

import { IdProvider } from '@radix-ui/react-id'
import type { AppProps } from 'next/app'

import { globalCss } from '../stitches.config'

const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box'
  },

  body: {
    margin: 0,
    backgroundColor: '$canvas',
    fontFamily: '$untitled',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTextSizeAdjust: '100%',

    '.dark-theme &': {
      backgroundColor: '$mauve1'
    }
  },

  svg: {
    display: 'block',
    verticalAlign: 'middle'
  },

  'pre, code': { margin: 0, fontFamily: '$mono' },

  '::selection': {
    backgroundColor: '$violet5',
    color: '$violet12'
  },

  '#__next': {
    position: 'relative',
    zIndex: 0
  },

  'h1, h2, h3, h4, h5': { fontWeight: 500 }
})

const App = ({ Component, pageProps }: AppProps) => {
  globalStyles()

  return (
    <IdProvider>
      <Component {...pageProps} />
    </IdProvider>
  )
}

export default App
