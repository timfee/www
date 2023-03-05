import type { Metadata } from "next"

import Container from "@/components/Container"
import Resume from "@/components/Resume"

function Bio(): JSX.Element {
  return (
    <Container className='prose prose-bio prose-blue mt-12'>
      <h1>Tim Feeley’s Bio</h1>
      <p>
        I’m originally from the East Coast, and when Silicon Valley came calling
        in 2016, I answered—and I’ve been living in the Bay Area ever since.
      </p>
      <p>
        From coast to coast and over the past 20 years, I’ve worked alongside
        talented teams to bring our best ideas to life and deliver outcomes that
        make a real impact. Some of my most recent experience includes:
      </p>

      <Resume />
      <p>
        In my free time, I love spending time with my two hairless cats,{" "}
        <a
          href='https://instagram.com/booleanthebambino'
          rel='noopener noreferrer'
          target='_blank'>
          Boolean
        </a>{" "}
        and{" "}
        <a
          href='https://instagram.com/hairlessfelix'
          rel='noopener noreferrer'
          target='_blank'>
          Felix
        </a>
        , catching a BroadwaySF show, and brushing up on my React and web
        development skills.
      </p>
      <p>
        I’m constantly inspired by the fast-paced and ever-changing nature of
        the tech industry. I believe that we can make a positive impact on the
        world by leveraging technology to solve real-world problems and create
        products that people love to use.
      </p>
      <p>
        I’m always looking for new opportunities to learn, grow, and make a
        difference in the world. None of us have it all figured out, but
        together, we can make better mistakes tomorrow.
      </p>
    </Container>
  )
}

export const metadata: Metadata = {
  title: "Tim Feeley’s Bio",
  openGraph: {
    title: "Tim Feeley’s Bio",
  },
}

export default Bio
