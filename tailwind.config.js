const colors = require('tailwindcss/colors');
// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,js,css}',
    './public/index.html',
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0,0,0,0.5)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s cubic-bezier(0.4,0,0.2,1) both',
      },
    },
    colors: {
      primary: '#3b82f6', // blue-500
      secondary: '#1d4ed8', // blue-700
      accent: '#60a5fa', // blue-400
      danger: '#ef4444', // red-500
      warning: '#f59e42', // orange-400
      success: '#22c55e', // green-500
      info: '#0ea5e9', // sky-500
      ...colors,
    },
  },
  plugins: [],
};
