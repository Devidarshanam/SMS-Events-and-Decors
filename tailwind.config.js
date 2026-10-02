/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F5EFEB',
          300: '#EAE0D5',
          400: '#DDCFC0',
          500: '#CDBCA8',
        },
        charcoal: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#636363',
          600: '#4A4A4A',
          700: '#333333',
          800: '#222222',
          900: '#141414',
          950: '#0B0B0B',
        },
        gold: {
          50: '#FBF8EF',
          100: '#F7F0D8',
          200: '#EFE0B2',
          300: '#E5CD87',
          400: '#DCB95E',
          500: '#C5A880', // Premium Champagne Gold
          600: '#B39162',
          700: '#947348',
          800: '#755A37',
          900: '#543F25',
        },
        terracotta: {
          50: '#FAF4F2',
          100: '#F4E5E1',
          200: '#E9CEC5',
          300: '#DBB0A3',
          400: '#CB8F7E',
          500: '#C27866', // Muted Terracotta / Rose
          600: '#A95E4D',
          700: '#884738',
          800: '#6A372B',
          900: '#4F271E',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(44, 38, 30, 0.08), 0 4px 6px -2px rgba(44, 38, 30, 0.03)',
        'luxury-hover': '0 20px 40px -15px rgba(44, 38, 30, 0.15), 0 8px 12px -3px rgba(44, 38, 30, 0.05)',
        'gold-glow': '0 0 25px rgba(197, 168, 128, 0.25)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
