import Image from 'next/image';
import React from 'react';
import { Link } from '@/types';


type PhoneMockupProps = {
    links: Link[];
  };

const PhoneMockup: React.FC<PhoneMockupProps> = ({ links }) => {

    const getLinkColor = (platform: string): string => {
        switch (platform.toLowerCase()) {
          case "github":
            return "bg-[#1A1A1A] text-white";
          case "youtube":
            return "bg-[#EE3939] text-white";
          case "linkedin":
            return "bg-[#2D68FF] text-white";
          case "twitter":
            return "bg-[#43B7E9] text-white";
          case "frontend mentor":
            return "bg-[#FFFFFF] text-[#333333]";
          case "facebook":
            return "bg-[#2442AC] text-white";
          case "twitch":
            return "bg-[#EE3FC8] text-white";
          case "dev.to":
            return "bg-[#333333] text-white";
          case "codewars":
            return "bg-[#8A1A50] text-white";
          case "freecodecamp":
            return "bg-[#302267] text-white";
          case "gitlab":
            return "bg-[#EB4925] text-white";
          case "hashnode":
            return "bg-[#0330D1] text-white";
          case "stack overflow":
            return "bg-[#EC7100] text-white";
          default:
            return "bg-gray-200 text-black";
        }
      };

    return (
    <div className="hidden md:flex md:flex-1 rounded-[55px] items-center justify-center w-[318px] my-[79px] p-[10px] border border-[#737373]">
      <div className=" relative ">
      <Image src='/images/phoneMockup.svg' alt='phoneMockup' width={307} height={631}/>
      </div>

      <div className="absolute flex flex-col items-center justify-center w-[273px] h-full">
        <div className="block w-[96px] h-[96px] rounded-full bg-[#EEEEEE] mb-[25px]"></div>
        <div className="block w-[160px] h-[16px] rounded-[104px] mb-[13px] bg-[#EEEEEE] "></div>
        <div className="block w-[72px] h-[8px] rounded-[104px] mb-[56px] bg-[#EEEEEE] "></div>

        <div className='h-[300px] w-3/4 overflow-y-auto custom-scrollbar'>
            {
                links.map((link) => {
                    const linkClasses = `block text-center py-3 px-4 rounded-md mb-3 h-[44px] relative ${getLinkColor(
                      link.platform
                    )} hover:opacity-90 transition-opacity`;
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClasses}
                      >
                        {`${link.platform
                          .charAt(0)
                          .toUpperCase()}${link.platform.slice(1)}`}
                      </a>
                    );
                  })
            }
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
