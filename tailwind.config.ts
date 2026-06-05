import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#14111d',
        plum: '#261826',
        wine: '#8f3158',
        rose: '#d98aa4',
        blush: '#fff6f8',
        champagne: '#d6b678',
        lavender: '#a98be0'
      },
      boxShadow: {
        glow: '0 28px 80px rgba(143, 49, 88, 0.28)',
        card: '0 18px 70px rgba(38, 24, 38, 0.16)'
      },
      fontFamily: {
        serifjp: ['var(--font-serif-jp)'],
        sansjp: ['var(--font-sans-jp)']
      }
    }
  },
  plugins: []
};

export default config;
