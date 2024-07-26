import Image from "next/image";
import React from "react";
import { Link } from "@/types";
import { getIcon, getLinkColor } from "../lib/utils";

type PhoneMockupProps = {
  links: Link[];
};

const PhoneMockup: React.FC<PhoneMockupProps> = ({ links }) => {

  return (
    <div className="hidden md:flex md:flex-1 rounded-[55px] items-center justify-center w-[318px] my-[79px] p-[10px] border border-[#737373]">
      <div className=" relative ">
        <Image
          src="/images/phoneMockup.svg"
          alt="phoneMockup"
          width={307}
          height={631}
        />
      </div>

      <div className="absolute flex flex-col items-center justify-center w-[273px] h-full">
        <div className="block w-[96px] h-[96px] rounded-full bg-[#EEEEEE] mb-[25px]"></div>
        <div className="block w-[160px] h-[16px] rounded-[104px] mb-[13px] bg-[#EEEEEE] "></div>
        <div className="block w-[72px] h-[8px] rounded-[104px] mb-[56px] bg-[#EEEEEE] "></div>

        <div className="h-[300px] w-3/4 overflow-y-auto custom-scrollbar">
          {links.map((link) => {
            const linkClasses = `flex items-center justify-between text-center py-3 px-[16px] rounded-md mb-3 h-[44px] relative ${getLinkColor(
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
                <div className="flex">
                  <Image
                    alt={link.platform}
                    src={`${getIcon(link.platform)}`}
                    width={16}
                    height={16}
                    className="mr-[8px]"
                  />
                  {`${link.platform
                    .charAt(0)
                    .toUpperCase()}${link.platform.slice(1)}`}
                </div>

                <Image
                  alt={link.platform}
                  src="/images/arrowRight.svg"
                  width={16}
                  height={16}
                  className="mr-[8px]"
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
