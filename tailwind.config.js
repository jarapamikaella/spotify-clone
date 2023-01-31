/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        black: '#000000',
        secondary: '#121212',
        white: '#FFFFFF',
        background: '#181818',
        active: '#1db954'
      },
      fontSize: {
        'xs2': ['10px', { 'line-height': '12px'}],
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
   },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
}
