/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cosmic: {
          950: '#03020a',
          900: '#080618',
          800: '#100c2e',
          700: '#1a1048',
          600: '#261862',
        },
        nebula: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        aurora: {
          400: '#67e8f9',
          500: '#06b6d4',
        },
        stardust: '#f8f0ff',
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(ellipse at top, #1a1048 0%, #080618 50%, #03020a 100%)',
        'nebula-gradient': 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0891b2 100%)',
        'card-glass': 'linear-gradient(135deg, rgba(167,139,250,0.1) 0%, rgba(99,102,241,0.05) 100%)',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139,92,246,0.7), 0 0 60px rgba(99,102,241,0.4)' },
        },
      },
    },
  },
  plugins: [],
}
