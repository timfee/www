module.exports = function TypographyColors(theme) {
  return {
    DEFAULT: {
      css: {
        a: {},
      },
    },
    bio: {
      css: {
        p: {
          fontFamily: theme("fontFamily.serif")[0],
        },
        "h1 em": {
          fontFamily: theme("fontFamily.serif")[0],
          fontWeight: 700,
          fontStyle: "normal",
        },
        h1: {
          margin: "0",
        },
      },
    },
    homehero: {
      css: {
        h1: {
          fontFamily: theme("fontFamily.sans")[0],
          fontWeight: "800",
          letterSpacing: "-0.03em",
          fontFeatureSettings:
            '"ss01", "ss02", "kern", "liga", "clig", "calt", "dlig"',
          marginTop: "2rem",
          color: theme("colors.casal.500"),
        },
        "h1 em": {
          fontFamily: theme("fontFamily.serif")[0],
          fontWeight: 700,
          fontStyle: "normal",
        },
        h2: {
          fontFamily: theme("fontFamily.sans")[0],
          color: theme("colors.casal.700"),
          fontWeight: "700",
          fontFeatureSettings:
            '"ss01", "ss02", "kern", "liga", "clig", "calt", "dlig"',
          fontSize: "1.35em",
          letterSpacing: "-0.02em",
        },
        p: {
          fontSize: "0.95em",
          lineHeight: "1.6em",
        },
        textAlign: "center",
        color: theme("colors.black"),
      },
    },
  }
}
