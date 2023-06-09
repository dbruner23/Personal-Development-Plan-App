const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      border: {
        '3pixels' : '3px'
      },
      spacing: {
        '18': '4.5rem',
      },
      height: {
        '100vh': '100vh',
        '90vh': '90vh',
        '10vh': '10vh',
      },
      width: {
        '55%': '55%',
        '90%': '90%',
        '6.5rem': '6.5rem'
      },
      left: {
        '-10px': '-10px',
        '17rem': '17rem'
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height'
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
