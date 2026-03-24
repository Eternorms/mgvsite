/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand colors (Official MGV Brand Guide)
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
        white: '#FFFFFF',
        'off-white': '#FAFAFA',
        // Neutral colors
        gray: {
          light: '#F2F2F2',
          DEFAULT: '#64748B',
          mid: '#E4E4E4',
          dark: '#475569',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        heading: ['Libre Baskerville', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        accent: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        // Headings
        'display': ['56px', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['42px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.4', fontWeight: '700' }],
        'h4': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        // Body
        'body-lg': ['16px', { lineHeight: '1.6' }],
        'body': ['14px', { lineHeight: '1.6' }],
        'body-sm': ['13px', { lineHeight: '1.5' }],
        'caption': ['10px', { lineHeight: '1.4' }],
      },
      spacing: {
        // Design system spacing scale
        'xs': '4px',    // 4px
        'sm': '8px',    // 8px
        'md': '16px',   // 16px
        'lg': '24px',   // 24px
        'xl': '40px',   // 40px
        '2xl': '64px',  // 64px
        // Custom spacing
        '18': '72px',
        '22': '88px',
        '30': '120px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '20px',
      },
      boxShadow: {
        'sm': '0 1px 4px rgba(11, 29, 51, 0.08)',
        'md': '0 4px 16px rgba(11, 29, 51, 0.12)',
        'lg': '0 8px 32px rgba(11, 29, 51, 0.18)',
        'card': '0 4px 20px rgba(11, 29, 51, 0.08)',
        'card-hover': '0 8px 30px rgba(11, 29, 51, 0.12)',
        'button': '0 8px 32px rgba(201, 168, 76, 0.28)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(180deg, rgba(11, 29, 51, 0) 0%, rgba(11, 29, 51, 0.8) 100%)',
        'gradient-card': 'linear-gradient(180deg, transparent 50%, rgba(11, 29, 51, 0.9) 100%)',
      },
    },
  },
  plugins: [],
};
