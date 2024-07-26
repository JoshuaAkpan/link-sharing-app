import React, { useState, useCallback } from 'react';
import { debounce } from '../lib/debounce';
import { Link } from '../types';
import CustomDropdown from './CustomDropdown';

interface LinkItemProps {
  link: Link;
  onUpdate: (id: string, updates: Partial<Link>) => void;
  onDelete: (id: string) => void;
  count: number;
}

type Platform = 'GitHub' | 'Frontend Mentor' | 'Twitter' | 'LinkedIn' | 'YouTube' | 'Facebook' | 'Twitch' | 'Dev.to' | 'Codewars' | 'freeCodeCamp' | 'GitLab' | 'Hashnode' | 'Stack Overflow';

const LinkItem: React.FC<LinkItemProps> = ({ link, onUpdate, onDelete, count }) => {
  const [platform, setPlatform] = useState<Platform>(link.platform as Platform);
  const [url, setUrl] = useState(link.url);

  const options: Platform[] = ['GitHub', 'Frontend Mentor', 'Twitter', 'LinkedIn', 'YouTube', 'Facebook', 'Twitch', 'Dev.to', 'Codewars', 'freeCodeCamp', 'GitLab', 'Hashnode', 'Stack Overflow'];

  const debouncedUpdate = useCallback(debounce((id: string, updates: Partial<Link>) => {
    onUpdate(id, updates);
  }, 300), [onUpdate]);

  const handlePlatformChange = (newPlatform: Platform) => {
    setPlatform(newPlatform);
    debouncedUpdate(link.id, { platform: newPlatform });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    debouncedUpdate(link.id, { url: newUrl });
  };

  return (
    <div className="bg-[#FAFAFA] p-[20px] rounded-[12px] mb-4 text-[#737373]">
      <div className='flex justify-between'>
        <h4 className='font-bold text-base'>Link #{count}</h4>
        <p onClick={() => onDelete(link.id)} className='text-base cursor-pointer'>Remove</p>
      </div>
      <label className='text-[12px] text-[#333333] leading-[18px]'>Platform</label>
      <CustomDropdown
        options={options}
        value={platform}
        onChange={handlePlatformChange}
        />

      <label className='text-[12px] text-[#333333] leading-[18px] mt-[12px]'>Link</label>
      <input
        type="url"
        value={url}
        onChange={handleUrlChange}
        className="w-full mb-2 p-2 border border-gray-300 focus:border-[#633CFF] rounded-md focus:outline-none focus:border focus:shadow-custom custom-cursor"
        placeholder="https://www..."
      />
    </div>
  );
};

export default LinkItem;