module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // mode:"jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    
    extend: {
      colors: {
        'white':'#ffffff',
        'gray-100':'#242424',
        'gray-200':'#212121',
        'gray-300':'#181818',
        'gray-400':'#151515',
        'gray-500':'#121212',
        'gray-600':'#090909',
        'gray-700':'#060606',
        'gray-800':'#030303',
        'gray-900':'#000000',

        'yellow-600':'#090909',
        'yellow-700':'#030303',

        'blue-600':'#151515',
  
  
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
