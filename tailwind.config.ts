import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          600: '#633CFF',
          700: '#4F31CC',
        },
      },
      boxShadow: {
        custom: '0px 0px 32px 0px rgba(99, 60, 255, 0.25)'
      },
      keyframes: {
        moveInOut: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(100px)' },
        },
      },
      animation: {
        moveInOut: 'moveInOut 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
