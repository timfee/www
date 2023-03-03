import type { Metadata } from "next"

import AnimatedText from "@/components/AnimatedText"
import { Container } from "@/components/Container"
import Headshot from "@/components/Headshot"
import { toRgb } from "@/lib/colors"
import colors from "@/tailwind.colors"
import { generatePdf } from "@/utils/resume"

export const revalidate = 0

const Home = async (): Promise<JSX.Element> => {
  generatePdf()
  return (
    <>
      <Headshot
        className='absolute inset-x-0 top-0 z-10 mx-auto mt-24 inline-block w-fit'
        width={300}
      />
      <Container
        as='main'
        className='mt-72 rounded-3xl bg-white'
        style={{
          boxShadow: `15px 15px 30px ${toRgb(
            colors.schist[100],
            0.6
          )}, -15px -15px 30px ${toRgb(colors.yuma[100], 0.3)}`,
        }}>
        <div className='prose prose-homehero px-10 pb-6 pt-20 font-serif sm:px-[5rem]'>
          <AnimatedText />
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  title: "Tim Feeley — Product manager. Friend.",
  openGraph: {
    title: "Tim Feeley — Product manager. Friend.",
  },
}

export default Home
