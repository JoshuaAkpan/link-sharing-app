"use client"

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({ children,  width = 'w-full', ...props }) => {
  return (
    <button
      className={`${width} h-[48px] bg-[#633CFF] text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 ease-in-out`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;