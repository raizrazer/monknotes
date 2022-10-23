/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'brand-main-color-dark':"#1F0318",
        'brand-main-medium-color':"#59284D",
        'brand-lite-color':"#837569",
      },
      fontSize:{
        'brand-biggest':"22px",
        'brand-heading':"18px",
        'brand-maintitle':"16px",
        'brand-subtitle':"12px",
        'brand-body':"12px",
      },
      boxShadow:{
        'brand-main':'0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      borderRadius:{
        'brand-main': '10px',
      }
    },
  },
  plugins: [],
}