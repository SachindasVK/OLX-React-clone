/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'olx-green': '#23e5db',
        'olx-yellow': '#ffce32',
        'olx-light-blue': '#c8f8f6',
        'olx-light-grey': '#f2f4f5',
        'olx-dark-grey': '#7f9799'
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'nav': '0 1px 4px rgba(0, 0, 0, 0.1)',
      },
    },
    fontFamily: {
      'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [],
};