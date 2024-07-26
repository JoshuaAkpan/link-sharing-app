import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-[#1A1A1A]',
    'bg-[#EE3939]',
    'bg-[#2D68FF]',
    'bg-[#43B7E9]',
    'bg-[#FFFFFF]',
    'bg-[#2442AC]',
    'bg-[#EE3FC8]',
    'bg-[#333333]',
    'bg-[#8A1A50]',
    'bg-[#302267]',
    'bg-[#EB4925]',
    'bg-[#0330D1]',
    'bg-[#EC7100]',
    'text-[#333333]',
    'text-white',
    'bg-gray-200',
    'text-black',
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
        custom: '0px 0px 32px 0px rgba(99, 60, 255, 0.25)',
        card: '0px 0px 32px 0px rgba(0, 0, 0, 0.10)'
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
