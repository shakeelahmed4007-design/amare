/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          bg: '#f8fafc',
          darkBg: '#0f172a',
          card: '#ffffff',
          darkCard: '#1e293b',
          border: '#e2e8f0',
          darkBorder: '#334155',
          text: '#0f172a',
          darkText: '#f8fafc',
          muted: '#64748b',
          darkMuted: '#94a3b8',
          primary: '#000000',
          darkPrimary: '#ffffff',
          accent: '#3b82f6',
        },
        geeks: {
          orange: '#F97316',
          red: '#DC2626',
          yellow: '#FEF08A',
          salmon: '#F87171',
          dark: '#111827',
          gray: '#F3F4F6',
          darkgray: '#4B5563',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'dark-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
