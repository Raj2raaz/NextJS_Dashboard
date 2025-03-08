/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}", // ✅ Scan all Next.js pages
      "./components/**/*.{js,ts,jsx,tsx}", // ✅ Scan components
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  