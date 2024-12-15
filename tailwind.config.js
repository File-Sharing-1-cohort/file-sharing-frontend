/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px -8px 15px 0px rgba(170, 170, 170, 0.1)',
        'header-custom': '0px 8px 15px 0px rgba(170, 170, 170, 0.1)',
      },
      backgroundImage: {
        'header-footer-gradient':
          'linear-gradient(180deg, #F6F6F6 0%, #F4FAFF 50%, #EEF5FF 100%)',
        'gradient-faq':
          'linear-gradient(180deg, rgba(123, 179, 241, 0.15) 0%, rgba(186, 219, 255, 0.15) 52.5%, rgba(123, 179, 241, 0.15) 100%);',
        'toast-success': `linear-gradient(0deg, rgba(118, 202, 102, 0.15), rgba(118, 202, 102, 0.15)), linear-gradient(0deg, #FFFFFF, #FFFFFF)`,
        'toast-yellow': `linear-gradient(0deg, rgba(255, 207, 177, 0.25), rgba(255, 207, 177, 0.25)), linear-gradient(0deg, #FFFFFF, #FFFFFF);`,
        'toast-alert': `linear-gradient(0deg, rgba(123, 179, 241, 0.15), rgba(123, 179, 241, 0.15)), linear-gradient(0deg, #FFFFFF, #FFFFFF);`,
        'toast-error': `linear-gradient(0deg, rgba(254, 81, 81, 0.15), rgba(254, 81, 81, 0.15)), linear-gradient(0deg, #FFFFFF, #FFFFFF);`,
      },
      screens: {
        '2xl': '1440px',
        lg: '1040px',
      },
      fontFamily: {
        libre: ['Libre Franklin', 'sans-serif'],
        mallana: ['Mallanna', 'sans-serif']
      },
      fontSize: {
        title: '2.5rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        customLightBlue: '#116ACC',
        customGreen: '#76CA66',
        customYellow: '#FBC756',
        customFaq: '#041D39',
        customRedLight: '#C31717',
        customRed: '#8A0000',
        customGrayLight: '#E8E9EB',
        customGrayDark: '#AFB3B8',
        customGray: '#404244',
        customBlue: '#A0C3FF',
        customBlack: '#121212',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
