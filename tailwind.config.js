const tailwindTypography = require("./tailwind.typography.js")
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: require("./tailwind.colors.js"),
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
      typography: (theme) => tailwindTypography(theme),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
