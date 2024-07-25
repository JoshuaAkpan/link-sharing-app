"use client"

import React from 'react';


const PreLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-32 h-32">
        <div className="absolute w-8 h-8 bg-[#633CFF] animate-moveInOut"></div>
        <div className="absolute w-8 h-8 bg-[#633CFF] animate-moveInOut" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default PreLoader;
