import 'tailwindcss/tailwind.css'
import '../styles/fonts.css'

import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
