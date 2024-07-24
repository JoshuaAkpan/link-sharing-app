
import React, { useState, useRef, useEffect } from 'react';

interface PlatformIcons {
  [key: string]: React.ReactNode;
}

type Platform = 'GitHub' | 'Frontend Mentor' | 'Twitter' | 'LinkedIn' | 'YouTube' | 'Facebook' | 'Twitch' | 'Dev.to' | 'Codewars' | 'freeCodeCamp' | 'GitLab' | 'Hashnode' | 'Stack Overflow';

interface CustomDropdownProps {
  options: Platform[];
  value: Platform;
  onChange: (value: Platform) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    const handleSelect = (option: Platform) => {
    onChange(option);
    setIsOpen(false);
  };

//   const getIcon = (platform: string): React.ReactNode => {
//     const icons: PlatformIcons = {
//       GitHub: <GitHubIcon />,
//       YouTube: <YouTubeIcon />,
//       LinkedIn: <LinkedInIcon />,
//       Facebook: <FacebookIcon />,
//       'Frontend Mentor': <FrontendMentorIcon />,
//       // ... add other platform icons
//     };
//     return icons[platform] || null;
//   };

  return (
    <div className="relative" ref={dropdownRef}> 
      <div
        className={`w-full h-[48px] p-3 border border-gray-300 rounded-md bg-white flex items-center justify-between cursor-pointer ${isOpen? "border-[#633CFF] border shadow-custom": ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {/* {getIcon(value)} */}
          <span className="ml-2">{value}</span>
        </div>
        <svg className="w-5 h-5 text-[#633CFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-[16px] bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="p-3 hover:text-[#633CFF] cursor-pointer flex items-center"
              onClick={() => handleSelect(option)}
            >
              {/* {getIcon(option)} */}
              <span className="ml-2 w-full">{option} </span>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;