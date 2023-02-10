/* eslint-disable @typescript-eslint/no-var-requires */

const tailwindTypography = require('./tailwind.typography.cjs')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-soehne)', ...fontFamily.sans],
        serif: ['var(--font-tiempos)', ...fontFamily.serif],
      },
      colors: {
        husk: {
          50: '#ECE9D0',
          100: '#E6E2C1',
          200: '#DAD4A4',
          300: '#CEC688',
          400: '#C2B86B',
          500: '#B7AA4E',
          600: '#988E3E',
          700: '#776F31',
          800: '#575123',
          900: '#363316',
        },
        peacock: {
          50: '#AFEAFA',
          100: '#95E3F8',
          200: '#60D4F5',
          300: '#2BC4F2',
          400: '#0DA7D8',
          500: '#0A7DA3',
          600: '#086686',
          700: '#064F69',
          800: '#05394D',
          900: '#032330',
        },
        cerise: {
          50: '#FDF2F5',
          100: '#FBE9EE',
          200: '#F7CAD7',
          300: '#F2ABBF',
          400: '#EB809E',
          500: '#DE3163',
          600: '#CF2152',
          700: '#B41D48',
          800: '#91173A',
          900: '#6E122C',
        },
      },
      typography: (theme) => tailwindTypography(theme),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
