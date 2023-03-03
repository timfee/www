const { fontFamily } = require("tailwindcss/defaultTheme")

const tailwindTypography = require("./tailwind.typography.js")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: require("./tailwind.colors.js"),
    extend: {
      aria: {
        current: 'current="page"',
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
      typography: (theme) => tailwindTypography(theme),
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
