// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        raleway: ["var(--font-raleway)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
  // Make sure Tailwind can see the custom font classes in development
  safelist: [
    'font-sans',
    'font-mono',
    'font-raleway',
    'font-outfit',
    'font-montserrat'
  ]
};