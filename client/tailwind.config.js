/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#DDF3E4',
        card: '#FEFEFF',
        panel: 'rgba(1,107,70,0.06)',
        sidebar: '#014C33',
        border: 'rgba(1,76,51,0.12)',
        'border-hover': 'rgba(1,76,51,0.22)',
        accent: '#016B46',
        'accent-hover': '#014C33',
        'accent-active': '#014C33',
        whatsapp: '#25D366',
        edit: '#3B82F6',
        'text-primary': '#0B120F',
        'text-secondary': 'rgba(11,18,15,0.72)',
        'text-muted': 'rgba(11,18,15,0.48)',
        danger: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        badge: '6px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(1,107,70,0.05), 0 0 0 1px rgba(1,107,70,0.1)',
        'card-hover': '0 8px 30px rgba(1,107,70,0.08), 0 0 0 1px rgba(1,107,70,0.15)',
        modal: '0 20px 60px rgba(0,0,0,0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'slide-in-right': 'slideInRight 0.25s ease-out',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
