/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#10B981',
        'primary-red': '#EF4444',
        'dark-bg': '#0F172A',
        'dark-card': '#1E293B',
      },
    },
  },
  plugins: [],
}
