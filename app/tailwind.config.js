module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF7A00'
        },
        gray: {
          DEFAULT: '#B6B6B6'
        }
      },
      fontSize: {
        '3xl': '1.75rem'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
