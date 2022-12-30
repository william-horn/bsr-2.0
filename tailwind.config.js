/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      '4xsm': '280px',
      '3xsm': '320px',
      '2xsm': '440px',
      'xsm': '520px',
      ...defaultTheme.screens
    },

    extend: {
      colors: {
        'alpha': '#ce9454',
      }
    },
  },
  plugins: [],
}
