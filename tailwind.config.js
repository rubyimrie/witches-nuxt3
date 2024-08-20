module.exports = {
  theme: {
    screens: {
      'xs': '300px',
      'sm': '450px',
      'md': '768px',
      'lg': '954px',
      'ml': '1100px', 
      'xl': '1200px',
    },
    extend: {
      colors: {
        'icon-grey': "#606f7b",
        'witch-yellow': '#eeb518e1',
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16'
        }
      },
      backgroundImage: {
        'wood-cut': "url('/images/wood-cut-background.jpeg')",
      },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      }
    },
  },
  variants: {},
  plugins: [require('@vueform/vueform/tailwind')],
  content: [
    // ... your project files, eg.:
    // './index.html',
    // './src/**/*.{vue,js,ts,jsx,tsx}',
    './vueform.config.ts', // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
  ],
  darkMode: 'class',
}