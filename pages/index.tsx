import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Head from 'next/head'
import CountUp from 'react-countup'

import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'
import { Image } from '@/components/Image'
import { Link } from '@/components/Link'
import { Paragraph } from '@/components/Paragraph'

const Home = () => (
  <Box
    as="main"
    css={{
      mt: '60px',
      maxWidth: '450px',
      mx: '45px',
      '@bp1': { mx: 'auto' }
    }}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Tim Feeley</title>
    </Head>

    <Image
      css={{ ml: '-40px', mt: '25px' }}
      rounded
      alt="Tim Feeley"
      width={200}
      height={200}
      src={'/timfeeley.png'}
    />

    <Heading size="3" css={{ mt: '25px' }}>
      Hi, I’m Tim
      <VisuallyHidden>Feeley</VisuallyHidden>
    </Heading>

    <Paragraph size="2" css={{ mt: '25px' }}>
      I’m a people-centric Product Manager with
      <VisuallyHidden>over 15</VisuallyHidden>
      <CountUp
        prefix={' '}
        suffix={' '}
        delay={0}
        duration={2}
        useEasing={true}
        start={9}
        decimals={2}
        end={(Date.now() - 1136275200000) / 3.154e10}
      />
      years of experience building products that make technology more
      accessible, enjoyable and useful. Not that I’m counting…
      <span role="img" aria-label="love">
        🤓
      </span>
    </Paragraph>

    <Box as="footer">
      <Paragraph size="1" css={{ mt: '25px' }}>
        Find me on{' '}
        <Link
          variant="blue"
          href="https://twitter.com/timfee"
          target="_blank"
          title="Tim Feeley (@timfee) on Twitter"
          rel="noreferrer">
          Twitter
        </Link>
        ,{' '}
        <Link
          variant="blue"
          href="https://linkedin.com/in/timfeeley"
          title="Tim Feeley LinkedIn"
          rel="noreferrer">
          LinkedIn
        </Link>{' '}
        and{' '}
        <Link
          variant="blue"
          href="https://github.com/timfee"
          title="Tim Feeley GitHub"
          rel="noreferrer">
          GitHub
        </Link>
        .
      </Paragraph>
    </Box>
  </Box>
)

export default Home
