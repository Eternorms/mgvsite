/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1D33',
          mid: '#0F2442',
          deep: '#081628',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#DFC07A',
          dark: '#A8882E',
        },
        graphite: '#2D2D2D',
        offwhite: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Libre Baskerville', 'serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [],
}
