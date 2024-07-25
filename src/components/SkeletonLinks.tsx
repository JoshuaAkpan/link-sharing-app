import React from 'react';

const SkeletonLinks: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-1 bg-white rounded-[12px] items-center justify-center p-6 relative">
      <div className="w-[307px] h-[631px] rounded-[12px]"></div>
      <div className="absolute flex flex-col items-center justify-center w-full h-full animate-pulse">
        <div className="block text-center py-3 px-4 rounded-md mb-3 bg-gray-300 w-3/4 h-10"></div>
        <div className="block text-center py-3 px-4 rounded-md mb-3 bg-gray-300 w-3/4 h-10"></div>
        <div className="block text-center py-3 px-4 rounded-md mb-3 bg-gray-300 w-3/4 h-10"></div>
      </div>
    </div>
  );
};

export default SkeletonLinks;
