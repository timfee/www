module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        mono: ['Dossier', 'Courier New', 'monospaced', 'mono']
      },
      keyframes: {
        waving: {
          '0%': { transform: 'rotate(0.0deg)' },
          '5%': { transform: 'rotate(14.0deg)' },
          '10%': { transform: 'rotate(-8.0deg) scaleX(120%) scaleY(120%)' },
          '15%': { transform: 'rotate(14.0deg) scaleX(120%) scaleY(120%)' },
          '20%': { transform: 'rotate(-4.0deg) scaleX(120%) scaleY(120%)' },
          '25%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' }
        }
      },
      animation: {
        wave: 'waving 5s ease infinite'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
