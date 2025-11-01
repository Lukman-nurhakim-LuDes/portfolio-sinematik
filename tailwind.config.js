/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'anthracite': '#393D47',
        'soft-gold': '#C7A16D', // Disesuaikan
      },
      fontFamily: {
        sans: ['var(--font-work-sans)', 'sans-serif'],
        serif: ['var(--font-libre-baskerville)', 'serif'],
      },
    },
  },
  plugins: [],
};
