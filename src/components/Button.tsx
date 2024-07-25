"use client"

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: string;
  bg?: string;
  py?: string;
  px?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({ children,  width = 'w-full', bg = '#633CFF', py = '8px', px = '16px', textColor = '#FFFFFF',  ...props }) => {
  return (
    <button
      className={`${width} h-[46px] bg-[${bg}] text-[${textColor}] py-[${py}] px-[${px}] rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 ease-in-out`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;