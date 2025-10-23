/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9F7F7',     // Warm Off-White
        secondary: '#DBE2EF',      // Light Blue
        accent: '#3F72AF',         // Deep Blue
        text: '#112D4E',           // Navy Blue
      },
    },
  },
  plugins: [],
}

