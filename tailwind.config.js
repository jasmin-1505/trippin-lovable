/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: '#C17D3C',
        'terracotta-dark': '#6B3A2A',
        cream: '#FDF0E0',
        forest: '#2D6A4F',
        error: '#E63946',
        offwhite: '#FAFAF5',
        border: '#E8C89A',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', "Times New Roman", 'serif'],
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      keyframes: {
        'bounce-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '60%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        'select-bounce': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'bounce-in': 'bounce-in 0.35s ease-out',
        'select-bounce': 'select-bounce 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
