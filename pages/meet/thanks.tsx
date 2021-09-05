import Link from 'next/link'
import Image from 'next/image'

const Meet = () => {
  return (
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
      <h1 className="font-sans font-bold text-5xl" style={{ color: '#894D00' }}>
        Thanks!
      </h1>
      <p className="text-lg">Talk soon.</p>
    </main>
  )
}
export default Meet
