/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero_1': "url('/src/assets/hero_1.webp')",
        'hero_2': "url('/src/assets/hero_2.webp')",
        'hero_3': "url('/src/assets/hero_img.jpg')",
      }
    },
  },
  plugins: [],
}

