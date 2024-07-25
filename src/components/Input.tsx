"use client"

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: 'email' | 'password' | '';
}

const Input: React.FC<InputProps> = ({ label, error, icon, ...props }) => {
  const borderColor = error ? 'border-[#FF3939]' : 'border-[#D9D9D9]';
  const focusRing = error ? 'focus:ring-[#FF3939]' : 'focus:border-[#633CFF]';

  const iconSvg = {
    email: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
    password: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <div className="relative">
      {label && <label className={`block text-sm font-medium text-[#333333] mb-1 ${error ? 'text-[#FF3939]' : ''}`}>{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {iconSvg[icon]}
          </div>
        )}
        <input
          className={`w-full h-[48px] pl-10 pr-3 py-2 border ${borderColor} rounded-md focus:outline-none focus:border focus:shadow-custom custom-cursor ${focusRing}  ${error ? 'pr-32' : ''}`}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <p className="text-[#FF3939] text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;