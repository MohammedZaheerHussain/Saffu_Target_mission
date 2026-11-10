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
      }
    },
  },
  plugins: [],
}
