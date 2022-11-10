const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        '100vh': '100vh',
        '90vh': '90vh',
        '10vh': '10vh',
      },
      transitionProperty: {
        'width': 'width'
      },
      keyframes: {
        load: {
          '0%' : {
            transform: 'rotate(0deg)',
            strokeDashoffset: '20',
          }, 
          '50%' : {
            strokeDashoffset: '0',
          },
          '100%' : {
            transform: "rotate(360deg)",
            strokeDashoffset: '-32'
          }
        }
      },
      animation: {
        loading: 'load 2s linear infinite'
      }
    },
  },
  plugins: [],
};
