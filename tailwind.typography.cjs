module.exports = function TypographyColors(theme) {
  return {
    DEFAULT: {
      css: {
        a: {},
      },
    },
    homehero: {
      css: {
        h1: {
          fontFamily: theme('fontFamily.sans')[0],
          fontWeight: '700',
          letterSpacing: '-0.025em',
          marginTop: '3rem',
          color: theme('colors.peacock.800'),
        },
        h2: {
          fontFamily: theme('fontFamily.sans')[0],
          color: theme('colors.peacock.600'),
          fontWeight: '600',
          fontSize: '1.35em',
          letterSpacing: '-0.02em',
        },
        p: {
          fontSize: '0.9em',
          lineHeight: '1.6em',
        },
        textAlign: 'center',
        color: theme('colors.black'),
      },
    },
  }
}
