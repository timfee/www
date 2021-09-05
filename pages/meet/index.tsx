import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const Meet = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tim Feeley</title>
      </Head>
      <main
        className="flex font-serif flex-col text-center h-screen mx-auto items-center justify-center px-12 max-w-xl space-y-8"
        style={{ color: '#231400' }}
      >
        <Link href="/">
          <a>
            <Image
              src="/timfeeley.png"
              alt="Tim Feeley"
              className="w-48 mx-auto rounded-full"
            />
          </a>
        </Link>
        <h1
          className="font-sans font-bold text-5xl"
          style={{ color: '#894D00' }}
        >
          Let’s chat
        </h1>
        <p className="text-lg">How long should we meet?</p>
        <p className="flex font-sans space-x-4">
          {[30, 45, 60].map((duration) => (
            <a
              key={'meet' + duration}
              target="_blank"
              className="text-xl inline-flex items-center px-6 py-3 border-2 border-blue-100 shadow-sm font-medium rounded-md text-gray-800 bg-white  hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              href={'https://calendly.com/timfee/' + duration}
              rel="noreferrer"
            >
              {duration} mins
            </a>
          ))}
        </p>
      </main>
    </>
  )
}
export default Meet
