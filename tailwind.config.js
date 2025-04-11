/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#0D0D0D',
        secondary: '#43DDFF',
        borderaccent: '#848484',
        cardborder: '#E1E1E1'
      },
      fontFamily: {
        sans: ['Inter-Regular'],
        bold: ['Inter-Bold'],
      },
    },
  },
  plugins: [],
}