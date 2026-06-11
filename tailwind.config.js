/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: { 500: '#0A1628', 600: '#0A1628', 700: '#060D17' },
        tide: { 400: '#22D3EE', 500: '#06B6D4', 600: '#0891B2' },
        cream: '#FDFCF8',
        amber: '#F59E0B',
        coral: '#F43F5E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
