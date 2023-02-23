/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        durablue: '#001E30',
        duraaccent: '#63CFFF',
        darkcyan: '#1689B3',
      }
    }
  },
  plugins: [],
}
