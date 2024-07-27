/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    // preflight: false,
    aspectRatio: false
  },
  plugins: [
    import('@tailwindcss/aspect-ratio'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '.hidden-scroll': {
          overflow: 'auto',
          msOverflowStyle: 'none' /* IE and Edge */,
          scrollbarWidth: 'none' /* Firefox */,
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      });
    })
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ccd8e4',
          200: '#99b0c9',
          300: '#6689ae',
          400: '#336193',
          500: '#003a78',
          600: '#002e60',
          700: '#002348',
          800: '#001730',
          900: '#000c18'
        },
        secondary: {
          100: '#f8edcf',
          200: '#f1db9f',
          300: '#e9c970',
          400: '#e2b740',
          500: '#dba510',
          600: '#af840d',
          700: '#83630a',
          800: '#584206',
          900: '#2c2103'
        },
        error: {
          900: '#B8001F',
          800: '#D60024',
          700: '#F50029',
          600: '#FF143C',
          500: '#FF3355',
          400: '#FF5C77',
          300: '#FF8599',
          200: '#FFC2CC',
          100: '#FFD6DD',
          50: '#FFEBEE'
        },
        success: {
          900: '#064E3B',
          800: '#065F46',
          700: '#047857',
          600: '#059669',
          500: '#10B981',
          400: '#34D399',
          300: '#6EE7B7',
          200: '#A7F3D0',
          100: '#D1FAE5',
          50: '#ECFDF5'
        },
        info: {
          900: '#1E3A8A',
          800: '#1E40AF',
          700: '#1D4ED8',
          600: '#2563EB',
          500: '#3B82F6',
          400: '#60A5FA',
          300: '#93C5FD',
          200: '#BFDBFE',
          100: '#DBEAFE',
          50: '#EFF6FF'
        },
        warning: {
          900: '#78350F',
          800: '#92400E',
          700: '#B45309',
          600: '#D97706',
          500: '#F59E0B',
          400: '#FBBF24',
          300: '#FCD34D',
          200: '#FDE68A',
          100: '#FEF3C7',
          50: '#FFFBEB'
        }
      },
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        'times-new-roman': ['Times New Roman', 'serif']
      },
      keyframes: {
        'animated-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      backgroundSize: {
        '400%': '400%'
      },
      animation: {
        gradient: 'animated-gradient 20s ease infinite alternate'
      }
    }
  }
};
