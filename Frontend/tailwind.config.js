/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'background-color': '#7cd9fd',
      }
    },
    container: {
      padding: {
        md: "10rem"
      }
    }

  },
  plugins: [],
}

