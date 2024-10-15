/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',               
    './src/**/*.{js,ts,jsx,tsx}' 
  ],
  
  theme: {
    extend: {
      colors: {
        customYellow: '#e9c46a', 
        customGray:'#99582a',
        customPeach:'#ffe6a7',
        customBox:'#ffffff',
        borderColor:'#606c38',
        taskButton:'#283618',
        OwnerColor:'#05668d',
        activeColor:'#aacc00',
        swalbg:'#f5ebe0',
        loginbg:'#d4a373',
        taskBar:'#283618',
        taskBg:'#606c38',
        taskText:'#fefae0',
        dashh1:'#432818',
        card1:'#73628a',
        card2:'#197278',
        card3:'#da7422',
        card4:'#38b000',
        tablebg:'#faedcd'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

