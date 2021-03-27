const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'primary': '#FDB147',
        'primary-dark': '#F3A73D',
      },
      fontSize: {
        // ['font-size', 'line-height']
        'xxs': ['0.625rem', '1rem']
      },
      animation: {
        'fade-enter': 'enter .25s forwards',
        'fade-exit': 'exit .25s forwards'
      },
      keyframes: {
        enter: {
          'from': { opacity: 0, transform: 'translateY(-10px)' },
          'to': { opacity: 1, transform: 'translateY(0px)' },
        },
        exit: {
          'from': { opacity: 1, transform: 'translateY(0px)' },
          'to': { opacity: 0, transform: 'translateY(-10px)' },
        }
      }
    },
    fontFamily: {
      'sans': ['Avenir Next'],
    },
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
      margin: ['first', 'last']
    },
  },
  plugins: [],
}
