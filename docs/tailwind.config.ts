/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.75rem', '0.875rem'],
      sm: ['0.875rem', '1.0625rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.25rem', '1.5625rem'],
      xl: ['1.5rem', '1.875rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3.125rem'],
      '4xl': ['3rem', '3.625rem'],
      '5xl': ['3.5rem', '4.1875rem'],
    },
    fontFamily: {
      head: ['Source Sans Pro', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    },
    fontWeight: {
      light: 300,
      regular: 400,
      'semi-bold': 500,
      bold: 600,
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      light: {
        400: '#EDF0F5',
      },
      black: '#000000',
      dark: {
        400: '#0C0C0D',
        500: '#18181B',
        600: '#52525B',
      },
      primary: {
        400: '#38BDF8',
        500: '#0EA5E9',
        600: '#0284C7',
      },
      success: {
        400: '#4ADE80',
        500: '#22C55E',
        600: '#15803D',
      },
      warning: {
        400: '#FACC15',
        500: '#EAB308',
        600: '#CA8A04',
      },
      alert: {
        400: '#E11D48',
        500: '#BE123C',
        600: '#9F1239',
      },
    },
    extend: {
      animation: {
        'gradient-rotate': 'gradient-rotate 5s linear 0s infinite reverse',
      },
      keyframes: {
        'gradient-rotate': {
          '0%': { '--gradient-angle': '360deg' },
          '100%': { '--gradient-angle': '0deg' },
        },
      },
    },
  },
  plugins: [],
}
