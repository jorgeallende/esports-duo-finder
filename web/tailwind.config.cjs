/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        
      },
      backgroundImage:{
        galaxy: "url('./galaxy.png')",
        'nlw-gradient': 'linear-gradient(90deg, rgba(227,17,17,1) 0%, rgba(230,213,30,1) 35%, rgba(8,226,17,1) 63%, rgba(0,212,255,1) 100%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%);'
      }
    },
  },
  plugins: [],
}
