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
        obsidian: {
          DEFAULT: '#08080A',
          deep: '#040405',
          light: '#111115',
        },
        charcoal: {
          950: '#0A0A0D',
          900: '#0F0F14',
          800: '#15151C',
          700: '#1E1E27',
          600: '#2A2A36',
          500: '#3D3D4E',
        },
        gold: {
          50: '#FBF8F0',
          100: '#F7EFCF',
          200: '#EEDFA3',
          300: '#E5CB72',
          400: '#DCB948',
          500: '#D4AF37', // Primary Luxury Gold
          600: '#B89228',
          700: '#94721C',
          800: '#6E5316',
          900: '#493610',
          champagne: '#F7E7CE',
          shimmer: '#FFF4D0',
        },
        platinum: {
          light: '#F5F5F7',
          DEFAULT: '#E5E4E2',
          dark: '#A6A6A8',
        },
        rosegold: {
          light: '#E8B4B8',
          DEFAULT: '#C98A90',
          dark: '#9A5B61',
        },
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5E6BE 0%, #D4AF37 50%, #997D33 100%)',
        'gold-gradient-subtle': 'linear-gradient(135deg, rgba(245, 230, 190, 0.15) 0%, rgba(212, 175, 55, 0.3) 50%, rgba(153, 125, 51, 0.15) 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 0%, #171720 0%, #08080A 80%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 0 45px rgba(212, 175, 55, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
