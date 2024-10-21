/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F0EAD6',
        primary: '#0000FF',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
