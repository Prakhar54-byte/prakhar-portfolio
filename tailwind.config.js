/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0a0e14',
          green: '#00ff41',
          cyan: '#00d4ff',
          purple: '#bd93f9',
          yellow: '#f1fa8c',
          pink: '#ff79c6',
          orange: '#ffb86c',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
