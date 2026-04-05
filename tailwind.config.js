/** @type {import('tailwindcss').Config} */
export default {
  // 👇 Enables class-based dark mode (IMPORTANT)
  darkMode: 'class',

  // 👇 Files Tailwind scans
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      // 🎨 Optional: custom colors for your dashboard
      colors: {
        primary: '#0ea5e9', // you can change to your accent color
      },

      // 🌑 Optional: better dark background shades
      backgroundColor: {
        dark: '#0f172a',
      },

      // ✨ Optional: smooth transitions
      transitionProperty: {
        colors: 'background-color, border-color, color, fill, stroke',
      },
    },
  },

  plugins: [],
};