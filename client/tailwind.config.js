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
        'xxs': ['0.625rem', '1rem'],
        'xs': ['0.75rem', '1.625']
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
      },
      zIndex: {
        '-10': '-10'
      },
    },
    fontFamily: {
      'sans': ['Inter'],
      //'sans': ['Avenir Next'],
      'mono': ['monospace']
      //'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
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
