"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-purple-600 font-bold text-xl">devlinks</span>
        </Link>
        <nav className="flex space-x-4">
          <Link href="/dashboard/links">
            <span className={`${pathname === '/dashboard/links' ? 'text-purple-600' : 'text-gray-600'}`}>Links</span>
          </Link>
          <Link href="/dashboard/profile">
            <span className={`${pathname === '/dashboard/profile' ? 'text-purple-600' : 'text-gray-600'}`}>Profile Details</span>
          </Link>
          <Link href="/preview">
            <span className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-md">Preview</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;