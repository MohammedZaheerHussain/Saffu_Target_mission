/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F5EF',
        surface: '#FFFFFF',
        'surface-subtle': '#FAF9F5',
        primary: {
          DEFAULT: '#26364A',
          light: '#374B63',
          dark: '#1B2634',
        },
        secondary: {
          DEFAULT: '#829A88',
          light: '#9BB1A0',
          dark: '#68806E',
        },
        accent: {
          DEFAULT: '#E9B95C',
          light: '#F2CD80',
          dark: '#C89B42',
        },
        terracotta: {
          DEFAULT: '#D58C75',
          light: '#E2A592',
          dark: '#B7705B',
        },
        charcoal: {
          DEFAULT: '#292C31',
          light: '#42464D',
        },
        muted: '#898D91',
        parchment: '#F0EAD6',
        'parchment-border': '#E5E0D0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(38, 54, 74, 0.05)',
        'soft-md': '0 4px 20px rgba(38, 54, 74, 0.08)',
        'soft-lg': '0 8px 30px rgba(38, 54, 74, 0.12)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'float': 'float-gentle 4s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '60%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
