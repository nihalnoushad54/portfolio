/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#EEF1F6", dark: "#0B1220" },
        ink: { DEFAULT: "#0F1B2D", dark: "#E6ECF5" },
        signal: { DEFAULT: "#2F4FE0", dark: "#7C93FF" },
        mute: { DEFAULT: "#5B6778", dark: "#93A0B4" },
        line: { DEFAULT: "#CBD3DF", dark: "#22304A" },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
