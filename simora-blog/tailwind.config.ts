import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        simora: {
          blue: '#1E3A8A',
          green: '#28A745',
          orange: '#FF8C00',
          grey: '#6C757D',
          dark: '#343A40',
          red: '#DC3545',
          yellow: '#FFC107',
          neutral: '#F8F9FA',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
