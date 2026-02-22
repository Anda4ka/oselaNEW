import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      keyframes: {
        'num-pop': {
          '0%': { opacity: '0.3', transform: 'translateY(-7px) scale(0.97)' },
          '65%': { opacity: '1', transform: 'translateY(1px)  scale(1)' },
          '100%': { opacity: '1', transform: 'translateY(0)    scale(1)' },
        },
        'fade-slide-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'num-pop': 'num-pop 0.25s ease-out',
        'fade-slide-in': 'fade-slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
