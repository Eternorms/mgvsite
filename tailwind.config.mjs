/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // ========================================
      // CORES - MGV BrandGuide Oficial
      // ========================================
      colors: {
        // Primárias
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
        // Neutras
        graphite: '#2D2D2D',
        gray: {
          light: '#F2F2F2',
          mid: '#E4E4E4',
        },
        'off-white': '#FAFAFA',
        // Status
        success: '#27AE60',
        error: '#C0392B',
        alert: '#E6B43C',
      },

      // ========================================
      // TIPOGRAFIA - MGV BrandGuide Oficial
      // ========================================
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        accent: ['Montserrat', 'sans-serif'],
        serif: ['Libre Baskerville', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      fontSize: {
        // Display & Headings
        'display': ['52px', { lineHeight: '1', fontWeight: '800', letterSpacing: '-0.02em' }],
        'h1': ['36px', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.01em' }],
        'h2': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['18px', { lineHeight: '1.3', fontWeight: '700' }],
        'h4': ['16px', { lineHeight: '1.4', fontWeight: '600' }],
        // Body
        'body-lg': ['16px', { lineHeight: '1.7' }],
        'body': ['14px', { lineHeight: '1.7' }],
        'body-sm': ['13px', { lineHeight: '1.5' }],
        // UI Elements
        'button': ['11px', { lineHeight: '1', fontWeight: '700', letterSpacing: '0.08em' }],
        'label': ['11px', { lineHeight: '1', fontWeight: '600', letterSpacing: '0.12em' }],
        'caption': ['10px', { lineHeight: '1.4', fontWeight: '500' }],
        'input-label': ['9px', { lineHeight: '1', fontWeight: '700', letterSpacing: '0.14em' }],
      },

      // ========================================
      // ESPAÇAMENTO - MGV BrandGuide Oficial
      // ========================================
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '40px',
        '2xl': '64px',
        '3xl': '96px',
      },

      // ========================================
      // BORDER RADIUS - MGV BrandGuide Oficial
      // ========================================
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '20px',
        'full': '9999px',
      },

      // ========================================
      // SOMBRAS - MGV BrandGuide Oficial
      // ========================================
      boxShadow: {
        'sm': '0 2px 8px rgba(11, 29, 51, 0.07)',
        'md': '0 6px 24px rgba(11, 29, 51, 0.11)',
        'lg': '0 16px 48px rgba(11, 29, 51, 0.16)',
        'gold': '0 6px 24px rgba(201, 168, 76, 0.32)',
        'card': '0 4px 20px rgba(11, 29, 51, 0.08)',
      },

      // ========================================
      // GRADIENTES
      // ========================================
      backgroundImage: {
        'gradient-hero': 'linear-gradient(145deg, #0a1626, #0b1d33, #122040)',
        'gradient-overlay': 'linear-gradient(180deg, rgba(11, 29, 51, 0) 0%, rgba(11, 29, 51, 0.85) 100%)',
      },
    },
  },
  plugins: [],
};
