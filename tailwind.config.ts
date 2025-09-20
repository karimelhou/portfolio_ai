import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './messages/**/*.{ts,tsx,json}'
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#050914',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
          500: '#475569'
        },
        accent: {
          blue: '#38bdf8',
          amber: '#fbbf24'
        }
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 40px rgba(56, 189, 248, 0.35)'
      },
      backgroundImage: {
        'grid-ink':
          'radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0, rgba(15, 23, 42, 0) 60%)'
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, -2%, 0)' },
          '50%': { transform: 'translate3d(0, 2%, 0)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' }
        },
        'twinkle': {
          '0%, 100%': { transform: 'scale(0.9)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '1' }
        }
      },
      animation: {
        'float-slow': 'float-slow 12s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 6s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite'
      }
    }
  },
  safelist: ['bg-ink-900', 'bg-ink-800', 'bg-ink-700']
};

export default config;
