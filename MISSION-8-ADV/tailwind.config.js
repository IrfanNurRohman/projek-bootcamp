/** @type {import('tailwindcss').Config} */

import {colors} from './src/styles/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'dashboard': "url('/image_bg_footer.jpg')", // ← nama bebas
      },

      animation: {
        'spin-slow': 'spin 3s linear infinite', // 3s instead of 1s
      },
      colors:{
        primary:{
          DEFAULT: colors.primary,
          400: colors.primary400,
          300: colors.primary300,
          200: colors.primary200,
          100: colors.primary100

        }
      }



    },
  },
  plugins: [],
}
