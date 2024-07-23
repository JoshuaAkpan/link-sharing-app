"use client"

import React, { useState, useCallback } from 'react';
import { debounce } from '../lib/debounce';
import { Link } from '../types';
import Button from './Button';

interface LinkItemProps {
  link: Link;
  onUpdate: (id: string, updates: Partial<Link>) => void;
  onDelete: (id: string) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({ link, onUpdate, onDelete }) => {
  const [platform, setPlatform] = useState(link.platform);
  const [url, setUrl] = useState(link.url);


  const debouncedUpdate = useCallback(debounce((id: string, updates: Partial<Link>) => {
    onUpdate(id, updates);
  }, 300), [onUpdate]);

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPlatform = e.target.value;
    setPlatform(newPlatform);
    debouncedUpdate(link.id, { platform: newPlatform });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    debouncedUpdate(link.id, { url: newUrl });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow mb-4">
      <select
        value={platform}
        onChange={handlePlatformChange}
        className="w-full mb-2 p-2 border border-gray-300 rounded-md"
      >
        <option value="github">GitHub</option>
        <option value="twitter">Twitter</option>
        <option value="linkedin">LinkedIn</option>
      </select>
      <input
        type="url"
        value={url}
        onChange={handleUrlChange}
        className="w-full mb-2 p-2 border border-gray-300 rounded-md"
        placeholder="https://..."
      />
      <Button onClick={() => onDelete(link.id)}>Remove</Button>
    </div>
  );
};

export default LinkItem;
