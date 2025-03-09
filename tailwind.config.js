import { transform } from 'motion';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily:{
      mons:["Montserrat"],
      rale:["Raleway"],
      roboto:['Roboto'],
      dancing:['Dancing Script'],
      Playfair:['Playfair Display']
    },
    extend: {
        animation:{
          fadeX:'fadeX 2s ease-in-out forwards',
          fadeY:'fadeY 2s ease-in-out forwards'
        },
        keyframes:{
          fadeX:{
            '0%':{
              transform:'translateX(-100%)',opacity:0,

            },
            '100%':{
              transform:'translateX(0)',opacity:1,
            }
          },
          fadeY:{
            '0%':{
              transform:'translateY(50%)',opacity:0,
            },
            '100%':{
              transform:'translateY(0)',opacity:1,
            },
          }
        }
    },
  },
  plugins: [],
}

