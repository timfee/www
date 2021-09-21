import { styled } from '../stitches.config'

export const Image = styled('img', {
  // Reset
  verticalAlign: 'middle',
  maxWidth: '100%',

  variants: {
    rounded: {
      true: {
        borderRadius: '$round'
      }
    }
  }
})
