import Head from 'next/head'

import { Box } from '@/components/Box'
import { Heading } from '@/components/Heading'
import { Image } from '@/components/Image'
import { Paragraph } from '@/components/Paragraph'

const Meet = () => {
  return (
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
        <title>Meet with Tim Feeley</title>
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
        Thanks!
      </Heading>

      <Paragraph size="2" css={{ mt: '25px' }}>
        Talk soon
      </Paragraph>
    </Box>
  )
}
export default Meet
