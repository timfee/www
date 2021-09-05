import Head from 'next/head'

const Home = () => (
  <main
    style={{ fontFeatureSettings: '"salt" on, "onum" on' }}
    className="flex flex-col items-center justify-center h-screen max-w-2xl px-12 mx-auto space-y-8 font-mono text-center">
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Tim Feeley</title>
    </Head>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 175 175"
      className="w-20">
      <path
        d="M135 69v101a2 2 0 11-5 0h0V77l5-8zm29-67a8 8 0 018 8v160a2 2 0 01-5 0V7H48v69l40 64L167 7v7L88 149 48 84l1 86c0 1-1 2-3 2h0l-2-2V77L7 15v155c0 1-1 2-3 2h0l-2-2V10c0-4 4-8 8-8h154zM44 7H7v1l37 61V7z"
        stroke="#000"
        strokeWidth="2"
        fill="#000"
        fillRule="evenodd"
        strokeLinejoin="round"
      />
    </svg>

    <h1 className="text-2xl font-bold tracking-tight">Tim Feeley</h1>

    <p>
      Hello there
      <span className="sr-only">! </span>
      <span
        role="img"
        aria-label="waving hello"
        style={{ transformOrigin: '75% 50%' }}
        className="inline-block mx-2 animate-wave">
        👋
      </span>
    </p>
    <p>
      I’m <span className="sr-only">Tim Feeley,</span> a people-centric Product
      Manager with over 15 years of experience at companies like Okta, Google,
      Facebook and Tripadvisor shipping products to make technology more
      accessible, enjoyable and useful.
    </p>

    <p className="text-sm">
      None of us have it all figured out.
      <br />
      But together, we can make better mistakes tomorrow.
    </p>

    <div className="text-xs mb-4">
      <p className="mb-2 italic">Get in touch:</p>
      <p>
        <a
          href="https://twitter.com/timfee"
          target="_blank"
          title="Tim Feeley (@timfee) on Twitter"
          rel="noreferrer">
          <span className="text-blue-300">@</span>timfee
        </a>
        <span className="mx-1">|</span>
        <a
          href="https://linkedin.com/in/timfeeley"
          title="Tim Feeley LinkedIn"
          rel="noreferrer">
          <span className="text-blue-600">in/</span>timfeeley
        </a>
      </p>
    </div>
  </main>
)

export default Home
