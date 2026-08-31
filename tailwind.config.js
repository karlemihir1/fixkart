/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#060709',
          900: '#0D0E12',
          850: '#13151A',
          800: '#1A1C24',
          700: '#252834',
          600: '#34384A',
          500: '#4E536B',
        },
        paper: {
          50: '#FFFFFF',
          100: '#FBFBFA',
          200: '#F4F4F0',
          300: '#EAEAE4',
          400: '#D5D5CB',
        },
        brand: {
          orange: '#FF5400',
          amber: '#FF7A00',
          flame: '#FF3300',
          yellow: '#FFB800',
        },
        trust: {
          blue: '#1E60F2',
          cyan: '#06B6D4',
          emerald: '#10B981',
          green: '#22C55E',
        }
      },
      fontFamily: {
        display: ['Oswald', 'Anton', 'Archivo Black', 'Syne', 'sans-serif'],
        heading: ['Epilogue', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['Space Grotesk', 'JetBrains Mono', 'Menlo', 'monospace'],
        body: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Playfair Display', 'serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'scan-laser': 'scanLaser 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'radar-ping': 'radarPing 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        scanLaser: {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0.1' },
          '50%': { transform: 'translateY(100%)', opacity: '0.9' },
        },
        radarPing: {
          '75%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(255, 84, 0, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(255, 84, 0, 0.8))' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 84, 0, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(30, 96, 242, 0.4)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'brutalist': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutalist-orange': '4px 4px 0px 0px #FF5400',
      }
    },
  },
  plugins: [],
}
