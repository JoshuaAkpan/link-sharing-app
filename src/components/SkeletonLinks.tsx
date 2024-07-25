import Image from 'next/image';
import React from 'react';

const SkeletonLinks: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-1 rounded-[55px] items-center justify-center w-[318px] my-[79px] p-[10px] border border-[#737373]">
      <div className=" relative ">
      <Image src='/images/phoneMockup.svg' alt='phoneMockup' width={307} height={631}/>
      </div>
      <div className="absolute flex flex-col items-center justify-center w-[273px] h-full animate-pulse">
        <div className="block w-[96px] h-[96px] rounded-full bg-[#EEEEEE] mb-[25px]"></div>
        <div className="block w-[160px] h-[16px] rounded-[104px] mb-[13px] bg-[#EEEEEE] "></div>
        <div className="block w-[72px] h-[8px] rounded-[104px] mb-[56px] bg-[#EEEEEE] "></div>
        <div className="block text-center py-3 px-4 rounded-md mb-[20px] bg-[#EEEEEE] w-3/4 h-[44px]"></div>
        <div className="block text-center py-3 px-4 rounded-md mb-[20px] bg-[#EEEEEE] w-3/4 h-[44px]"></div>
        <div className="block text-center py-3 px-4 rounded-md mb-[20px] bg-[#EEEEEE] w-3/4 h-[44px]"></div>
        <div className="block text-center py-3 px-4 rounded-md mb-[20px] bg-[#EEEEEE] w-3/4 h-[44px]"></div>
        <div className="block text-center py-3 px-4 rounded-md mb-3 bg-[#EEEEEE] w-3/4 h-[44px]"></div>
      </div>
    </div>
  );
};

export default SkeletonLinks;
