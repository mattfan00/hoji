module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#FDB147',
        'primary-dark': '#F3A73D',
      }
    },
    fontFamily: {
      'sans': ['Avenir Next'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
