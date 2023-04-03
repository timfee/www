import type { Config } from "tailwindcss"

import typography from "@tailwindcss/typography"
import plugin from "tailwindcss/plugin"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  content: [
    "./content/**/*.{md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: function (theme: (argument0: string) => string[]) {
        return {
          DEFAULT: {
            css: {
              fontFamily: theme("fontFamily.serif").join(","),
              "h1,h2,h3,h4,h5,h6": {
                fontFamily: theme("fontFamily.sans").join(","),
              },
              "code:not([class])": {
                color: "var(--tw-prose-pre-bg)",
                borderRadius: theme("borderRadius.lg"),
                paddingTop: theme("padding.1"),
                paddingRight: theme("padding[1.5]"),
                paddingBottom: theme("padding.1"),
                paddingLeft: theme("padding[1.5]"),
                boxShadow: "inset 0 0 0 1px var(--tw-prose-code-ring)",
                backgroundColor: "var(--tw-prose-pre-code)",
                fontSize: theme("fontSize.2xs"),
                whiteSpace: "no-wrap",
              },

              "code::before": {
                content: '""',
              },
              "code::after": {
                content: '""',
              },
              h1: {
                letterSpacing: "-0.05rem",
                fontWeight: 700,
                fontSize: theme("fontSize.3xl")[0],
              },
              h2: {
                marginTop: 0,
                letterSpacing: "-0.03rem",
                fontWeight: 700,
                fontSize: theme("fontSize.2xl"),
              },
              "h2 code": {
                fontWeight: 700,
              },
              h3: {
                letterSpacing: "-0.015rem",
                fontWeight: 700,
                fontSize: theme("fontSize.xl"),
              },
              a: {
                color: "#3182ce",
                "&:hover": {
                  color: "#2c5282",
                },
              },
            },
          },
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
      aria: {
        current: 'current="page"',
      },
    },
  },
  plugins: [
    typography,
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"])
    }),
  ],
} satisfies Config
