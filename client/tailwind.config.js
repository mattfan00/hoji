module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#FDB147',
        'primary-dark': '#F3A73D',
      },
      fontSize: {
        // ['font-size', 'line-height']
        'xxs': ['0.625rem', '1rem']
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
