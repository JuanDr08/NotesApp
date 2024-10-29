/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
		"./src/**/*.{js,ts,jsx,tsx, html}"
  ],
  theme: {
    extend: {
      colors: {
        'darkOne': '#252525',
        'darktwo': '#3B3B3B',
        'darkThree': '#3B3B3B',
        'lila': '#B69CFF',
        'cyan': '#9EFFFF',
        'yellow': '#FFF599',
        'green': '#91F48F',
        'red': '#FF0000',
        'gray': '#9A9A9A',
        'pink': '#FD99FF',
        'redTwo': '#FF9E9E',
        'beige': '#CFCFCF',
        'semiBrown': '#9A9A9A'
      },
      fontFamily: {
        'NunitoBlack': ['Nunito-Black', 'sans-serif'],
        'NunitoBlackItalic': ['Nunito-BlackItalic', 'sans-serif'],
        'NunitoBold': ['Nunito-Bold', 'sans-serif'],
        'NunitoBoldItalic': ['Nunito-BoldItalic', 'sans-serif'],
        'NunitoExtraBold': ['Nunito-ExtraBold', 'sans-serif'],
        'NunitoExtraBoldItalic': ['Nunito-ExtraBoldItalic', 'sans-serif'],
        'NunitoExtraLight': ['Nunito-ExtraLight', 'sans-serif'],
        'NunitoExtraLightItalic': ['Nunito-ExtraLightItalic', 'sans-serif'],
        'NunitoItalic': ['Nunito-Italic', 'sans-serif'],
        'NunitoLightItalic': ['Nunito-LightItalic', 'sans-serif'],
        'NunitoMedium': ['Nunito-Medium', 'sans-serif'],
        'NunitoMediumItalic': ['Nunito-MediumItalic', 'sans-serif'],
        'NunitoRegular': ['Nunito-Regular', 'sans-serif'],
        'NunitoSemiBold': ['Nunito-SemiBold', 'sans-serif'],
        'NunitoSemiBoldItalic': ['Nunito-SemiBoldItalic', 'sans-serif']
      }
    },
  },
  plugins: [],
}

