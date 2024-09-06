/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
        flex: {
          '2': 2
        },
        backgroundColor: {
          'main-red': '#A04747'
        }
    },
  },
  plugins: [],
};
