/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F9F7F7',      // Warm Off-White
        'secondary': '#DBE2EF',       // Light Muted Blue
        'accent': '#3F72AF',          // Strong Blue
        'text': '#112D4E',            // Dark Navy
      },
    },
  },
  plugins: [],
}

